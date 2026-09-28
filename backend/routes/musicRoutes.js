import express from "express";
const router = express.Router();
import {listarMusicas, buscarMusicaAleatoria, buscarPorId, criarMusica, atualizarMusica, excluirMusica} from '../controller/musicaController.js';

router.get('/', listarMusicas);
router.get('/aleatoria', buscarMusicaAleatoria); // antes de /:id
router.get('/:id', buscarPorId);
router.post('/', criarMusica);
router.put('/:id', atualizarMusica);
router.delete('/:id', excluirMusica);

export default router 