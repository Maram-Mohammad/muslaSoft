import { getRepository } from 'typeorm';
import { User } from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepository = getRepository(User);

  async createUser(userData: CreateUserDTO) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }
}
