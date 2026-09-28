require('dotenv').config(); // precisa ser a primeira linha

const express = require('express');
const connectDatabase = require('./database'); // pra ajustrar o caminho se o arquivo estiver em outra pasta
const musicaRoutes = require('./routes/musica.routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Música API' });
});

app.use('/musicas', musicaRoutes);

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