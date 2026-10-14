const mongoose = require('mongoose');
const Musica = require('../models/musica');
const Historico = require('../models/historico');

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


// data no formato AAAA-MM-DD, no fuso de São Paulo
function chaveDia(data = new Date()) {
  return data.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
}

// remove campos internos antes de enviar ao front-end
function publica(musica) {
  const { _id, __v, createdAt, updatedAt, ...resto } = musica;
  return resto;
}

// GET /musicas/do-dia
async function doDia(req, res) {
  const deviceId = req.header('x-device-id');
  if (!deviceId) {
    return res.status(400).json({ error: 'Header "x-device-id" é obrigatório' });
  }

  const hoje = chaveDia();
  const filtro = { trecho: { $exists: true, $ne: '' } };

  try {
    // já recebeu música hoje? devolve a mesma
    const jaTem = await Historico.findOne({ deviceId, dia: hoje });
    if (jaTem) {
      const musica = await Musica.findById(jaTem.musica).lean();
      if (musica) return res.json(publica(musica));
    }

    const total = await Musica.countDocuments(filtro);
    if (total === 0) {
      return res.status(404).json({ error: 'Nenhuma música com trecho cadastrada' });
    }

    // histórico do dispositivo, da mais recente para a mais antiga
    const historico = await Historico.find({ deviceId, dia: { $type: 'string' } })
      .sort({ dia: -1 })
      .select('musica');

    // quantas já saíram no ciclo atual (um ciclo = todas as músicas uma vez)
    const noCiclo = historico.length % total;
    const recentes = noCiclo === 0 ? historico.slice(0, 1) : historico.slice(0, noCiclo);
    const idsExcluidos = recentes.map((h) => h.musica);

    let [escolhida] = await Musica.aggregate([
      { $match: { ...filtro, _id: { $nin: idsExcluidos } } },
      { $sample: { size: 1 } },
    ]);

    // só existe 1 música com trecho: não tem como variar
    if (!escolhida) {
      [escolhida] = await Musica.aggregate([{ $match: filtro }, { $sample: { size: 1 } }]);
    }

    try {
      await Historico.create({ deviceId, musica: escolhida._id, dia: hoje });
    } catch (err) {
      // duas requisições ao mesmo tempo: vale a que gravou primeiro
      if (err.code === 11000) {
        const gravada = await Historico.findOne({ deviceId, dia: hoje });
        const musica = await Musica.findById(gravada.musica).lean();
        return res.json(publica(musica));
      }
      throw err;
    }

    res.json(publica(escolhida));
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música do dia' });
  }
}

module.exports = { listar, aleatoria, doDia, buscarPorId, criar, atualizar, excluir };
