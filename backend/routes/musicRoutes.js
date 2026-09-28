import express from "express";
const router = express.Router();
import * as musicaController from '../controller/musicacontroller.js';

router.get('/', musicaController.listar);
router.get('/aleatoria', musicaController.aleatoria); // antes de /:id
router.get('/:id', musicaController.buscarPorId);
router.post('/', musicaController.criar);
router.put('/:id', musicaController.atualizar);
router.delete('/:id', musicaController.excluir);

export default router 