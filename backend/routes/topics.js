const controller = require("../controllers/topic");
const { ipcMain } = require("electron");

exports.init = () => {
  ipcMain.on("getTopics", (event) => {
    controller
      .getTopics()
      .then((topics) => {
        event.sender.send("topics", topics);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.on("createTopic", (event, topic) => {
    controller.createTopic(topic).then(() => {
      controller
        .getTopics()
        .then((topics) => {
          event.sender.send("topics", topics);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  ipcMain.on("getTopic", (event, id) => {
    controller.getTopic(id).then((topic) => {
      event.sender.send("selectedTopic", topic);
    }).catch(error=>{
        console.error(error);
    });
  });

  ipcMain.on("updateTopic", (event, topic) => {
    controller.updateTopic(topic).then(() => {
      controller
        .getTopics()
        .then((topics) => {
          event.sender.send("topics", topics);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  ipcMain.on("deleteTopic", (event, id) => {
    controller.deleteTopic(id).then(() => {
      controller
        .getTopics()
        .then((topics) => {
          event.sender.send("topics", topics);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
};
