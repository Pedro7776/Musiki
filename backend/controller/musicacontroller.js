import Musica from "../models/musica.js"
import Usuario from '../models/usuario.js';

async function buscarMusicaDoDia(req, res) {
  try {
    const usuario = await Usuario.findOne({username: req.usuario.username})

    const hoje = new Date().setHours(0,0,0,0)
    const ultimoAcesso = usuario.musicaDoDia?.dia 
      ? new Date(usuario.musicaDoDia.dia).setHours(0, 0, 0, 0) 
      : 0;

    if(usuario.musicaDoDia.musica && ultimoAcesso >= hoje){
      await usuario.populate("musicaDoDia.musica")
      const musicaObj = usuario.musicaDoDia.musica.toObject()
      const {_id, ...musicaLimpa} = musicaObj
      return res.status(200).json({ musica: musicaLimpa })
    }

    const [musicaRaw] = await Musica.aggregate([{ $sample: { size: 1 } }]);
    if(!musicaRaw){
      return res.status(404).json({ error: 'Nenhuma música cadastrada' })
    }

    const {_id, ...musicaLimpa} = musicaRaw

    usuario.musicaDoDia = {
      musica: musicaRaw._id,
      dia: new Date().setHours(0,0,0,0)
    }
    await usuario.save()

    return res.status(200).json({musica: musicaLimpa});

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
}

export { 
  buscarMusicaDoDia 
};