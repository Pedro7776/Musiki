import mongoose from 'mongoose';

const musicaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    artista: { type: String, trim: true, default: 'Desconhecido' },
    album: { type: String, trim: true, default: '', required: false },
  },
  { 
    collection: 'Musics'
  }
);

export default mongoose.model('Musica', musicaSchema);
