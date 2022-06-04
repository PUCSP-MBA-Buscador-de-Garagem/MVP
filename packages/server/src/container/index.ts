import { container } from 'tsyringe';

import '../providers';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

