import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Character from './Character.js';

const Weapon = sequelize.define('Weapon', {
    weapon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    character_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weapon_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    atk_bonus: { type: DataTypes.INTEGER, allowNull: false },
    damage_die: { type: DataTypes.STRING(10), allowNull: false },
    extra_damage: DataTypes.INTEGER,
    damage_type: DataTypes.STRING(50)
}, {
    tableName: 'Weapons',
    schema: 'DungeonsAndDragons',
    timestamps: false
});

// Associations
Character.hasMany(Weapon, { foreignKey: 'character_id', onDelete: 'CASCADE' });
Weapon.belongsTo(Character, { foreignKey: 'character_id' });

export default Weapon;