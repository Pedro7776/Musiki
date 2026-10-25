cat > controller/usuariocontroller.js << 'EOF'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

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

  // senha: obrigatória, não vazia e com tamanho válido
  if (typeof senha !== 'string' || !senha.trim()) {
    return res.status(400).json({ error: 'O campo "senha" é obrigatório e não pode ser vazio' });
  }
  if (senha.length < SENHA_MINIMA || senha.length > SENHA_MAXIMA) {
    return res.status(400).json({
      error: `A senha deve ter entre ${SENHA_MINIMA} e ${SENHA_MAXIMA} caracteres`,
    });
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
    const senhaHash = await bcrypt.hash(senha, 10);

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

module.exports = { cadastrar };
EOF