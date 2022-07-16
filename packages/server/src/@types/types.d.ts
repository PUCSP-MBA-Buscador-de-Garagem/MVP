import { Response, Request, NextFunction } from "express";

export type TAddress = {
  city: string;
  FU: string;
  number: number;
  zipcode: string;
}

export type TProviderAvailability = {
  start: string;
  end: string;
}

export type TSize = {
  height: number;
  length: number;
  width: number;
}

export type TAppointmentStatus = 'pending' | 'cancelled' | 'approved';
