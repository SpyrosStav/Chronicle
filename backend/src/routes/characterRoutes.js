import express from "express";
import * as characterController from "../controllers/characterController.js";

const router = express.Router();

router.get("/:id", characterController.fetchCharacterById);
router.get("/", characterController.fetchAllCharacters);
router.get("/player/:playerId", characterController.fetchPlayerCharacters);

router.post("/", characterController.createCharacter);

export default router;