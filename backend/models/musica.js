const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    artista: { type: String, trim: true, default: 'Desconhecido' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Musica', musicaSchema);
