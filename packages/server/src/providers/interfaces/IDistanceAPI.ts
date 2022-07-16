interface IDistanceAPI {
  getDistance(from: string, to: string): Promise<void>;
}

export default IDistanceAPI;
