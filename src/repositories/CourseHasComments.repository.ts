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

  public async findAll(data: IFindCourseHasComments): Promise<any[]> {
    const result = await this.model
      .find({
        course: data._id,
      })
      .populate({
        path: "comment",
        populate: {
          path: "user",
          select: {
            password: 0,
          },
        },
      })
      .populate({
        path: "responses",
        populate: {
          path: "user",
          select: {
            password: 0,
          },
        },
      })
      .populate("course")
      .lean()
      .exec();

    if (!result) throw new Error("CourseHasComment not found");

    return result;
  }

  public async addResponse({
    comment,
    response,
  }: {
    comment: string;
    response: string;
  }): Promise<IComment> {
    const updatedComment = await this.model.findOneAndUpdate(
      {
        comment: comment,
      },
      {
        $push: {
          responses: response,
        },
      },
      {
        new: true,
      }
    );

    return updatedComment;
  }
}

export const CourseHasCommentsMongo = new CourseHasCommentsMongoRepository();
