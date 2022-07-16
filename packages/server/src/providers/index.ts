import { container } from 'tsyringe';

import GoogleDistanceMatrixAPI from './DistanceAPI/GoogleDistanceMatrixAPI';
import BCryptHashProvider from './HashProvider/BCryptHashProvider';

import IDistanceAPI from './interfaces/IDistanceAPI';
import IHashProvider from './interfaces/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IDistanceAPI>('DisyanceAPIProvider', GoogleDistanceMatrixAPI);
