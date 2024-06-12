import bcrypt from 'bcryptjs';
import { validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { CreateUserDTO } from '../dto/userTDO';


export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: CreateUserDTO) {
    
     const userDto = new CreateUserDTO();
     userDto.name = userData.name;
     userDto.email = userData.email;
     userDto.password = userData.password;
 
     await validateOrReject(userDto).catch(errors => {
       throw new Error('Validation failed!');
     });
     
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }
}
