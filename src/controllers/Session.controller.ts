import { Request, Response } from "express";
import { Public } from "../utils/decorators/Public.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import PassportController from "./Passport.controller";
import * as jwt from "jsonwebtoken";

class SessionController {
  @routeConfig({
    method: METHOD.GET,
    path: "/session",
  })
  @Public()
  public get(req: Request, res: Response): any {
    // verify if token is valid

    const token = req.cookies.authorization;

    if (!token) {
      return res.json({
        isAuth: false,
      });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        return res.json({
          isAuth: false,
        });
      }

      return res.json({
        isAuth: true,
        user: {
          email: decoded.email,
          role: decoded.role,
        },
      });
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

  @routeConfig({
    method: METHOD.DELETE,
    path: "/session",
  })
  @Public()
  public delete(req: Request, res: Response, next): void {
    res.cookie("authorization", "", {
      httpOnly: true,
      maxAge: 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "DELETE",
    });
  }
}

export default SessionController;
