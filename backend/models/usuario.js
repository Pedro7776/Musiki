import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    senha: { type: String, required: true }, // aqui fica sempre o hash do bcrypt
    // sparse: o email é opcional, então vários usuários sem email não colidem
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    // Array de referencias 
    historico: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musica' }],
    // Referencia a musica
    musicaDoDia: {
      musica: { type: mongoose.Schema.Types.ObjectId, ref: 'Musica' },
      data: { type: Date, required: true, default: 0 }
    }
  },
  { 
    collection: "Users",
    timestamps: true 
  }
);

export default mongoose.model('Usuario', usuarioSchema);