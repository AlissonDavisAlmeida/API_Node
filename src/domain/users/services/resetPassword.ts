import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { addHours, isAfter } from "date-fns";
import bcrypt from "bcryptjs";
import { UserRepository } from "../typeORM/repository/userRepository";
import { UserTokenRepository } from "../typeORM/repository/userTokenRepository";

interface ResetPasswordDTO {
  token: string;
  password: string;
}

export class ResetPassword {
  private userTokenRepository: UserTokenRepository;

  private userRepository: UserRepository;

  constructor() {
    this.userTokenRepository = getCustomRepository(UserTokenRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ token, password }: ResetPasswordDTO): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User Token is not valid");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    const isExpire = isAfter(Date.now(), compareDate);

    if (isExpire) {
      throw new AppError("Token expired");
    }

    user.password = await bcrypt.hash(password, 8);

    await this.userRepository.save(user);
  }
}
