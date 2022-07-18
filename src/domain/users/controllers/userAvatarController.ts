import { Request, Response } from "express";
import { CreateAvatar } from "../services/createAvatar";

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const avatarService = new CreateAvatar();
    const { user } = request;

    const { file } = request;

    const userResponse = await avatarService.execute({
      userId: user.id,
      avatarFileName: file!.filename,
    });

    return response.json(userResponse);
  }
}
