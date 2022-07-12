import { productRouter } from "@domain/products/routes/productsRoutes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productRouter);

export {
  routes,
};
