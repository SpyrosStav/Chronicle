import express from "express";
import characterRoutes from "./characterRoutes.js";

const router = express.Router();

router.use("/api/characters", characterRoutes);

export default router;