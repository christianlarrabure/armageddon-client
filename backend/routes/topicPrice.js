const controller = require("../controllers/topicPrice");
const { ipcMain } = require("electron");
const Topic = require("../models/topic");
const TopicPrice = require("../models/topicPrice");

exports.init = () => {
  TopicPrice.belongsTo(Topic);
  Topic.hasMany(TopicPrice);

  ipcMain.on("getTopicPrices", (event) => {
    controller
      .getTopicsPrices()
      .then((topics) => {
        event.sender.send("topicPrices", topics);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.on("createTopicPrice", (event, topicPrice) => {
    controller
      .createTopicPrice(topicPrice)
      .then(() => {
        controller
          .getTopicsPrices()
          .then((topicPrices) => {
            event.sender.send("topicPrices", topicPrices);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.on("getTopicPrice", (event, id) => {
    controller
      .getTopicPrice(id)
      .then((topicPrice) => {
        event.sender.send("selectedTopicPrice", topicPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.on("updateTopicPrice", (event, topicPrice) => {
    controller.updateTopicPrice(topicPrice).then(() => {
      controller
        .getTopicsPrices()
        .then((topicPrices) => {
          event.sender.send("topicPrices", topicPrices);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  ipcMain.on("deleteTopicPrice", (event, id) => {
    controller.deleteTopicPrice(id).then(() => {
      controller
        .getTopicsPrices()
        .then((topicPrices) => {
          event.sender.send("topicPrices", topicPrices);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
};
