import CommentsModel, { IComment } from "../models/Comments/Comments.model";
import { IUser } from "../models/User/User.model";

export interface ICreateComment {
  text: string;
  user: IUser;
}

export interface IFindComment {
  _id?: string;
}

class CommentsMongoRepository {
  model = CommentsModel;

  public async create(data: ICreateComment): Promise<IComment> {
    const comment = await this.model.create({
      ...data,
    });

    if (!comment._id) throw new Error("Comment not created");

    return comment;
  }

  public async findOne(data: IFindComment): Promise<IComment> {
    const comment = await this.model.findOne({
      ...data,
    });

    if (!comment._id) throw new Error("Comment not found");

    return comment;
  }
}

export const CommentsMongo = new CommentsMongoRepository();
