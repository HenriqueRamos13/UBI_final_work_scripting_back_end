import { Request, Response } from "express";
import { UserMongo } from "../repositories/User.repository";

class UserService {
  public async create(req: Request, res: Response, next): Promise<any> {
    const { email, password, role } = req.body;

    UserMongo.create({
      email,
      password,
      ...(role && { role }),
    })
      .then((user) => {
        const { password, ...userWithoutPassword } = user;

        res.json({
          message: "User created successfully",
          data: userWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error creating user",
          error: err.message,
        });
      });
  }

  public async findOne(req: Request, res: Response, next): Promise<any> {
    const { email } = req.body;
    const { id } = req.params;

    UserMongo.findOne({
      ...(email && { email }),
      ...(id && { _id: id }),
    })
      .then((user) => {
        const { password, ...userWithoutPassword } = user;

        res.json({
          message: "User found successfully",
          data: userWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error finding user",
          error: err.message,
        });
      });
  }

  public async findAll(req: Request, res: Response, next): Promise<any> {
    const { type } = req.query;

    UserMongo.findAll({ type: type as any })
      .then((users) => {
        const usersWithoutPassword = users.map((user) => {
          const { password, ...userWithoutPassword } = user;

          return userWithoutPassword;
        });

        res.json({
          message: "Users found successfully",
          data: usersWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error finding users",
          error: err.message,
        });
      });
  }

  public async update(req: Request, res: Response, next): Promise<any> {
    const { email, password } = req.body;

    UserMongo.update({
      _id: (req.user as any)._id,
      ...(email && { email }),
      ...(password && { password }),
    })
      .then((user) => {
        const { password, ...userWithoutPassword } = user;

        res.json({
          message: "User updated successfully",
          data: userWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error updating user",
          error: err.message,
        });
      });
  }

  public async updateAdmin(req: Request, res: Response, next): Promise<any> {
    const { email, password } = req.body;
    const { id } = req.params;

    UserMongo.update({
      _id: id,
      ...(email && { email }),
      ...(password && { password }),
    })
      .then((user) => {
        const { password, ...userWithoutPassword } = user;

        res.json({
          message: "User updated successfully",
          data: userWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error updating user",
          error: err.message,
        });
      });
  }

  public async delete(req: Request, res: Response, next): Promise<any> {
    const { id } = req.params;

    UserMongo.delete(id)
      .then((user) => {
        const { password, ...userWithoutPassword } = user;

        res.json({
          message: "User deleted successfully",
          data: userWithoutPassword,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error deleting user",
          error: err.message,
        });
      });
  }
}

export default new UserService();
