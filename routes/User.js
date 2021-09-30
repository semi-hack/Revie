import express from "express";
import User from "../controllers/User.js";
const router = express.Router();

router.post('/register', User.registerUser);
router.get('/getAllUsers', User.getAllUsers);

export default router