import { Request, Response } from "express";
import { CourseMongo } from "../repositories/Course.repository";
import { CourseHasUsersMongo } from "../repositories/CourseHasUsers.repository";
import { UserMongo } from "../repositories/User.repository";

class CourseHasUsersService {
  public async create(req: Request, res: Response, next): Promise<any> {
    const { user } = req;
    const { id } = req.params;

    const userData = await UserMongo.findOne({
      _id: (user as any).id,
    });

    const courseData = await CourseMongo.findOne({
      _id: id,
    });

    CourseHasUsersMongo.create({
      user: userData,
      course: courseData,
    })
      .then((courseHasUser) => {
        res.status(200).json({
          message: "User added to course",
          data: courseHasUser,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error adding user to course",
          error: err,
        });
      });
  }

  public async findAll(req: Request, res: Response, next): Promise<any> {
    const { id } = req.params;

    CourseHasUsersMongo.findAll({
      _id: id,
    });
  }
}

export default new CourseHasUsersService();
