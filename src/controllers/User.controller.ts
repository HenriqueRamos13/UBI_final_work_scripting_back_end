import { Request, Response } from "express";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";

class UserController {
  @routeConfig({
    method: METHOD.POST,
    path: "/auth",
  })
  public post(req: Request, res: Response, next): void {
    res.json({
      message: "POST",
    });
  }

  @routeConfig({
    method: METHOD.PUT,
    path: "/auth",
  })
  public put(req: Request, res: Response): void {
    res.json({
      message: "PUT",
    });
  }

  @routeConfig({
    method: METHOD.PATCH,
    path: "/auth",
  })
  public patch(req: Request, res: Response): void {
    res.json({
      message: "PATCH",
    });
  }

  @routeConfig({
    method: METHOD.DELETE,
    path: "/auth",
  })
  public delete(req: Request, res: Response): void {
    res.json({
      message: "DELETE",
    });
  }
}

export default UserController;
