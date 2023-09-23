const { Task } = require("../models");

class TaskController {
  static async createTask(req, res, next) {
    try {
      const { groupId } = req.params;
      const { task, description, due_date, status } = req.body;

      const data = await Task.create({
        group_id: groupId,
        task,
        description,
        due_date,
        status,
      });
      res.status(201).json({ message: "Successfully add task!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { groupId, taskId } = req.params;
      const { task, description, due_date, status } = req.body;

      const findTask = await Task.findOne({
        where: { id: taskId, group_id: groupId },
      });

      if (findTask) {
        findTask.update({ task, description, due_date, status });
        res.status(200).json({ message: "Successfully update task!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { groupId, taskId } = req.params;

      const findTask = await Task.findOne({
        where: { id: taskId, group_id: groupId },
      });

      if (findTask) {
        findTask.destroy();
        res.status(200).json({ message: "Successfully delete task!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
