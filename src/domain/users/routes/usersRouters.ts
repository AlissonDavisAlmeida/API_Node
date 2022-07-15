import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "../controllers/usersController";
import { authenticated } from "../../../shared/http/middlewares/authenticated";

export const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", authenticated, userController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
