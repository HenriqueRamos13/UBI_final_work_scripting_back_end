import { Request, Response } from "express";
import { Public } from "../utils/decorators/Public.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import PassportController from "./Passport.controller";

class SessionController {
  @routeConfig({
    method: METHOD.GET,
    path: "/session",
  })
  @Public()
  public get(req: Request, res: Response): void {
    res.json({
      message: "GET",
    });
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/session",
  })
  @Public()
  public post(req: Request, res: Response, next): void {
    return new PassportController().signWithLocalStrategy(req, res, next);
  }
}

export default SessionController;
