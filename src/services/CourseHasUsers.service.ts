import { Request, Response } from "express";
import { CourseMongo } from "../repositories/Course.repository";
import { CourseHasUsersMongo } from "../repositories/CourseHasUsers.repository";
import { UserMongo } from "../repositories/User.repository";
import { Role } from "../utils/enums/Roles.enum";

class CourseHasUsersService {
  public async create(req: Request, res: Response, next): Promise<any> {
    const { user } = req;
    const { id } = req.params;

    const userData = await UserMongo.findOne({
      _id: (user as any)._id,
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

    const data = await CourseHasUsersMongo.findAll({
      _id: id,
    });

    res.status(200).json({
      message: "All users from course",
      data,
    });
  }

  public async findAllFromAll(req: Request, res: Response, next): Promise<any> {
    const data = await CourseHasUsersMongo.findAllFromAll();

    res.status(200).json({
      message: "All users and course",
      data,
    });
  }

  public async findAllUserCourses(
    req: Request,
    res: Response,
    next
  ): Promise<any> {
    const { user } = req;

    const { id } = req.params;

    const data = await CourseHasUsersMongo.findUserCourses({
      _id: (user as any).role === Role.USER ? (user as any)?._id : id,
    });

    res.status(200).json({
      message: "All courses from user",
      data,
    });
  }
}

export default new CourseHasUsersService();
