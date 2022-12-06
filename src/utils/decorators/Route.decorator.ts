import { Request, Response, Router } from "express";
import METHOD from "../enums/methods.enum";

interface RouteConfigProps {
  method: METHOD;
  path: string;
}

const route = Router();

function routeConfig({ method, path }: RouteConfigProps): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const response = async (req: Request, res: Response) => {
      try {
        const original = await descriptor.value(req, res);
        return original;
        res.status(200).json(original);
      } catch (e: any) {
        res.status(500).json({
          message: "Internal server error",
          error: e.message ?? "Internal server error",
        });
      }
    };

    route[method](path, response);
  };
}

export { route, routeConfig };
