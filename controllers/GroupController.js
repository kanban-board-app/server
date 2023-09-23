const { Group } = require("../models");

class GroupController {
  static async createGroup(req, res, next) {
    try {
      const { boardId } = req.params;
      const { group } = req.body;

      const data = await Group.create({
        board_id: boardId,
        group,
      });
      res.status(201).json({ message: "Successfully add group!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateGroup(req, res, next) {
    try {
      const { boardId, groupId } = req.params;
      const { group } = req.body;

      const findGroup = await Group.findOne({
        where: { id: groupId, board_id: boardId },
      });

      if (findGroup) {
        findGroup.update({ group });
        res.status(200).json({ message: "Succesfully update group!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroup(req, res, next) {
    try {
      const { boardId, groupId } = req.params;

      const findGroup = await Group.findOne({
        where: { id: groupId, board_id: boardId },
      });

      if (findGroup) {
        findGroup.destroy();
        res.status(200).json({ message: "Successfully delete group!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GroupController;
