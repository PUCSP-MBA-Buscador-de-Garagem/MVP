import { isAfter, isBefore, isValid } from 'date-fns';

import { TProviderAvailability, TSize } from "../../@types/types";

export const sizeCheck = (garageSize: TSize, vehicleSize: TSize): Boolean => {
  const margin = 1000

  if (garageSize.length <= (vehicleSize.length + margin)) return false;
  if (garageSize.width <= (vehicleSize.width + margin)) return false;
  if (garageSize.height <= (vehicleSize.height + margin)) return false;

  return true;
};

export const isAvailable = (
  providerAvaibility: TProviderAvailability,
  rentAppointment: TProviderAvailability
  ): Boolean => {
    if (!isAfter(new Date(rentAppointment.start), new Date(providerAvaibility.start))) {
      return false;
    }

    if (!isBefore(new Date(rentAppointment.end), new Date(providerAvaibility.end))) {
      return false;
    }

    return true;
  };

