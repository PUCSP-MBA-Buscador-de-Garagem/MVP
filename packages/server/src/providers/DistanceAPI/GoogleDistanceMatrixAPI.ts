import axios, { AxiosInstance } from 'axios';

import IDistanceAPI from '../interfaces/IDistanceAPI';
import { google } from '../../config/apiCredentials';
import { TAddress } from '../../@types/types';

class GoogleDistanceMatrixAPI implements IDistanceAPI {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: encodeURI('https://maps.googleapis.com/maps/api/distancematrix/'),
    })
  }

  public async getDistance(from: TAddress, to: TAddress): Promise<any> {
    const fromString = `${from.zipcode}, ${from.city}, ${from.FU}, Brazil`
    const toString = `${to.zipcode}, ${to.city}, ${to.FU}, Brazil`

    const data = await this.axios.get(encodeURI(`json?origins=${fromString}&destinations=${toString}&units=metric&key=${google.distanceMatrix.apiKey}`))

    return(data.data.rows[0].elements[0].distance.value);
  }
}

export default GoogleDistanceMatrixAPI;
