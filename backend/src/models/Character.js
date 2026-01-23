import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Player from './Player.js';

const Character = sequelize.define('Character', {
    character_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    character_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    class: { type: DataTypes.STRING(100), allowNull: false },
    subclass: { type: DataTypes.STRING(100) },
    race: { type: DataTypes.STRING(100), allowNull: false },
    background: { type: DataTypes.STRING(100) },
    strength: { type: DataTypes.INTEGER, allowNull: false },
    dexterity: { type: DataTypes.INTEGER, allowNull: false },
    constitution: { type: DataTypes.INTEGER, allowNull: false },
    intelligence: { type: DataTypes.INTEGER, allowNull: false },
    wisdom: { type: DataTypes.INTEGER, allowNull: false },
    charisma: { type: DataTypes.INTEGER, allowNull: false },
    max_hp: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    c_hp: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    temp_hp: { type: DataTypes.INTEGER, defaultValue: 0 },
    ac: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    inspiration: { type: DataTypes.INTEGER, defaultValue: 0 },
    hit_die: DataTypes.INTEGER,
    death_saves_success: DataTypes.INTEGER,
    death_saves_fail: DataTypes.INTEGER,
    profile_image_path: DataTypes.STRING(150)
}, {
    tableName: 'Characters',
    schema: 'DungeonsAndDragons',
    timestamps: false
});

// Associations
Player.hasMany(Character, { foreignKey: 'player_id', onDelete: 'CASCADE' });
Character.belongsTo(Player, { foreignKey: 'player_id' });

export default Character;