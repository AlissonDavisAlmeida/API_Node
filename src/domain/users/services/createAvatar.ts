import { AppError } from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import uploadConfig from "@config/upload_multer";
import fs from "fs";
import { UserRepository } from "../typeORM/repository/userRepository";
import User from "../typeORM/entities/User";

interface CreateAvatarProps {
  avatarFileName: string;
  userId: string;
}

export class CreateAvatar {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async execute({ avatarFileName, userId }: CreateAvatarProps): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    const userResponse = await this.userRepository.save(user);

    return userResponse;
  }
}
