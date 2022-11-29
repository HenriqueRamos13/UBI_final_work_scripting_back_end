import mongoose from "mongoose";
import { ICourse } from "../Courses/Course.model";
import { IUser } from "../User/User.model";

export const Schema = mongoose.Schema;

export interface ICourseHasUsers {
  _id: string;
  course: ICourse;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const CourseHasUsersSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseHasUsersModel = mongoose.model(
  "courseHasUsers",
  CourseHasUsersSchema
);

export default CourseHasUsersModel;
