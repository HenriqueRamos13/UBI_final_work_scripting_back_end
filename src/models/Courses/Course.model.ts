import mongoose from "mongoose";
import { IUser } from "../User/User.model";

export const Schema = mongoose.Schema;

export interface ITopic {
  title: string;
  text: string;
}

export interface ICourse {
  _id: string;
  name: string;
  description: string;
  teacher: IUser;
  topics: ITopic[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    topics: [
      {
        title: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("course", CourseSchema);

export default CourseModel;
