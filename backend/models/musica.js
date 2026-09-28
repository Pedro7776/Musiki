import mongoose from 'mongoose';

const musicaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    artista: { type: String, trim: true, default: 'Desconhecido' },
  },
  { timestamps: true }
);

export default mongoose.model('Musica', musicaSchema);
