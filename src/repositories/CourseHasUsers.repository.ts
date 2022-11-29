import CommentsModel from "../models/Comments/Comments.model";
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

    if (!result._id) throw new Error("CourseHasUsers not created");

    return result;
  }

  public async findOne(data: IFindCourseHasUsers): Promise<ICourseHasUsers> {
    const result = await this.model.findOne({
      ...data,
    });

    if (!result._id) throw new Error("CourseHasUsers not found");

    return result;
  }
}

export const CourseHasUsersMongo = new CourseHasUsersMongoRepository();
