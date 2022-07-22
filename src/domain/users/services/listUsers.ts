import { getCustomRepository } from "typeorm";
import User from "../typeORM/entities/User";
import { UserRepository } from "../typeORM/repository/userRepository";

export class ListUsers {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
