import 'reflect-metadata';

import FakeUserRepository from '../../src/repositories/fakes/FakeUserRepository';
import FakeProviderRepository from '../../src/repositories/fakes/FakeProviderRepository'
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';

import AuthenticateUserService from '../../src/services/AuthenticateUserService';
import CreateProviderService from '../../src/services/CreateProviderService';
import CreateUserService from '../../src/services/CreateUserService';

import AppError from '../../src/utils/errors/AppError';
import sampleUser from '../samples/sampleUser';
import sampleProvider from '../samples/sampleProvider';

let hashProvider: HashProvider;
let fakeProviderRepository: FakeProviderRepository;
let fakeUserRepository: FakeUserRepository;

let authenticate: AuthenticateUserService;
let createProvider: CreateProviderService;
let createUser: CreateUserService;

describe('Create Provider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeProviderRepository = new FakeProviderRepository();
    hashProvider = new HashProvider();

    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    authenticate = new AuthenticateUserService(fakeUserRepository, hashProvider);
    createProvider = new CreateProviderService(fakeUserRepository, fakeProviderRepository)
  });

  it('should be able to create a new provider on database', async() => {
    const savedUser = await createUser.execute(sampleUser);
    const { user, token } = await authenticate.execute({ email: sampleUser.email, password: sampleUser.password });

    const { address, size, availability } = sampleProvider;

    const { id } = await createProvider.execute({
      user_id: user.id,
      size,
      address,
      availability
     })

     const savedProvider = await fakeProviderRepository.findById(id);

     expect(savedProvider?.address).toMatchObject(address);
     expect(savedProvider?.size).toMatchObject(size);
     expect(savedProvider?.availability).toBe(false);
     expect(savedUser.provider_id).toBe(savedProvider!.id);
  });

  it('should NOT be able to create a new provider on a non-existing user', async() => {
    const { address, size, availability } = sampleProvider;

     await expect(
      createProvider.execute({
        user_id: 'wrong_user_id',
        size,
        address,
        availability
       })
     ).rejects.toBeInstanceOf(AppError)
  });
})

