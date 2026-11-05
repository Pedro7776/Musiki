import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';
import { checkChangePassToken, checkOTP, sendEmail } from '../services/mailer.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_MINIMA = 6;
const SENHA_MAXIMA = 72; // o bcrypt só considera os 72 primeiros caracteres

// POST /usuarios
async function cadastrar(req, res) {
  const { username, senha, email } = req.body ?? {};

  // sem o segredo não dá para assinar o token: melhor falhar antes de salvar o usuário
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET não configurado no servidor' });
  }

  // username: obrigatório e não pode ser vazio
  if (typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ error: 'O campo "username" é obrigatório e não pode ser vazio' });
  }

  

  // email: opcional, mas, se vier, não pode ser vazio e precisa ter formato válido
  let emailLimpo;
  if (email !== undefined && email !== null) {
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'O campo "email" não pode ser vazio (ou deixe de enviá-lo)' });
    }
    emailLimpo = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(emailLimpo)) {
      return res.status(400).json({ error: 'O email informado não é válido' });
    }
  }

  const usernameLimpo = username.trim();

  try {
    // username ou email já usados?
    if (await Usuario.findOne({ username: usernameLimpo })) {
      return res.status(409).json({ error: 'Esse username já está em uso' });
    }
    if (emailLimpo && (await Usuario.findOne({ email: emailLimpo }))) {
      return res.status(409).json({ error: 'Esse email já está em uso' });
    }

    // criptografa a senha (10 = custo do bcrypt)
    const senhaHash = hashSenha(senha)

    const dados = { username: usernameLimpo, senha: senhaHash };
    if (emailLimpo) dados.email = emailLimpo;

    const novo = await Usuario.create(dados);

    // o token leva só o id e o username, nunca a senha
    const token = jwt.sign(
      { id: novo._id.toString(), username: novo.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, username: novo.username });
  } catch (err) {
    // dois cadastros iguais ao mesmo tempo: o índice único do banco barra o segundo
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Username ou email já está em uso' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

async function logar(req, res) {
  const { usernameOuEmail, senha } = req.body ?? {};

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET não configurado no servidor' });
  }

  if (typeof usernameOuEmail !== 'string' || !usernameOuEmail.trim()) {
    return res.status(400).json({ error: 'O campo "username ou email" é obrigatório e não pode ser vazio' });
  }

  if (typeof senha !== 'string' || !senha.trim()) {
    return res.status(400).json({ error: 'O campo "senha" é obrigatório e não pode ser vazio' });
  }

  try {
    const usuarioEncontrado = await Usuario.findOne({
      $or: [
        { email: usernameOuEmail.toLowerCase() },
        { username: usernameOuEmail }
      ]
    })

    if(!usuarioEncontrado){
      return res.status(400).json({ error: 'Senha ou usuário incorreto'})
    }

    const senhaCerta = await bcrypt.compare(senha, usuarioEncontrado.senha)
    if(!senhaCerta){
      return res.status(400).json({ error: 'Senha ou usuário incorreto'})
    }

    
    const token = jwt.sign(
      { id: usuarioEncontrado._id.toString(), username: usuarioEncontrado.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, username: usuarioEncontrado.username });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Username ou email já está em uso' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

async function enviarEmail(req, res) {
  try {
    const { email } = req.body
    const usuarioEncontrado = Usuario.findOne({ email: email })
    if(!usuarioEncontrado){
      return res.status(200)
    }
    await sendEmail(email)
    res.status(200)
  } catch(err) {
    res.status(500).json({ error: 'Erro ao enviar o email' })
  } 
}

function checarOTP(req, res) {
  try{
    const { email, OTP } = req.body
    const resultado = checkOTP(email, OTP)
    if(resultado.ok){
      res.status(200).json({
        token: resultado.token
      })
    }else{
      res.status(500).json({
        error: 'Código enviado incorreto'
      })
    }
  }catch(err){
    res.status(500).json({
      error: 'Erro ao verificar código'
    })
  }
}

async function mudarSenha(req, res) {
  try{
    const { email, token, novaSenha } = req.body
    const resultado = checkChangePassToken(email, token)
    if(resultado.ok){
      const senhaHash = hashSenha(novaSenha)
      await Usuario.findOneAndUpdate({ email: email }, { senha: senhaHash })
      return res.status(200)
    }
    return res.status(500).json({
      error: 'Acesso a mudança de senha negado'
    })
  }catch(err) {
    res.status(500).json({
      error: 'Erro durante mudança de senha'
    })
  }
}

async function hashSenha(senha) {
  // senha: obrigatória, não vazia e com tamanho válido
  if (typeof senha !== 'string' || !senha.trim()) {
    return res.status(400).json({ error: 'O campo "senha" é obrigatório e não pode ser vazio' });
  }
  if (senha.length < SENHA_MINIMA || senha.length > SENHA_MAXIMA) {
    return res.status(400).json({
      error: `A senha deve ter entre ${SENHA_MINIMA} e ${SENHA_MAXIMA} caracteres`,
    });
  }
  return await bcrypt.hash(senha, 10);
}

export { 
  cadastrar,
  logar,
  enviarEmail,
  checarOTP,
  mudarSenha
};

