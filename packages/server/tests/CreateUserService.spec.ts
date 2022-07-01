import 'reflect-metadata';

import CreateUserService from '../src/services/CreateUserService';
import FakeUserRepository from '../src/repositories/fakes/FakeUserRepository';
import HashProvider from '../src/providers/HashProvider/BCryptHashProvider';
import AppError from '../src/utils/errors/AppError';

let createUser: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let hashProvider: HashProvider;

const sampleUser = {
  name: 'testName',
  email: 'user@test.com',
  password: '123456',
}

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new HashProvider();
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
  });

  it('should be able to save a new user on database', async() => {
    const { id, name, email } = await createUser.execute(sampleUser);

    const userSaved = await fakeUserRepository.findById(id);

    expect(userSaved?.name).toBe(name);
    expect(userSaved?.email).toBe(email);
  });

  it('should NOT be able to save a new user with a existing email on database', async() => {
    await createUser.execute(sampleUser);

    await expect(
      createUser.execute(sampleUser)
    ).rejects.toBeInstanceOf(AppError);
  });
})

