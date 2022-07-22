import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeORM/repository/userRepository";
import { UserTokenRepository } from "../typeORM/repository/userTokenRepository";

interface SendForgotPasswordDTO {
  email: string;
}

export class SendForgotPassword {
  private userTokenRepository: UserTokenRepository;

  private userRepository: UserRepository;

  constructor() {
    this.userTokenRepository = getCustomRepository(UserTokenRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ email }: SendForgotPasswordDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found");
    }

    const userToken = await this.userTokenRepository.generateToken(user.id);

    if (!userToken) {
      throw new AppError("User not found");
    }

    console.log(userToken);
  }
}
