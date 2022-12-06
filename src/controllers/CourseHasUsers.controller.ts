import { Request, Response } from "express";
import CourseHasUsersService from "../services/CourseHasUsers.service";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";

class CourseHasUsersController {
  @routeConfig({
    method: METHOD.POST,
    path: "/course/:id/user",
  })
  public post(req: Request, res: Response, next): void {
    CourseHasUsersService.create(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/course/:id/user",
  })
  public getAll(req: Request, res: Response, next): void {
    CourseHasUsersService.findAll(req, res, next);
  }
}

export default CourseHasUsersController;
