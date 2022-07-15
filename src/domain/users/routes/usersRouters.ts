import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "../controllers/usersController";

export const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", userController.index);

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
