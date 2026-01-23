import * as characterService from "../services/characterService.js";

export const fetchCharacterById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const character = await characterService.getCharacterById(id);

        if (!character) {
            return res.status(404).json({ error: "Character not found" });
        }
        res.json(character);

    } catch (err) {
        next(err);
    }
};

export const fetchAllCharacters = async (req, res, next) => {
    try {
        const characters = await characterService.getAllCharacters();

        if (!characters) {
            return res.status(404).json({ error: "Characters not found" });
        }
        res.json(characters);

    } catch (err) {
        next(err);
    }
};

export const fetchPlayerCharacters = async (req, res, next) => {
    try {

        const characters = await characterService.getCharactersByPlayerId(req.params.playerId);

        if (!characters) {
            return res.status(404).json({ error: "Characters not found" });
        }
        res.json(characters);

    } catch (err) {
        next(err);
    }
};

export const createCharacter = async (req, res, next) => {
    try {
        const characterData = req.body;
        const newCharacter = await characterService.createCharacter(characterData);
        res.status(201).json(newCharacter);
    } catch (err) {
        next(err);
    }
};

//update character

//delete character

//add weapons

//add spells