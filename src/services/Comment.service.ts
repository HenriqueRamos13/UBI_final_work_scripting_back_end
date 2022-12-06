import { Request, Response } from "express";
import { CommentsMongo } from "../repositories/Comments.repository";
import { CourseMongo } from "../repositories/Course.repository";
import { CourseHasCommentsMongo } from "../repositories/CourseHasComments.repository";
import CourseHasCommentsService from "./CourseHasComments.service";

class CommentService {
  public async postCourse(req: Request, res: Response, next): Promise<any> {
    const { text } = req.body;
    const { id: course } = req.params;
    const { user } = req;

    CommentsMongo.create({
      text,
      user: (user as any)._id,
    })
      .then(async (comment) => {
        // const userData = await UserMongo.findOne({
        //   _id: (user as any)._id,
        // });

        const courseData = await CourseMongo.findOne({
          _id: course,
        });

        await CourseHasCommentsService.create({
          course: courseData,
          comment: comment,
          responses: [],
        });

        res.json({
          message: "Comment created successfully",
          data: comment,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error creating comment",
          error: err.message,
        });
      });
  }

  public async postResponse(req: Request, res: Response, next): Promise<any> {
    const { text } = req.body;
    const { id: commentId } = req.params;
    const { user } = req;

    CommentsMongo.create({
      text,
      user: (user as any)._id,
    })
      .then(async (comment) => {
        // const userData = await UserMongo.findOne({
        //   _id: (user as any)._id,
        // });

        const commentToResponseData = await CommentsMongo.findOne(commentId);

        const response = await CourseHasCommentsMongo.addResponse({
          comment: commentToResponseData._id,
          response: comment._id,
        });

        res.json({
          message: "Comment created successfully",
          data: response,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error creating comment",
          error: err.message,
        });
      });
  }
}

export default new CommentService();
