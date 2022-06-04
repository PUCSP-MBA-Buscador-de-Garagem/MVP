import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/BCryptHashProvider';

import IHashProvider from './interfaces/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
