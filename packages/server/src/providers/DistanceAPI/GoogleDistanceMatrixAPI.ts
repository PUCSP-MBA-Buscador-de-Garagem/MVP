import axios, { AxiosInstance } from 'axios';

import IDistanceAPI from '../interfaces/IDistanceAPI';
import { google } from '../../config/apiCredentials';

interface IRequestConfig {
  method: string;
  url: string;
}

class GoogleDistanceMatrixAPI implements IDistanceAPI {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: encodeURI('https://maps.googleapis.com/maps/api/distancematrix/'),
    })
  }

  async getDistance(from: string, to: string): Promise<void> {
    const requestConfig = {
      method: 'get',
      url: ``
    }

    const data = await this.axios.get(encodeURI(`json?origins=${from}&destinations=${to}&units=metric&key=${google.distanceMatrix.apiKey}`))

    console.log(data.data.rows[0]);
  }

}

export default GoogleDistanceMatrixAPI;
