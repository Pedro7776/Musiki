import Musica from "../models/musica.js"
import Usuario from '../models/usuario.js';

async function buscarMusicaDoDia(req, res) {
  try {
    const usuario = await Usuario.findOne({username: req.usuario.username})
    if(!usuario){
      return res.status(404).json({ error: 'Usuário não existe' })
    }

    const hoje = new Date().setHours(0,0,0,0)
    const ultimoAcesso = usuario.musicaDoDia?.data 
      ? new Date(usuario.musicaDoDia.data).setHours(0, 0, 0, 0) 
      : 0;

    if(usuario.musicaDoDia.musica && ultimoAcesso >= hoje){
      await usuario.populate("musicaDoDia.musica")
      const musicaObj = usuario.musicaDoDia.musica.toObject()
      const {_id, ...musicaLimpa} = musicaObj
      return res.status(200).json({ musica: musicaLimpa })
    }

    const [musicaRaw] = await Musica.aggregate([
      {
        $match: {
        _id: { $nin: usuario.historico }
        }
      },
      {
        $sample: { size: 1 }
      }
    ]);

    if(!musicaRaw){
      return res.status(404).json({ error: 'Nenhuma música cadastrada' })
    }
    
    await Usuario.findOneAndUpdate(
      { username: req.usuario.username },
      {
        $set: {
          musicaDoDia: {
            musica: musicaRaw._id,
            data: hoje
          }
        },
        $push: {
          historico: {
            $each: [musicaRaw._id],
            $slice: -10 
          }
        }
      }
    );
    
    const {_id, ...musicaLimpa} = musicaRaw
    return res.status(200).json({musica: musicaLimpa});

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar música' });
  }
}

export { 
  buscarMusicaDoDia 
};