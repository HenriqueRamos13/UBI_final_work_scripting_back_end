import { Request, Response } from "express";
import CourseHasUsersService from "../services/CourseHasUsers.service";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";

class CourseHasUsersController {
  @routeConfig({
    method: METHOD.POST,
    path: "/course/:id/user",
  })
  @Roles(Role.USER)
  public async post(req: Request, res: Response, next): Promise<any> {
    await CourseHasUsersService.create(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/course/:id/user",
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  public async getAll(req: Request, res: Response, next): Promise<any> {
    await CourseHasUsersService.findAll(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/course/all/user/all",
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  public async getAllFromAll(req: Request, res: Response, next): Promise<any> {
    await CourseHasUsersService.findAllFromAll(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/course/all/user/subscribed/:id?",
  })
  @Roles(Role.USER, Role.ADMIN)
  public async getAllUserCourse(
    req: Request,
    res: Response,
    next
  ): Promise<any> {
    await CourseHasUsersService.findAllUserCourses(req, res, next);
  }
}

export default CourseHasUsersController;
