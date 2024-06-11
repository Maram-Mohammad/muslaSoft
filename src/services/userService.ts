import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      return { user, token };
    }
    throw new Error('Invalid credentials');
  }
}
