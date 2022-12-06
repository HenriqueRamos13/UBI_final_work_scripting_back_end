import CourseHasUsersModel, {
  ICourseHasUsers,
} from "../models/CourseHasUsers/CourseHasUsers.model";
import { ICourse } from "../models/Courses/Course.model";
import { IUser } from "../models/User/User.model";

export interface ICreateCourseHasUsers {
  course: ICourse;
  user: IUser;
}

export interface IFindCourseHasUsers {
  _id?: string;
}

class CourseHasUsersMongoRepository {
  model = CourseHasUsersModel;

  public async create(data: ICreateCourseHasUsers): Promise<ICourseHasUsers> {
    const result = await this.model.create({
      ...data,
    });

    if (!result._id) throw new Error("CourseHasUser not created");

    return result;
  }

  public async findAll(data: IFindCourseHasUsers): Promise<any[]> {
    const result = await this.model
      .find({
        course: data._id,
      })
      .populate("user")
      .lean()
      .exec();

    if (!result) throw new Error("CourseHasUsers not found");

    return result;
  }
}

export const CourseHasUsersMongo = new CourseHasUsersMongoRepository();
