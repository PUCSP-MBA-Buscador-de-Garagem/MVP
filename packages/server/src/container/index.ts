import { container } from 'tsyringe';

import '../providers';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import UserRepository from '../repositories/implementations/localJSON/UserRepository';
import IProviderRepository from '../repositories/interfaces/IProviderRepository';
import ProviderRepository from '../repositories/implementations/localJSON/ProviderRepository';
import IAppointmentRepository from '../repositories/interfaces/IAppointmentRepository';
import AppointmentRepository from '../repositories/implementations/localJSON/AppointmentRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProviderRepository>('ProviderRepository', ProviderRepository);
container.registerSingleton<IAppointmentRepository>('AppointmentRepository', AppointmentRepository);

