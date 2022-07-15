import 'reflect-metadata';

import FakeUserRepository from '../../src/repositories/fakes/FakeUserRepository';
import FakeProviderRepository from '../../src/repositories/fakes/FakeProviderRepository'
import FakeVehicleRepository from '../../src/repositories/fakes/FakeVehicleRepository';
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';

import AuthenticateUserService from '../../src/services/AuthenticateUserService';
import CreateProviderService from '../../src/services/CreateProviderService';
import CreateUserService from '../../src/services/CreateUserService';
import CreateVehicleService from '../../src/services/CreateVehicleService';
import SearchProviderService from '../../src/services/SearchProviderService';

import AppError from '../../src/utils/errors/AppError';
import sampleUser from '../samples/sampleUser';
import sampleUserProvider from '../samples/sampleUserProvider';
import sampleProvider from '../samples/sampleProvider';
import sampleProviderB from '../samples/sampleProviderB'
import sampleVehicle from '../samples/sampleVehicle';
import AssignVehicleToUser from '../../src/services/AssignVehicleToUser';

let fakeProviderRepository: FakeProviderRepository;
let fakeUserRepository: FakeUserRepository;
let fakeVehicleRepository: FakeVehicleRepository;
let hashProvider: HashProvider;

let assignVehicle: AssignVehicleToUser;
let authenticate: AuthenticateUserService;
let createProvider: CreateProviderService;
let createUser: CreateUserService;
let createVehicle: CreateVehicleService;
let searchProvider: SearchProviderService;

describe('Search Provider', () => {
  beforeEach(() => {
    fakeProviderRepository = new FakeProviderRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeVehicleRepository = new FakeVehicleRepository();
    hashProvider = new HashProvider();

    assignVehicle = new AssignVehicleToUser(fakeUserRepository, fakeVehicleRepository);
    authenticate = new AuthenticateUserService(fakeUserRepository, hashProvider);
    createProvider = new CreateProviderService(fakeUserRepository, fakeProviderRepository)
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    createVehicle = new CreateVehicleService(fakeVehicleRepository);
    searchProvider = new SearchProviderService(fakeUserRepository, fakeProviderRepository, fakeVehicleRepository)
  });

  it('should be able to search providers on database', async() => {
    const user = await createUser.execute(sampleUser);
    const userProvider = await createUser.execute(sampleUserProvider);
    const vehicle = await createVehicle.execute(sampleVehicle);

    const userWithVehicle = await assignVehicle.execute({ user_id: user.id, vehicle_id: vehicle.id });

    await createProvider.execute({
      user_id: userProvider.id,
      ...sampleProvider
    });

    await createProvider.execute({
      user_id: userProvider.id,
      ...sampleProviderB
    });

     const providersList = await searchProvider.execute({ user_id: user.id });

     expect(providersList).toBeInstanceOf(Array);
     expect(providersList!.length).toBe(1);
     expect(providersList![0]).toMatchObject(sampleProviderB);
  });
})

