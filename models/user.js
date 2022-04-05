const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // YOU NEED THIS
    },
  },
});

class User extends Model {}
User.init(
  {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    picture:{type: DataTypes.STRING}//,
    // userid: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true}
  },
  { sequelize, modelName: "user" }
);

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: "janedoe",
//     birthday: new Date(1980, 6, 20),
//   });
//   console.log(jane.toJSON());
// })();

module.exports = {
  User,
};
