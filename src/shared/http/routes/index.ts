import { productRouter } from "@domain/products/routes/productsRoutes";
import { sessionRouter } from "@domain/users/routes/sessionRouter";
import { usersRouter } from "@domain/users/routes/usersRouters";
import { Router } from "express";

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

export {
  routes,
};
