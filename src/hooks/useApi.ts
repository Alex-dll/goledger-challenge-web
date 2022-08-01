import { useQuery } from '@tanstack/react-query';

import { getByAssetType, getCarById } from '../services/http';

export function useGetCars() {
  return useQuery([`cars`], () => getByAssetType('car'), {
    staleTime: 1000 * 60,
  });
}

export function useGetCar(id: number | string) {
  return useQuery([`car${id}`], () => getCarById('car', id), {
    staleTime: 1000 * 60,
  });
}
