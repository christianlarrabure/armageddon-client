const Sequelize = require('sequelize');
const sequelize = require("../utils/database");
const Topic = require('./topic');

const Character = sequelize.define('Character', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true,
    },
    topicId: {
        type: Sequelize.INTEGER,
    }
});

Character.belongsTo(Topic);

module.exports = Character;