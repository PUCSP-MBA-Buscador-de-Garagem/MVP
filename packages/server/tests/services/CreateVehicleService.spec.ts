import 'reflect-metadata';

import FakeVehicleRepository from '../../src/repositories/fakes/FakeVehicleRepository';
import CreateVehicleService from '../../src/services/CreateVehicleService';

import AppError from "../../src/utils/errors/AppError";

let fakeVehicleRepository: FakeVehicleRepository;
let createVehicle: CreateVehicleService;

const sampleVehicle = {
  brand: 'mercedez',
  model: 'class-c-180',
  year: '2022',
  size: {
    width: 2000,
    height: 3000,
    length: 6200
  }
}

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

