import { PermissionChecker } from "#shared/infra/server/types.ts";
import { getUser } from "#shared/infra/server/middleware.ts";
import { DEACTIVATE_SECURITY } from "#shared/infra/server/constants.ts";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type HandlerData = {
  handler: Function;
  permissions: PermissionChecker[];
};

export class Router {
  private routes: Map<string, Map<Method, HandlerData>>;
  private basePath: string;
  private forwardedRouters: Map<string, Router>;

  constructor(basePath: string = "") {
    this.basePath = basePath;
    this.routes = new Map();
    this.forwardedRouters = new Map();
  }

  forward(path: string, router: Router) {
    this.forwardedRouters.set(path, router);
  }

  register(
    method: Method,
    path: string,
    handler: Function,
    permissions?: PermissionChecker[]
  ) {
    const fullPath = this.basePath + path;

    try {
      for (const key of this.routes.keys()) {
        if (matchesURL(key, fullPath)) {
          if (this.routes.get(key)!.has(method)) {
            throw new Error(`Path ${fullPath} already registered`);
          }
          return this.routes
            .get(fullPath)!
            .set(method.toUpperCase() as Method, {
              handler,
              permissions: permissions ?? [],
            });
        }
      }
      this.routes.set(fullPath, new Map());
      this.routes.get(fullPath)!.set(method.toUpperCase() as Method, {
        handler,
        permissions: permissions ?? [],
      });
    } catch (e) {
      // console.error(e);
    }
  }

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase() as Method;
    const fullPath = url.pathname;

    const nbSubDomains = fullPath.slice(this.basePath.length).split("/").length;
    const newPath = fullPath.slice(this.basePath.length).split("/")[
      Math.min(1, nbSubDomains - 1)
    ];

    for (const pathPattern of this.forwardedRouters.keys()) {
      if (matchesURL(pathPattern, newPath)) {
        return await this.forwardedRouters.get(pathPattern)!.handle(request);
      }
    }

    for (const [routePath, methods] of this.routes) {
      if (
        matchesURL(routePath, fullPath) ||
        matchesURL(routePath, fullPath + "/")
      ) {
        if (methods.has(method)) {
          try {
            console.log("Performing call for url ", fullPath);
            return await performCallWithPermissions(
              methods.get(method)!,
              request,
              extractKwargs(routePath, fullPath)
            );
          } catch (e) {
            if (e.message === "invalid kwarg")
              return new Response(e.message, { status: 400 });
            throw e;
          }
        }
        return new Response("Method Not Allowed", { status: 405 });
      }
    }

    return new Response("Bad request", { status: 400 });
  }
}

const performCallWithPermissions = async (
  handlerData: HandlerData,
  request: Request,
  kwargsMap: Map<string, string | number>
) => {
  if (DEACTIVATE_SECURITY) {
    return handlerData.handler(request);
  }
  const user = await getUser(request);
  for (const permission of handlerData.permissions) {
    if (!(await permission(request, user, kwargsMap))) {
      return new Response("Forbidden", { status: 403 });
    }
  }
  return handlerData.handler(request, user, kwargsMap);
};

/**
 *
 * @param pattern the registered pattern
 * @param path path to analyze
 * This will check if the path matches the pattern, and
 */
const matchesURL = (pattern: string, path: string): boolean => {
  const patternParts = pattern.split("/").filter((part) => !!part.length);
  const pathParts = path.split("/").filter((part) => !!part.length);

  if (patternParts.length !== pathParts.length) {
    return false;
  }
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i] !== pathParts[i] && !patternParts[i].startsWith(":")) {
      return false;
    }
  }
  return true;
};

const extractKwargs = (
  pattern: string,
  path: string
): Map<string, string | number> => {
  const patternParts = pattern.split("/").filter((part) => !!part.length);
  const pathParts = path.split("/").filter((part) => !!part.length);
  const kwargs = new Map();
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      const paramName = patternParts[i].split(":")[1];
      const paramType = patternParts[i].split(":")[2];
      if (paramType === "number") {
        if (isNaN(Number(pathParts[i]))) {
          throw new Error("invalid kwarg");
        }
        kwargs.set(paramName, Number(pathParts[i]));
      } else {
        kwargs.set(paramName, pathParts[i]);
      }
    }
  }
  return kwargs;
};
