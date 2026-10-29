import express from "express";
const router = express.Router();

import { buscarMusicaAleatoria } from "../controller/musicacontroller.js";

router.get('/aleatoria', buscarMusicaAleatoria);

export default router 