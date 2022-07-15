import { Request, Response } from "express";
import { CreateSession } from "../services/createSession";

export class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSession();

    const userWithToken = await createSession.execute({ email, password });

    return response.json(userWithToken);
  }
}
