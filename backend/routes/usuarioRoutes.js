import express from "express";
const router = express.Router();

import { cadastrar, logar } from "../controller/usuarioController.js";

router.post('/cadastrar', cadastrar);
router.post('/logar', logar)

export default router