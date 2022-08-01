import { AxiosResponse } from 'axios';

import { http } from './axiosBase';

export interface Team {
  '@assetType': string;
  '@key': string;
}

export interface Result {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  id: string;
  name: string;
  team: Team;
}

export interface GetByAssetTypeProps {
  result: Result[];
}

export function getDrivers(): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          '@assetType': 'driver',
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getDriverById(id: number): Promise<Result> {
  return http
    .post<Result>(`query/readAsset`, {
      key: {
        '@assetType': 'driver',
        id,
      },
    })
    .then(({ data }: AxiosResponse<Result>) => data);
}

export function deleteDriverById(id: number): Promise<void> {
  const requestBody = {
    key: {
      '@assetType': 'driver',
      id,
    },
  };

  return http
    .delete<void>('invoke/deleteAsset/', { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data);
}
