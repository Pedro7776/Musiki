import express from "express";
const router = express.Router();

import { cadastrar, checarOTP, enviarEmail, logar, mudarSenha } from "../controller/usuarioController.js";

router.post('/cadastrar', cadastrar);
router.post('/logar', logar);
router.post('/enviar-email', enviarEmail);
router.post('/checar-otp', checarOTP);
router.post('/mudar-senha', mudarSenha);

export default router