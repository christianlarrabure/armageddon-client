const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const TopicPrice = sequelize.define("TopicPrices", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  topicId: {
    type: Sequelize.INTEGER,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
  },
});

TopicPrice.sync({ alter: true })
  .then(() => {
    console.log("Updated TOPIC PRICES database.");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = TopicPrice;
