cat > models/usuario.js << 'EOF'
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    senha: { type: String, required: true }, // aqui fica sempre o hash do bcrypt
    // sparse: o email é opcional, então vários usuários sem email não colidem
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
EOF