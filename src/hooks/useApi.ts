import { useQuery } from '@tanstack/react-query';

import { getCarById, getCars } from '../services/http';
import {
  getDriverById,
  getDrivers,
} from '../services/http/http-resource-pilots';

export function useGetCars() {
  return useQuery([`cars`], () => getCars(), {
    staleTime: 1000 * 60,
  });
}

export function useGetCar(id: number) {
  return useQuery([`car${id}`], () => getCarById(id), {
    staleTime: 1000 * 60,
  });
}

export function useGetDrivers() {
  return useQuery([`drivers`], () => getDrivers(), {
    staleTime: 1000 * 60,
  });
}

export function useGetDriverById(id: number) {
  return useQuery([`driver${id}`], () => getDriverById(id), {
    staleTime: 1000 * 60,
  });
}
