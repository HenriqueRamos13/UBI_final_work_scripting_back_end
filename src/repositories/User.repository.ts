import e from "express";
import UserModel, { IUser } from "../models/User/User.model";
import { Role } from "../utils/enums/Roles.enum";

export interface IUpdateUser {
  _id: string;
  email?: string;
  password?: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  role?: Role;
}

export interface IFindUser {
  email?: string;
  _id?: string;
}

class UserMongoRepository {
  model = UserModel;

  public async create(data: ICreateUser): Promise<IUser> {
    const userExists = await this.model.findOne({
      email: data.email,
    });

    if (userExists) throw new Error("User already exists");

    const user = await this.model.create({
      ...data,
    });

    if (!user._id) throw new Error("User not created");

    return user._doc;
  }

  public async findOne(data: IFindUser): Promise<IUser> {
    const user = await this.model
      .findOne({
        ...data,
      })
      .lean()
      .exec();

    if (!user._id) throw new Error("User not found");

    return user;
  }

  public async findAll({ type }: { type?: Role | null }): Promise<any[]> {
    const users = await this.model
      .find({
        ...(type && { role: type }),
      })
      .lean()
      .exec();

    if (!users) throw new Error("Users not found");

    return users;
  }

  public async update(data: IUpdateUser): Promise<IUser> {
    const { password, email, _id } = data;

    if (email) {
      const userExists = await this.model
        .findOne({
          email,
        })
        .lean()
        .exec();

      if (userExists) throw new Error("User already exists");
    }

    const user = await this.model
      .findByIdAndUpdate(_id, {
        ...(password && { password }),
        ...(email && { email }),
      })
      .lean()
      .exec();

    if (!user._id) throw new Error("User not updated");

    return user;
  }

  public async delete(id: string): Promise<IUser> {
    const user = await this.model.findByIdAndDelete(id).lean().exec();

    return user;
  }
}

export const UserMongo = new UserMongoRepository();
