import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Player = sequelize.define('Player', {
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    },
    player_password: {
        type: DataTypes.STRING(64)
    }
}, {
    tableName: 'Players',
    schema: 'DungeonsAndDragons',
    timestamps: false
});

export default Player;

