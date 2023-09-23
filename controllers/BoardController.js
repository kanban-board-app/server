const { Board, Group, Task } = require("../models");

class BoardController {
  static async findBoards(req, res, next) {
    try {
      const data = await Board.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      const data = await Board.findOne({
        where: { id: boardId },
        include: [
          {
            model: Group,
            include: [
              {
                model: Task,
              },
            ],
          },
        ],
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createBoard(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { board } = req.body;

      await Board.create({
        user_id: id,
        board,
      });
      res.status(201).json({ message: "Successfully add board!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateBoard(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { boardId } = req.params;
      const { board } = req.body;

      const findBoard = await Board.findOne({
        where: { id: boardId, user_id: id },
      });

      if (findBoard) {
        findBoard.update({ board });
        res.status(200).json({ message: "Successfully update board!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { boardId } = req.params;

      const findBoard = await Board.findOne({
        where: { id: boardId, user_id: id },
      });

      if (findBoard) {
        findBoard.destroy();
        res.status(200).json({ message: "Successfully delete board!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BoardController;
