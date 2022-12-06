import CommentsModel, { IComment } from "../models/Comments/Comments.model";
import UserModel, { IUser } from "../models/User/User.model";

export interface ICreateComment {
  text: string;
  user: IUser;
}

class CommentsMongoRepository {
  model = CommentsModel;

  public async findOne(id: string): Promise<IComment> {
    const comment = await this.model.findById({
      _id: id,
    });

    return comment;
  }

  public async create(data: ICreateComment): Promise<IComment> {
    const user = await UserModel.findById(data.user).lean().exec();

    const comment = await this.model.create({
      ...data,
      user: user,
    });

    if (!comment._id) throw new Error("Comment not created");

    return comment;
  }
}

export const CommentsMongo = new CommentsMongoRepository();
