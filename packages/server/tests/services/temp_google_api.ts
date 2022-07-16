import GoogleDistanceMatrixAPI from '../../src/providers/DistanceAPI/GoogleDistanceMatrixAPI';

describe('GoogleAPITest', () => {
  it('should be able to retrieve google data', async() => {
    const api = new GoogleDistanceMatrixAPI();

    try {
      const data = await api.getDistance('Osasco, São Paulo, Brasil', 'Barueri, São Paulo, Brasil');

    } catch (error) {
      console.log(error);

    }
  });
})
