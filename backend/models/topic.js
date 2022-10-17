const Sequelize = require('sequelize');
const sequelize = require("../utils/database");
const Character = require('./character');

const Topic = sequelize.define('Topic', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
    },
    isCharacter: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
    sdesc: {
        type: Sequelize.STRING,
        default: "",
    }
});

Topic.sync({ alter: true });

module.exports = Topic;