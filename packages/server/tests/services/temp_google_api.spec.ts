import GoogleDistanceMatrixAPI from '../../src/providers/DistanceAPI/GoogleDistanceMatrixAPI';

describe('GoogleAPITest', () => {
  it('should be able to retrieve google data', async() => {
    const api = new GoogleDistanceMatrixAPI();

    try {
      const data = await api.getDistance('Boston', 'Nevada');
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  });
})
