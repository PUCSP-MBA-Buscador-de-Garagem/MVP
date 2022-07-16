import { TAddress } from "../../@types/types";

interface IDistanceAPI {
  getDistance(from: TAddress, to: TAddress): Promise<any>;
}

export default IDistanceAPI;
