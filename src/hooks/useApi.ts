import { useQuery } from '@tanstack/react-query';

import { getCarById, getCars } from '../services/http';

export function useGetCars() {
  return useQuery([`cars`], () => getCars(), {
    staleTime: 1000 * 60,
  });
}

export function useGetCar(id: number) {
  return useQuery([`car${id}`], () => getCarById('car', id), {
    staleTime: 1000 * 60,
  });
}
