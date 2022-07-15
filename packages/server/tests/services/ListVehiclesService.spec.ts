import 'reflect-metadata';
import Vehicle from '../../src/entities/Vehicle';

import FakeVehicleRepository from '../../src/repositories/fakes/FakeVehicleRepository';

import CreateVehicleService from '../../src/services/CreateVehicleService';
import ListVehiclesService from '../../src/services/ListVehiclesService';

import AppError from "../../src/utils/errors/AppError";
import sampleVehicle from '../samples/sampleVehicle';
import sampleVehicleB from '../samples/sampleVehicleB';

let fakeVehicleRepository: FakeVehicleRepository;

let createVehicle: CreateVehicleService;
let listVehicles: ListVehiclesService;

describe('List all vehicles in database', () => {
  beforeEach(() => {
    fakeVehicleRepository = new FakeVehicleRepository();
    createVehicle = new CreateVehicleService(fakeVehicleRepository);
    listVehicles = new ListVehiclesService(fakeVehicleRepository);
  });

  it('should be able to retrieve all vehicles in database', async() => {
    await createVehicle.execute(sampleVehicle);
    await createVehicle.execute(sampleVehicleB);

    const vehicleList = await listVehicles.execute();

    // expect(vehicleList).toBeInstanceOf(Vehicle[]);
    expect(vehicleList?.length).toBe(2);
    expect(vehicleList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(sampleVehicle)
      ])
    );
    expect(vehicleList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(sampleVehicleB)
      ])
    );
  });
})

