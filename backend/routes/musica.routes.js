const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musica.controller');

router.get('/', musicaController.listar);
router.get('/aleatoria', musicaController.aleatoria); // antes de /:id
router.get('/:id', musicaController.buscarPorId);
router.post('/', musicaController.criar);
router.put('/:id', musicaController.atualizar);
router.delete('/:id', musicaController.excluir);

module.exports = router;