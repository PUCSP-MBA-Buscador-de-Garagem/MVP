import 'reflect-metadata';

import FakeAppointmentRepository from '../../src/repositories/fakes/FakeAppointmentRepository';
import FakeProviderRepository from '../../src/repositories/fakes/FakeProviderRepository';
import FakeUserRepository from "../../src/repositories/fakes/FakeUserRepository";

import CreateAppointmentService from '../../src/services/CreateAppointmentService';
import CreateProviderService from "../../src/services/CreateProviderService";
import CreateUserService from '../../src/services/CreateUserService';

import HashProvider from '../../src/providers/HashProvider/BCryptHashProvider';
import AppError from "../../src/utils/errors/AppError";
import sampleAppointment from '../samples/sampleAppointment';
import sampleProvider from '../samples/sampleProvider';
import sampleUser from '../samples/sampleUser';
import sampleUserProvider from '../samples/sampleUserProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeProviderRepository: FakeProviderRepository;
let fakeUserRepository: FakeUserRepository;
let hashProvider: HashProvider;

let createAppointment: CreateAppointmentService;
let createProvider: CreateProviderService;
let createUser: CreateUserService;

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

