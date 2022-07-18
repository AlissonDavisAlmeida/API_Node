import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";
import upload_multer from "@config/upload_multer";
import { UserController } from "../controllers/usersController";
import { authenticated } from "../../../shared/http/middlewares/authenticated";
import { UserAvatarController } from "../controllers/userAvatarController";

export const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(upload_multer);

usersRouter.get("/", authenticated, userController.index);

usersRouter.patch("/avatar", authenticated, upload.single("avatar"), userAvatarController.update);

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
