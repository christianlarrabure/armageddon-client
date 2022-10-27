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
  },
  content: {
    type: Sequelize.STRING,
  },
  isA: {
    type: Sequelize.STRING,
    defaultValue: "concept",
    allowNull: false,
  },
  sdesc: {
    type: Sequelize.STRING,
    default: "",
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
