import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';
import { AuthService } from '../../services/authService';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../data-source');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: any;

  beforeAll(() => {
    userRepository = {
      findOne: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(userRepository);
    authService = new AuthService();
  });

  describe('authenticateUser', () => {
    it('should return a token if credentials are valid', async () => {
      const user = { id: 1, email: 'john@example.com', password: 'hashedPassword' };
      userRepository.findOne.mockResolvedValueOnce(user);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      const token = 'token';
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await authService.authenticateUser({ email: 'john@example.com', password: 'password123' });

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(result).toBe(token);
    });

    it('should throw an error if credentials are invalid', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);

      await expect(authService.authenticateUser({ email: 'john@example.com', password: 'password123' })).rejects.toThrow('Invalid credentials');
    });
  });
});
