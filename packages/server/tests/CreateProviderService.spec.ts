import 'reflect-metadata';

import FakeUserRepository from '../src/repositories/fakes/FakeUserRepository';
import FakeProviderRepository from '../src/repositories/fakes/FakeProviderRepository'
import HashProvider from '../src/providers/HashProvider/BCryptHashProvider';

import CreateUserService from '../src/services/CreateUserService';
import AuthenticateUserService from '../src/services/AuthenticateUserService';
import CreateProviderService from '../src/services/CreateProviderService';
import AppError from '../src/utils/errors/AppError';

let createUser: CreateUserService;
let authenticate: AuthenticateUserService;
let createProvider: CreateProviderService;

let fakeUserRepository: FakeUserRepository;
let fakeProviderRepository: FakeProviderRepository;
let hashProvider: HashProvider;

const sampleUser = {
  name: 'testName',
  email: 'user@test.com',
  password: '123456',
}

const sampleProvider = {
  address: {
    city: 'Barueri',
    FU: 'São Paulo',
    number: 144,
    zipcode: '07860-015'
  },
  size: {
    height: 4.2,
    length: 8.1,
    width: 5
  },
  availability: {
    start: '10:00',
    end: '19:00'
  }
}

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

     expect(savedProvider?.user_id).toBe(user.id);
     expect(savedProvider?.address).toMatchObject(address);
     expect(savedProvider?.size).toMatchObject(size);
     expect(savedProvider?.availability).toMatchObject(availability);
     expect(savedUser.provider_id).toBe(savedProvider!.id);
  });

  it('should NOT be able to create a new provider on a non-existing user', async() => {
    const { address, size, availability } = sampleProvider;

     expect(
      createProvider.execute({
        user_id: 'wrong_user_id',
        size,
        address,
        availability
       })
     ).rejects.toBeInstanceOf(AppError)
  });
})

