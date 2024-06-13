import bcrypt from 'bcryptjs';
import { validateOrReject } from 'class-validator';
import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import { UserService } from '../../services/userService';

jest.mock('bcryptjs');
jest.mock('class-validator');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: any;

  beforeAll(async () => {
    userRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(userRepository);
    userService = new UserService();
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
      (validateOrReject as jest.Mock).mockResolvedValueOnce(undefined);
      userRepository.create.mockReturnValueOnce({ ...userData, password: hashedPassword });
      userRepository.save.mockResolvedValueOnce({ ...userData, password: hashedPassword });
      userRepository.findOne.mockResolvedValueOnce(null);

      const result = await userService.createUser(userData as User);

      expect(validateOrReject).toHaveBeenCalledWith(expect.any(User));
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
      });
      expect(result).toEqual({
        ...userData,
        password: hashedPassword,
      });
    });
  });
});
