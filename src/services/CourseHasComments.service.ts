import { Request, Response } from "express";
import {
  CourseHasCommentsMongo,
  ICreateCourseHasComments,
} from "../repositories/CourseHasComments.repository";

class CourseHasCommentsService {
  public async create(props: ICreateCourseHasComments): Promise<any> {
    const { course, comment, responses } = props;

    CourseHasCommentsMongo.create({
      course,
      comment,
      responses,
    })
      .then((courseHasComment) => {
        return courseHasComment;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  public async findAll(req: Request, res: Response, next): Promise<any> {
    const { id } = req.params;

    CourseHasCommentsMongo.findAll({
      _id: id,
    })
      .then((courseHasComments) => {
        res.json({
          message: "CourseHasComments found successfully",
          data: courseHasComments,
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Error finding CourseHasComments",
          error: err,
        });
      });
  }
}

export default new CourseHasCommentsService();
