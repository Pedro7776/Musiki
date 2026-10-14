const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  musica: { type: mongoose.Schema.Types.ObjectId, ref: 'Musica', required: true },
  exibidoEm: { type: Date, default: Date.now },
  dia: { type: String }, // AAAA-MM-DD
});

// acelera a busca "últimas músicas mostradas para esse deviceId"
historicoSchema.index({ deviceId: 1, exibidoEm: -1 });

// uma música por dispositivo por dia (ignora registros antigos sem "dia")
historicoSchema.index(
  { deviceId: 1, dia: 1 },
  { unique: true, partialFilterExpression: { dia: { $type: 'string' } } }
);

module.exports = mongoose.model('Historico', historicoSchema);
