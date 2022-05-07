import { isUuid } from 'uuidv4';
import fakeProvidersRepository from '../src/repositories/fakes/fakeProvidersRepository';

let fakeProvider;

describe("CreateProviderService", () => {
  beforeEach(() => {
    fakeProvider = new fakeProvidersRepository();
  })

  it('should be able to retrieve a valid id from repository', async() => {
    const sampleData = {
      size: {
        width: 200,
        height: 250,
        length: 1245
      },
      availability: [
        { startAt: new Date(), endAt: new Date() },
        { startAt: new Date(), endAt: new Date() },
      ],
      location: {
        cep: '06044-784',
        city: 'Cascavel',
        state: 'Parana',
        number: 1754,
        region: 'Jardim das flores tortas',
      },
      images: [
        "data/imgs/00001.jpeg",
        "data/imgs/00002.jpeg",
      ]
    }

    const provider = await fakeProvider.register(sampleData);

    expect(isUuid(provider.id)).toBe(true);
  })
})
