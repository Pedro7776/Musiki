import mongoose from 'mongoose';
import Musica from '../models/Musica.js';

// GET /musicas
async function listarMusicas(req, res) {
  try {
    const musicas = await Musica.find();
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar músicas' });
  }
}

// GET /musicas/aleatoria
async function buscarMusicaAleatoria(req, res) {
  try {
    const [musica] = await Musica.aggregate([{ $sample: { size: 1 } }]);
    if (!musica) return res.status(404).json({ error: 'Nenhuma música cadastrada' });
    res.json(musica);
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
async function criarMusica(req, res) {
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
async function atualizarMusica(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  const { titulo, artista, album } = req.body ?? {};
  try {
    const musica = await Musica.findByIdAndUpdate(
      id,
      { titulo, artista, album },
      { new: true, runValidators: true }
    );
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });
    res.json(musica);
  } catch (err) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
}

// DELETE /musicas/:id
async function excluirMusica(req, res) {
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

export { 
  listarMusicas, 
  buscarMusicaAleatoria, 
  buscarPorId, 
  criarMusica, 
  atualizarMusica, 
  excluirMusica
};