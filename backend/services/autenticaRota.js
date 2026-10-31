import jwt from 'jsonwebtoken';

const autenticaRota = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token malformado' });
    }
    const token = parts[1];

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
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

export default autenticaRota;