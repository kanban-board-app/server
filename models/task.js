"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Group, {
        foreignKey: "group_id",
      });
    }
  }
  Task.init(
    {
      group_id: DataTypes.INTEGER,
      task: DataTypes.STRING,
      description: DataTypes.TEXT,
      due_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
