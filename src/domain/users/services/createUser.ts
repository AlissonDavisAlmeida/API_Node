import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeORM/entities/User";
import { UserRepository } from "../typeORM/repository/userRepository";

interface CreateUserDTO {

  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      const error = new AppError("User with email already exists", 400);

      throw error;
    }

    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
