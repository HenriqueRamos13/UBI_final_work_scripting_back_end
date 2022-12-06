import { Request, Response } from "express";
import CommentService from "../services/Comment.service";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";

class CommentController {
  @routeConfig({
    method: METHOD.POST,
    path: "/comment/course/:id",
  })
  @Roles(Role.USER, Role.TEACHER)
  public async postCourse(req: Request, res: Response, next): Promise<any> {
    await CommentService.postCourse(req, res, next);
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/comment/response/:id",
  })
  @Roles(Role.USER, Role.TEACHER)
  public async postResponse(req: Request, res: Response, next): Promise<any> {
    await CommentService.postResponse(req, res, next);
  }
}

export default CommentController;
