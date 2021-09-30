import express from "express";
import Auth from "../controllers/Auth.js";
const router = express.Router();

router.post('/login', Auth.login);
router.get('/user', Auth.getUser);

export default router