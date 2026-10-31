import express from "express";
const router = express.Router();

import { buscarMusicaDoDia } from "../controller/musicaController.js";
import autenticaRota from "../services/autenticaRota.js";

router.get('/diaria', autenticaRota, buscarMusicaDoDia);

export default router 