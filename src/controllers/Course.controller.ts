import { Request, Response } from "express";
import CourseService from "../services/Course.service";
import ErrorHandler from "../utils/Classes/ErrorHandler";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";

class CourseController {
  @routeConfig({
    method: METHOD.GET,
    path: "/course/:id",
  })
  @Roles(Role.ADMIN, Role.USER, Role.TEACHER)
  public async get(req: Request, res: Response, next): Promise<any> {
    await CourseService.findOne(req, res, next);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/course",
  })
  @Roles(Role.ADMIN, Role.USER, Role.TEACHER)
  public async getAll(req: Request, res: Response, next): Promise<any> {
    await CourseService.findAll(req, res, next);
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/course",
  })
  @Roles(Role.TEACHER)
  public async post(req: Request, res: Response, next): Promise<any> {
    await CourseService.create(req, res, next);
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/course/:id/topic",
  })
  @Roles(Role.TEACHER)
  public async postTopic(req: Request, res: Response, next): Promise<any> {
    await CourseService.createTopic(req, res, next);
  }

  @routeConfig({
    method: METHOD.PUT,
    path: "/course/:id",
  })
  @Roles(Role.ADMIN)
  public put(req: Request, res: Response, next): void {
    CourseService.updateAdmin(req, res, next);
  }

  @routeConfig({
    method: METHOD.PATCH,
    path: "/course/:id",
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  public patch(req: Request, res: Response, next): void {
    CourseService.update(req, res, next);
  }

  @routeConfig({
    method: METHOD.DELETE,
    path: "/course/:id",
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  public delete(req: Request, res: Response, next): void {
    CourseService.delete(req, res, next);
  }
}

export default CourseController;
