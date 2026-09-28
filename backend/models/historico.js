const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  musica: { type: mongoose.Schema.Types.ObjectId, ref: 'Musica', required: true },
  exibidoEm: { type: Date, default: Date.now },
});

// acelera a busca "últimas músicas mostradas para esse deviceId"
historicoSchema.index({ deviceId: 1, exibidoEm: -1 });

module.exports = mongoose.model('Historico', historicoSchema);