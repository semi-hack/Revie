import express from "express";
import jsonWebToken from "jsonwebtoken";
import authRoutes from "./Auth.js";
import userRoutes from "./User.js"
import reviewRoutes from "./Review.js";
const router = express.Router();

router.use('/v1', authRoutes);
router.use('/v1', reviewRoutes)
router.use('/v1', userRoutes);

export default router