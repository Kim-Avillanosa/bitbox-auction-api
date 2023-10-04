import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../modules/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../modules/auth/constants';
import { UnauthorizedException } from '@nestjs/common';

// Mock user data
const mockUserData = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password',
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password',
  },
];

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use the real TypeORM Repository class
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));

    // Mock user repository methods
    userRepository.findOneBy = jest.fn().mockImplementation((query) => {
      const email = query.email;
      const password = query.password;
      return mockUserData.find((user) => user.email === email);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return valid credentials', async () => {
    //arrange
    const username = 'user1@example.com';
    const password = 'password';

    // act
    const result = await service.signIn(username, password);

    // assert
    expect(result.access_token).toBeDefined();
  });

  it('should fail invalid credentials', async () => {
    //arrange
    const username = 'wrong@example.com';
    const password = 'password';

    //  act and assert
    expect(service.signIn(username, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
