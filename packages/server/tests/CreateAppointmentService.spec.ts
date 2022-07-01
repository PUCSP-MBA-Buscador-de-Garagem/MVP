import 'reflect-metadata';

import FakeUserRepository from "../src/repositories/fakes/FakeUserRepository";
import FakeProviderRepository from '../src/repositories/fakes/FakeProviderRepository';
import FakeAppointmentRepository from '../src/repositories/fakes/FakeAppointmentRepository';

import CreateUserService from '../src/services/CreateUserService';
import CreateProviderService from "../src/services/CreateProviderService";
import CreateAppointmentService from '../src/services/CreateAppointmentService';

import HashProvider from '../src/providers/HashProvider/BCryptHashProvider';
import AppError from "../src/utils/errors/AppError";

let fakeUserRepository: FakeUserRepository;
let fakeProviderRepository: FakeProviderRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;

let createUser: CreateUserService;
let createProvider: CreateProviderService;
let createAppointment: CreateAppointmentService;

let hashProvider: HashProvider;

const sampleUser = {
  name: 'testName',
  email: 'user@test.com',
  password: '123456',
}

const sampleUserProvider = {
  name: 'Roger',
  email: 'roger@onepiece.com',
  password: '789456',
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

const sampleAppointment = {
  start: '11:00',
  end: '16:00'
}

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeProviderRepository = new FakeProviderRepository();
    fakeAppointmentRepository = new FakeAppointmentRepository();

    hashProvider = new HashProvider();

    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    createProvider = new CreateProviderService(fakeUserRepository, fakeProviderRepository);
    createAppointment = new CreateAppointmentService(fakeUserRepository, fakeProviderRepository, fakeAppointmentRepository);
  });

  it('should be able to create a new appointment on database', async() => {
    const user = await createUser.execute(sampleUser);

    const userProvider = await createUser.execute(sampleUserProvider);
    const provider = await createProvider.execute({
      user_id: userProvider.id,
      ...sampleProvider
    });

    const appointment = await createAppointment.execute({
      user_id: user.id,
      provider_id: provider.id,
      start: sampleAppointment.start,
      end: sampleAppointment.end
    })

    const appointmentSaved = await fakeAppointmentRepository.findById(appointment.id);

    expect(appointment.status).toBe('pending');
    expect(appointmentSaved!.start).toBe(sampleAppointment.start);
    expect(appointmentSaved!.end).toBe(sampleAppointment.end);
  });

  it('should NOT be able to create a new appointment with incorrect user ID', async() => {
    const userProvider = await createUser.execute(sampleUserProvider);
    const provider = await createProvider.execute({
      user_id: userProvider.id,
      ...sampleProvider
    });

    await expect(
      createAppointment.execute({
        user_id: 'wrong_user_id',
        provider_id: provider.id,
        start: sampleAppointment.start,
        end: sampleAppointment.end
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new appointment with incorrect provider ID', async() => {
    const user = await createUser.execute(sampleUser);

    await expect(
      createAppointment.execute({
        user_id: user.id,
        provider_id: 'wrong_provider_id',
        start: sampleAppointment.start,
        end: sampleAppointment.end
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})

