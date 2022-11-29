import CourseModel, { ICourse } from "../models/Courses/Course.model";
import { IUser } from "../models/User/User.model";

export interface ICreateCourse {
  name: string;
  description: string;
  teacher: IUser;
}

export interface IFindCourse {
  name?: string;
  _id?: string;
}

class CourseMongoRepository {
  model = CourseModel;

  public async create(data: ICreateCourse): Promise<ICourse> {
    const course = await this.model.create({
      ...data,
    });

    if (!course._id) throw new Error("Course not created");

    return course;
  }

  public async findOne(data: IFindCourse): Promise<ICourse> {
    const course = await this.model.findOne({
      ...(data.name
        ? {
            name: {
              $regex: new RegExp(data.name, "i"),
            },
          }
        : {
            ...data,
          }),
    });

    if (!course._id) throw new Error("Course not found");

    return course;
  }
}

export const CourseMongo = new CourseMongoRepository();
