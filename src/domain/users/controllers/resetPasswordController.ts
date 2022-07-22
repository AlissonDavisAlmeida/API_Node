import { Request, Response } from "express";
import { ResetPassword } from "../services/resetPassword";

export class ResetPasswordController{

    async create(request: Request, response: Response){
        const { token, password } = request.body;

        const resetPassword = new ResetPassword()

        await resetPassword.execute({
            token,
            password
        })

        return response.status(204).json();
    }
}