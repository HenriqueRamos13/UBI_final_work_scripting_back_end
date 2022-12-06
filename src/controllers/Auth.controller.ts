import { Request, Response, Router } from "express";
import AuthService from "../services/Auth.service";
import { Public } from "../utils/decorators/Public.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import PassportController from "./Passport.controller";

class AuthController {
  @routeConfig({
    method: METHOD.POST,
    path: "/auth",
  })
  @Public()
  public post(req: Request, res: Response, next): void {
    return new PassportController().signup(req, res, next);
  }

  @routeConfig({
    method: METHOD.PUT,
    path: "/auth",
  })
  @Public()
  public put(req: Request, res: Response): void {
    res.json({
      message: "PUT",
    });
  }

  @routeConfig({
    method: METHOD.PATCH,
    path: "/auth",
  })
  @Public()
  public patch(req: Request, res: Response): void {
    res.json({
      message: "PATCH",
    });
  }

  @routeConfig({
    method: METHOD.DELETE,
    path: "/auth",
  })
  @Public()
  public delete(req: Request, res: Response): void {
    res.json({
      message: "DELETE",
    });
  }
}

export default AuthController;
