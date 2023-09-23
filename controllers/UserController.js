require("dotenv").config();
const { User, Image } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, password } = req.body;

      const uniqueUsername = await User.findOne({
        where: {
          username,
        },
      });

      if (!uniqueUsername) {
        const data = await User.create({
          name,
          username,
          password,
        });
        res
          .status(201)
          .json({ ...data.dataValues, message: "Successfully register!" });
      } else {
        throw { name: "UserExist" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const findUser = await User.findOne({
        where: { username },
      });

      if (findUser) {
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (comparePassword) {
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              username: findUser.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
          );
          res.status(200).json({
            token,
            id: findUser.id,
          });
        } else {
          throw { name: "WrongPassword" };
        }
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
