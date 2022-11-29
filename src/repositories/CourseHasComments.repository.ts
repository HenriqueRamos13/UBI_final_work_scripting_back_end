import { IComment } from "../models/Comments/Comments.model";
import CourseHasCommentsModel, {
  ICourseHasComments,
} from "../models/CourseHasComments/CourseHasComments.model";
import { ICourse } from "../models/Courses/Course.model";

export interface ICreateCourseHasComments {
  course: ICourse;
  comment: IComment;
  responses: IComment[];
}

export interface IFindCourseHasComments {
  _id?: string;
}

class CourseHasCommentsMongoRepository {
  model = CourseHasCommentsModel;

  public async create(
    data: ICreateCourseHasComments
  ): Promise<ICourseHasComments> {
    const result = await this.model.create({
      ...data,
    });

    if (!result._id) throw new Error("CourseHasComment not created");

    return result;
  }

  public async findOne(
    data: IFindCourseHasComments
  ): Promise<ICourseHasComments> {
    const result = await this.model.findOne({
      ...data,
    });

    if (!result._id) throw new Error("CourseHasComment not found");

    return result;
  }
}

export const CourseHasCommentsMongo = new CourseHasCommentsMongoRepository();
