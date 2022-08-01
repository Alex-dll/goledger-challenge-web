import { AxiosResponse } from 'axios';

import { http } from './axiosBase';

export interface Driver {
  '@assetType': string;
  '@key': string;
}

export interface CarResult {
  '@assetType': string;
  '@key': string;
  '@lastTouchBy': string;
  '@lastTx': string;
  driver: Driver;
  id: number;
  model: string;
}

export interface GetByAssetTypeProps {
  result: CarResult[];
}

export function getCars(): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          '@assetType': 'car',
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getCarById(type: AssetType, id: number): Promise<CarResult> {
  return http
    .post<CarResult>(`query/readAsset`, {
      key: {
        '@assetType': type,
        id,
      },
    })
    .then(({ data }: AxiosResponse<CarResult>) => data);
}

export function deleteCarById(id: number): Promise<void> {
  const requestBody = {
    key: {
      '@assetType': 'car',
      id,
    },
  };

  return http
    .delete<void>('invoke/deleteAsset/', { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data);
}
