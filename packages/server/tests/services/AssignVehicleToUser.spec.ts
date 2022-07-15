import 'reflect-metadata';

import AppError from '../../src/utils/errors/AppError';
import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';
import sampleUser from '../samples/sampleUser';
import sampleVehicle from '../samples/sampleVehicle';

import FakeUserRepository from '../../src/repositories/fakes/FakeUserRepository';
import FakeVehicleRepository from '../../src/repositories/fakes/FakeVehicleRepository';

import AssignVehicleToUser from '../../src/services/AssignVehicleToUser';
import CreateUserService from '../../src/services/CreateUserService';
import CreateVehicleService from '../../src/services/CreateVehicleService';
import User from '../../src/entities/User';
import Vehicle from '../../src/entities/Vehicle';

let fakeUserRepository: FakeUserRepository;
let fakeVehicleRepository: FakeVehicleRepository;
let hashProvider: HashProvider;

let assignVehicle: AssignVehicleToUser;
let createUser: CreateUserService;
let createVehicle: CreateVehicleService;

let user: User;
let vehicle: Vehicle;

describe('Assign/Update vehicle to user', () => {
  beforeEach(async() => {
    fakeUserRepository = new FakeUserRepository();
    fakeVehicleRepository = new FakeVehicleRepository();
    hashProvider = new HashProvider();

    assignVehicle = new AssignVehicleToUser(fakeUserRepository, fakeVehicleRepository);
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    createVehicle = new CreateVehicleService(fakeVehicleRepository);

    user = await createUser.execute(sampleUser);
    vehicle = await createVehicle.execute(sampleVehicle);
  });

  it('should be able to assign a vehicle id to User', async() => {
    await assignVehicle.execute({ user_id: user.id, vehicle_id: vehicle.id });

    const savedUser = await fakeUserRepository.findById(user.id);

    expect(savedUser?.email).toBe(sampleUser.email);
    expect(savedUser?.name).toBe(sampleUser.name);
    expect(savedUser?.vehicle_id).toBe(vehicle.id);
  });

  it('should NOT be able to assign a invalid user id', async() => {
    await expect(
      assignVehicle.execute({ user_id: 'wrong_user_id', vehicle_id: vehicle.id })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to assign a invalid vehicle id', async() => {
    await expect(
      assignVehicle.execute({ user_id: user.id, vehicle_id: 'wrong_vehicle_id' })
    ).rejects.toBeInstanceOf(AppError);
  });
})

