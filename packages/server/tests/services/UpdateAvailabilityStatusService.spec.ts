import 'reflect-metadata';

import FakeUserRepository from '../../src/repositories/fakes/FakeUserRepository';
import FakeProviderRepository from '../../src/repositories/fakes/FakeProviderRepository'
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';

import AuthenticateUserService from '../../src/services/AuthenticateUserService';
import CreateProviderService from '../../src/services/CreateProviderService';
import CreateUserService from '../../src/services/CreateUserService';
import UpdateAvailabilityStatusService from '../../src/services/UpdateAvailabilityStatusService';

import AppError from '../../src/utils/errors/AppError';
import sampleUserProvider from '../samples/sampleUserProvider';
import sampleProvider from '../samples/sampleProvider';

let hashProvider: HashProvider;
let fakeProviderRepository: FakeProviderRepository;
let fakeUserRepository: FakeUserRepository;

let authenticate: AuthenticateUserService;
let createProvider: CreateProviderService;
let createUser: CreateUserService;
let updateAvailabilityStatus: UpdateAvailabilityStatusService;

describe('Create Provider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeProviderRepository = new FakeProviderRepository();
    hashProvider = new HashProvider();

    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    authenticate = new AuthenticateUserService(fakeUserRepository, hashProvider);
    createProvider = new CreateProviderService(fakeUserRepository, fakeProviderRepository)
    updateAvailabilityStatus = new UpdateAvailabilityStatusService(fakeProviderRepository);
  });

  it('should be able to create a new provider on database', async() => {
    const user = await createUser.execute(sampleUserProvider);
    const provider = sampleProvider;

    const { id } = await createProvider.execute({
      user_id: user.id,
      ...provider
     })

    await updateAvailabilityStatus.execute({ provider_id: id, status: true });

    const updatedProvider = await fakeProviderRepository.findById(id);

    expect(updatedProvider?.availability).toBe(true);
  });
})

