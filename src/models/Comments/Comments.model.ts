import mongoose from "mongoose";
import { IUser } from "../User/User.model";

export const Schema = mongoose.Schema;

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentsModel = mongoose.model("comment", CommentsSchema);

export default CommentsModel;
