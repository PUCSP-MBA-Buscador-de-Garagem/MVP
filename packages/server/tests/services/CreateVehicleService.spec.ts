import 'reflect-metadata';

import CreateVehicleService from '../../src/services/CreateVehicleService';
import FakeVehicleRepository from '../../src/repositories/fakes/FakeVehicleRepository';

import AppError from "../../src/utils/errors/AppError";
import sampleVehicle from '../samples/sampleVehicle';

let createVehicle: CreateVehicleService;
let fakeVehicleRepository: FakeVehicleRepository;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeVehicleRepository = new FakeVehicleRepository();
    createVehicle = new CreateVehicleService(fakeVehicleRepository);
  });

  it('should be able to create a new vehicle on database', async() => {
    const vehicle = await createVehicle.execute(sampleVehicle);

    const savedVehicle = await fakeVehicleRepository.findById(vehicle.id);

    expect(savedVehicle).toMatchObject(sampleVehicle);
  });

  it('should NOT be able to create duplicated vehicle on database', async() => {
    await createVehicle.execute(sampleVehicle);

    await expect(
      createVehicle.execute(sampleVehicle)
      ).rejects.toBeInstanceOf(AppError);
  });
})

