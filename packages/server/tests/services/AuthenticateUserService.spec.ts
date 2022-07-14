import 'reflect-metadata';

import FakeUserRepository from "../../src/repositories/fakes/FakeUserRepository";
import CreateUserService from "../../src/services/CreateUserService";
import AuthenticateUserService from '../../src/services/AuthenticateUserService'
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';
import AppError from '../../src/utils/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../src/config/auth';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let authenticate:AuthenticateUserService;
let hashProvider: HashProvider;

const sampleUser = {
  name: 'testName',
  email: 'user@test.com',
  password: '123456',
}

describe('Create Session', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new HashProvider();
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    authenticate = new AuthenticateUserService(fakeUserRepository, hashProvider);
  });

  it('should be able to login a user', async() => {
    const { id } = await createUser.execute(sampleUser);
    const { user, token } = await authenticate.execute({ email: sampleUser.email, password: sampleUser.password })

    const decoded = verify(token, authConfig.jwt.secret);

    expect(user.id).toBe(id);
    expect(token).toBeDefined();
    expect(decoded.sub).toBeDefined();
  });

  it('should NOT be able to login a user with wrong email', async() => {
    await createUser.execute(sampleUser);

    await expect(
      authenticate.execute({ email: 'wrong_email@test.com', password: sampleUser.password })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to login a user with wrong password', async() => {
    await createUser.execute(sampleUser);

    await expect(
      authenticate.execute({ email: sampleUser.email, password: 'wrong_password' })
    ).rejects.toBeInstanceOf(AppError);
  });
})

