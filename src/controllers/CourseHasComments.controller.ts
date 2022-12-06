import { Request, Response } from "express";
import CourseHasCommentsService from "../services/CourseHasComments.service";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";

class CourseHasCommentsController {
  @routeConfig({
    method: METHOD.GET,
    path: "/course/:id/comments",
  })
  public getAll(req: Request, res: Response, next): void {
    CourseHasCommentsService.findAll(req, res, next);
  }
}

export default CourseHasCommentsController;
