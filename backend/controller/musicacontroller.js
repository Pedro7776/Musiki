import mongoose from 'mongoose';
import Musica from "../models/musica.js"

async function buscarMusicaDoDia(req, res) {
  try {
    const [musica] = await Musica.aggregate([{ $sample: { size: 1 } }]);
    if (!musica) return res.status(404).json({ error: 'Nenhuma música cadastrada' });
    const {_id, ...musicaLimpa} = musica
    res.json(musicaLimpa);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
}

export { 
  buscarMusicaDoDia 
};