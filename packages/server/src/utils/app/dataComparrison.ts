import { isAfter, isBefore, isValid } from 'date-fns';

import { TProviderAvailability, TSize } from "../../@types/types";

export const sizeCheck = (garageSize: TSize, vehicleSize: TSize): Boolean => {
  const sideMargin = 1000
  const topMargin = 500

  if (garageSize.length <= (vehicleSize.length + sideMargin)) return false;
  if (garageSize.width <= (vehicleSize.width + sideMargin)) return false;
  if (garageSize.height <= (vehicleSize.height + topMargin)) return false;

  return true;
};



