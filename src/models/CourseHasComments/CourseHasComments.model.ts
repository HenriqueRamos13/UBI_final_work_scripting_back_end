import mongoose from "mongoose";
import { IComment } from "../Comments/Comments.model";
import { ICourse } from "../Courses/Course.model";

export const Schema = mongoose.Schema;

export interface ICourseHasComments {
  _id: string;
  course: ICourse;
  comment: IComment;
  responses: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseHasCommentsSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
    },
    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseHasCommentsModel = mongoose.model(
  "courseHasComments",
  CourseHasCommentsSchema
);

export default CourseHasCommentsModel;
