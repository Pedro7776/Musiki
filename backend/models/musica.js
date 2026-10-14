const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    artista: { type: String, trim: true, default: 'Desconhecido' },
    album: { type: String, trim: true },
    trecho: { type: String, trim: true },
    estilo: { type: String, trim: true },
  },
  { timestamps: true, collection: 'Musics' }
);

module.exports = mongoose.model('Musica', musicaSchema);
