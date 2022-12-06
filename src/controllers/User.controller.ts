import { Request, Response } from "express";
import UserService from "../services/User.service";
import ErrorHandler from "../utils/Classes/ErrorHandler";
import { Public } from "../utils/decorators/Public.decorator";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";

class UserController {
  @routeConfig({
    method: METHOD.GET,
    path: "/user/:id",
  })
  @Roles(Role.ADMIN, Role.USER, Role.TEACHER)
  public async get(req: Request, res: Response, next): Promise<any> {
    await UserService.findOne(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/user",
  })
  @Roles(Role.ADMIN)
  public async getAll(req: Request, res: Response, next): Promise<any> {
    await UserService.findAll(req, res, next);
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/user",
  })
  @Roles(Role.ADMIN)
  @Public()
  public async post(req: Request, res: Response, next): Promise<any> {
    await UserService.create(req, res, next);
  }

  @routeConfig({
    method: METHOD.PUT,
    path: "/user/:id",
  })
  @Roles(Role.ADMIN)
  public put(req: Request, res: Response, next): void {
    UserService.updateAdmin(req, res, next);
  }

  @routeConfig({
    method: METHOD.PATCH,
    path: "/user",
  })
  @Roles(Role.ADMIN, Role.USER, Role.TEACHER)
  public patch(req: Request, res: Response, next): void {
    UserService.update(req, res, next);
  }

  @routeConfig({
    method: METHOD.DELETE,
    path: "/user/:id",
  })
  @Roles(Role.ADMIN)
  public delete(req: Request, res: Response, next): void {
    UserService.delete(req, res, next);
  }
}

export default UserController;
