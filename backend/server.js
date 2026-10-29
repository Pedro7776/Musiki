import { configDotenv } from "dotenv";
configDotenv()
import express from "express";
import connectDatabase from "./database/database.js";
import musicaRoutes from "./routes/musicaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/musicas', musicaRoutes);
app.use('/usuarios', usuarioRoutes);

// 404 primeiro
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// erro por último
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Música API - porta ${PORT}`);
  });
}

start();