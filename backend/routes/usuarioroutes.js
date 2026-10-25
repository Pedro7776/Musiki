cat > routes/usuario.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuariocontroller');

router.post('/', usuarioController.cadastrar);

module.exports = router;
EOF