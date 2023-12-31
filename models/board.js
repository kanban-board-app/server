"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Board.hasMany(models.Group, {
        foreignKey: "board_id",
      });
    }
  }
  Board.init(
    {
      user_id: DataTypes.INTEGER,
      board: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Board",
    }
  );
  return Board;
};
