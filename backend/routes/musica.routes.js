const express = require('express');
const mongoose = require('mongoose');
const Musica = require('../models/Musica');

const router = express.Router();

// GET /musicas
router.get('/', async (req, res) => {
  try {
    res.json(await Musica.find());
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar músicas' });
  }
});

// GET /musicas/aleatoria  (antes de /:id)
router.get('/aleatoria', async (req, res) => {
  try {
    const [musica] = await Musica.aggregate([{ $sample: { size: 1 } }]);
    if (!musica) return res.status(404).json({ error: 'Nenhuma música cadastrada' });
    res.json(musica);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
});

// GET /musicas/:id
router.get('/:id', async (req, res) => {
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
});

// POST /musicas
router.post('/', async (req, res) => {
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
});

// PUT /musicas/:id
router.put('/:id', async (req, res) => {
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
});

// DELETE /musicas/:id
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
