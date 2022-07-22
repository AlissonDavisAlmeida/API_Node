import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ForgotPasswordController } from "../controllers/forgotPasswordController";
import { ResetPasswordController } from "../controllers/resetPasswordController";

export const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController()

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),

  forgotPasswordController.create,
);

passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    },
    
  }),
  resetPasswordController.create,
);
