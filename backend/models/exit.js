const Sequelize = require('sequelize');
const sequelize = require("../utils/database");

const Exit = sequelize.define('Exit', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fromId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Room',
            key: 'id',
        }
    },
    toId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Room',
            key: 'id',
        }
    },
});

module.exports = Character;