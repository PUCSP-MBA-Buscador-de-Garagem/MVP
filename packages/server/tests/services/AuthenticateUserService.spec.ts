import 'reflect-metadata';

import { verify } from 'jsonwebtoken';

import AppError from '../../src/utils/errors/AppError';
import authConfig from '../../src/config/auth';
import sampleUser from '../samples/sampleUser';

import FakeUserRepository from "../../src/repositories/fakes/FakeUserRepository";
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';

import AuthenticateUserService from '../../src/services/AuthenticateUserService'
import CreateUserService from "../../src/services/CreateUserService";


let authenticate:AuthenticateUserService;
let createUser: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let hashProvider: HashProvider;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new HashProvider();

    authenticate = new AuthenticateUserService(fakeUserRepository, hashProvider);
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
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

