// Importa o framework Express, que cuida de rotas, requisições e respostas HTTP
import express from "express"
// Importa as rotas de música que criamos em outro arquivo (routes/musicRoutes.js) 
import musicRoutes from "./routes/musicRoutes.js";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express();

import { ConnectDB } from "./database/database.js";

app.use(express.json());
ConnectDB()
app.get('/', (req, res) => {
    res.json({ status: 'Música API' }); 
});

// Registra todas as rotas de música sob o prefixo "/musics".
app.use('/musics', musicRoutes); 

// 404 primeiro
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// erro por último // 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no servidor' });
});

app.listen(PORT, () => {
    console.log(`Música API - porta ${PORT}`);
});