const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Topic = sequelize.define("Topic", {
  id: {
    type: Sequelize.INTEGER,
    autoincrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Unknown Name",
  },
  content: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isA: {
    type: Sequelize.STRING,
    defaultValue: "concept",
    allowNull: false,
  },
  sdesc: {
    type: Sequelize.STRING,
    default: "",
    allowNull: true,
  },
});

Topic.sync({ alter: true })
  .then(() => {
    console.log("Updated TOPICS database.");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = Topic;
