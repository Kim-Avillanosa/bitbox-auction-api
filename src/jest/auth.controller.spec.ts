import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../modules/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../modules/auth/constants';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { AuthController } from '../modules/auth/auth.controller';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;

  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('/auth/login (GET)', async () => {
    const username = 'user1@example.com';
    const password = 'password';

    jest.spyOn(authService, 'signIn').mockImplementation(() =>
      Promise.resolve({
        access_token: 'sample_token',
      }),
    );

    //act and assert

    const result = await authController.signIn({
      email: username,
      password: password,
    });

    expect(result.access_token).toBeDefined();
  });
});
