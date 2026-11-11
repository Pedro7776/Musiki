import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

const autenticaRota = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Access token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token malformado' });
    }
    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 
                error: 'Token inválido ou expirado',
                message: err
            });
        }
        req.usuario = decoded;

        return next();
    });
};

const atualizaAccessToken = async (req, res) => {
    try{
        const { refreshToken } = req.body
        if(!refreshToken){
            return res.status(401).json({ error: 'Refresh token não fornecido' });
        }
        const usuarioEncontrado = await Usuario.findOne({
            $or: [
                { email: usernameOuEmail.toLowerCase() },
                { username: usernameOuEmail }
            ]
        })
        if(!usuarioEncontrado){
            return res.status(500).json({ error: 'Erro ao atualizar token'})
        }
        const tokenCerto = await bcrypt.compare(refreshToken, usuarioEncontrado.refreshToken)
        
        const novoRefreshToken = jwt.sign(
            { id: usuarioEncontrado._id.toString(), username: usuarioEncontrado.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
    }catch(err){
        res.status(500).json({error: 'Erro ao atualizar o token'})
    }
    


}


const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var code = ''
    for(var i = 0; i <= 32; i++){
        code += characters.charAt(Math.random() * characters.length)
    }
    return code
}


export default autenticaRota;