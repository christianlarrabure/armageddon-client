const Topic = require("../models/topic");

exports.createTopic = (topic) => {
  return new Promise((resolve, reject) => {
    Topic.create(topic)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getTopics = () => {
  return new Promise((resolve, reject) => {
    Topic.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getTopic = (id) => {
    return new Promise((resolve, reject) => {
      Topic.findByPk(id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
exports.updateTopic = (topic) => {
  return new Promise((resolve, reject) => {
    Topic.update(
      topic,
      { where: { id: topic.id } }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.deleteTopic = (id) => {
    return new Promise((resolve, reject) => {
        Topic.destroy({where: {id:id}}).then(result=>{
            resolve(result);
        }).catch(error=>{
            reject(error)
        })
    })
}