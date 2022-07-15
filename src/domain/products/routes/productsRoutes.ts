import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { authenticated } from "@shared/http/middlewares/authenticated";
import { ProductsController } from "../controllers/ProductsController";

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get("/", authenticated, productsController.index);

productRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.findProduct,
);

productRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.update,
);

productRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.remove,
);

export {
  productRouter,
};
