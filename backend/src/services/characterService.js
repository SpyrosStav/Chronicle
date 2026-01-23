import Character from "../models/Character.js";

export const getCharacterById = async (id) => {
    const character = await Character.findByPk(id);
    if (!character) return null;
    return character;
};

export const getAllCharacters = async () => {
    return Character.findAll();
}

export const getCharactersByPlayerId = async (playerId) => {
    const characters = await Character.findAll({ where: { player_id: playerId } });
    if (!characters) return [];
    return characters;
}

export const createCharacter = async (characterData) => {
    const newCharacter = await Character.create(characterData);
    return newCharacter;
}