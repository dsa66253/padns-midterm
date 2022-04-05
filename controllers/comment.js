const { Comment } = require("../models");

const controller = {
  getAll(req, res, next) {
    console.log("Call Comment: getall");
    Comment.findAll()
      .then((instance) => res.status(200).send(instance))
      .catch(next);
  },
  get(req, res, next) {
    console.log("Call Comment: get");
    Comment.findOne({
      where: {
        commentid: req.params.commentid,
      },
    })
      .then((instance) => res.status(200).send(instance))
      .catch(next);
  },
  async create(req, res, next) {
    console.log("Call Comment: createComment");
    obj = req.body;
    const comment = await Comment.create({
      username: obj.username,
      content: obj.content,
      picture: obj.picture
    });
    res.status(200).send("Comment added");
    console.log(comment);
  },
  async del(req, res, next) {
    console.log("Call Comment: deleteComment");
    obj = req.body;
    const comment = await Comment.findOne({
      commentid: obj.commentid
    });
    if (obj.username === item.username && obj.comment === item.comment && obj.id === item.id && obj.status === true) {
      console.log(obj.username + " wants to delete id:" + obj.id);
      const response = await item.destroy();
      console.log(response);
      res.status(200).send("Comment deleted");
    }
  },
}

module.exports = { Comment: controller };