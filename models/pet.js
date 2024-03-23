const { Sequelize, DataTypes } = require("sequelize");
const databaseConnectionString = require("../databaseConnectionSequelize");
const userModel = require("./web_user");
const sequelize = new Sequelize(databaseConnectionString);

const Pet = sequelize.define(
  "pet",
  {
    pet_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    web_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "web_user",
        key: "web_user_id",
      },
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    pet_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "pet_type",
        key: "pet_type_id",
      },
    },
  },
  {
    tableName: "pet",
    timestamps: false,
    singular: "pet",
    plural: "pet",
  }
);

Pet.belongsTo(userModel, { as: "owner", timestamps: false, foreignKey: "web_user_id" });
userModel.hasMany(Pet, { as: "pets", timestamps: false, foreignKey: "web_user_id" });

module.exports = Pet;
