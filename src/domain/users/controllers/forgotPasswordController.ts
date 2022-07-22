import { Request, Response } from "express";
import { SendForgotPassword } from "../services/sendForgotPassword";

export class ForgotPasswordController {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    const sendForgotPassword = new SendForgotPassword();

    await sendForgotPassword.execute({ email });

    return response.status(200).json({
      message: "Email sent",
    });
  }
}
