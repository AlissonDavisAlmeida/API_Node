import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config/auth";
import User from "../typeORM/entities/User";
import { UserRepository } from "../typeORM/repository/userRepository";

interface RequestSession {
  email: string;
  password: string;
}

interface ResponseSession {
  user: User,
  token?: string;
}

export class CreateSession {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async execute({ email, password }: RequestSession): Promise<ResponseSession> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = sign(
      { userId: user.id },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn },
    );

    return {
      user,
      token,
    };
  }
}
