const mongoose = require('mongoose');
const Musica = require('../models/Musica');
const Historico = require('../models/Historico');

// GET /musicas
async function listar(req, res) {
  try {
    const musicas = await Musica.find();
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar músicas' });
  }
}

// GET /musicas/aleatoria
async function aleatoria(req, res) {
  const deviceId = req.header('x-device-id');

  if (!deviceId) {
    return res.status(400).json({ error: 'Header "x-device-id" é obrigatório' });
  }

  try {
    const umDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const historicoRecente = await Historico.find({
      deviceId,
      exibidoEm: { $gte: umDiaAtras },
    }).select('musica');

    const idsExcluidos = historicoRecente.map((h) => h.musica);

    const [musica] = await Musica.aggregate([
      { $match: { _id: { $nin: idsExcluidos } } },
      { $sample: { size: 1 } },
    ]);

    let escolhida = musica;
    if (!escolhida) {
      const [qualquerMusica] = await Musica.aggregate([{ $sample: { size: 1 } }]);
      escolhida = qualquerMusica;
    }

    if (!escolhida) {
      return res.status(404).json({ error: 'Nenhuma música cadastrada' });
    }

    await Historico.create({ deviceId, musica: escolhida._id });

    res.json(escolhida);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
}

// GET /musicas/:id
async function buscarPorId(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const musica = await Musica.findById(id);
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });
    res.json(musica);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
}

// POST /musicas
async function criar(req, res) {
  const { titulo, artista } = req.body ?? {};
  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ error: 'O campo "titulo" é obrigatório' });
  }
  try {
    const nova = await Musica.create({ titulo, artista });
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar música' });
  }
}

// PUT /musicas/:id
async function atualizar(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  const { titulo, artista } = req.body ?? {};
  try {
    const musica = await Musica.findByIdAndUpdate(
      id,
      { titulo, artista },
      { new: true, runValidators: true }
    );
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });
    res.json(musica);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
}

// DELETE /musicas/:id
async function excluir(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const musica = await Musica.findByIdAndDelete(id);
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir música' });
  }
}

module.exports = { listar, aleatoria, buscarPorId, criar, atualizar, excluir };