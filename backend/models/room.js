const Sequelize = require('sequelize');
const sequelize = require("../utils/database");

const Room = sequelize.define('Room', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    }
});

module.exports = Room;