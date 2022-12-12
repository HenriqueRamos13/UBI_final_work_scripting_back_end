import CourseModel, { ICourse } from "../models/Courses/Course.model";
import { Role } from "../utils/enums/Roles.enum";

export interface IUpdateCourse {
  _id: string;
  name?: string;
  description?: string;
}

export interface ICreateTopic {
  _id: string;
  title: string;
  text: string;
}

export interface ICreateCourse {
  name: string;
  description: string;
  teacher: ICourse;
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

  public async findAll(
    user: { role: Role; _id: string } | null = null
  ): Promise<ICourse[]> {
    const courses = await this.model.find({
      ...(user.role === Role.TEACHER ? { teacher: user._id } : {}),
    });

    if (!courses) throw new Error("Courses not found");

    return courses;
  }

  public async update(data: IUpdateCourse): Promise<ICourse> {
    const { description, name, _id } = data;

    const course = await this.model
      .findByIdAndUpdate(_id, {
        ...(description && { description }),
        ...(name && { name }),
      })
      .lean()
      .exec();

    if (!course._id) throw new Error("Course not updated");

    return course;
  }

  public async delete(id: string): Promise<ICourse> {
    const course = await this.model.findByIdAndDelete(id).lean().exec();

    return course;
  }

  public async createTopic(data: ICreateTopic): Promise<ICourse> {
    const { _id, text, title } = data;

    const course = await this.model
      .findByIdAndUpdate(_id, {
        $push: {
          topics: {
            text,
            title,
          },
        },
      })
      .lean()
      .exec();

    if (!course._id) throw new Error("Topic not created");

    return course;
  }
}

export const CourseMongo = new CourseMongoRepository();
