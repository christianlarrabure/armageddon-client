const TopicPrice = require("../models/topicPrice");

exports.createTopicPrice = (topic) => {
  return new Promise((resolve, reject) => {
    TopicPrice.create(topic)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getTopicsPrices = () => {
  return new Promise((resolve, reject) => {
    TopicPrice.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getTopicPrice = (id) => {
  return new Promise((resolve, reject) => {
    TopicPrice.findByPk(id)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.updateTopicPrice = (topicPrice) => {
  return new Promise((resolve, reject) => {
    TopicPrice.update(topicPrice, { where: { id: topicPrice.id } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.deleteTopicPrice = (id) => {
  return new Promise((resolve, reject) => {
    TopicPrice.destroy({ where: { id: id } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
