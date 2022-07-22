import { productRouter } from "@domain/products/routes/productsRoutes";
import { passwordRouter } from "@domain/users/routes/passwordRouter";
import { sessionRouter } from "@domain/users/routes/sessionRouter";
import { usersRouter } from "@domain/users/routes/usersRouters";
import { Router } from "express";

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/password", passwordRouter);

export {
  routes,
};
