import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: CreateUserDTO) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }
}
