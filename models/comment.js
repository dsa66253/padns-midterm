const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // YOU NEED THIS
    },
  },
});

class Comment extends Model {}
Comment.init(
  {
    username: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    picture: {type: DataTypes.STRING},
    commentid: {type: DataTypes.INTEGER, allowNull: false}
  },
  { sequelize, modelName: "comment" }
);

export {Comment}
