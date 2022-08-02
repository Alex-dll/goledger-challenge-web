import { AxiosResponse } from "axios";

import { http } from "./axiosBase";

interface Driver {
  "@assetType": string;
  "@key": string;
}

interface CarResult {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  driver: Driver;
  id: number;
  model: string;
}

interface GetByAssetTypeProps {
  result: CarResult[];
}

export interface CreateCar {
  asset: [
    {
      "@assetType": string;
      id: number;
      driver: {
        id: number;
        "@assetType": string;
        "@key": string;
      };
      model: string;
    }
  ];
}

export interface UpdateCar {
  update: {
    "@assetType": string;
    id: number;
    driver: {
      id: number;
      "@assetType": string;
      "@key": string;
    };
    model: string;
  };
}

export type CreateCarProps = {
  payload: CreateCar;
};

export type UpdateCarProps = {
  payload: UpdateCar;
};

export function createCar({
  payload,
}: CreateCarProps): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`invoke/createAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function updateCarAsset({
  payload,
}: UpdateCarProps): Promise<GetByAssetTypeProps> {
  return http
    .put<GetByAssetTypeProps>(`invoke/updateAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getCars(): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          "@assetType": "car",
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getCarById(id: number): Promise<CarResult> {
  return http
    .post<CarResult>(`query/readAsset`, {
      key: {
        "@assetType": "car",
        id,
      },
    })
    .then(({ data }: AxiosResponse<CarResult>) => data);
}

export function deleteCarById(id: number): Promise<void> {
  const requestBody = {
    key: {
      "@assetType": "car",
      id,
    },
  };

  return http
    .delete<void>("invoke/deleteAsset/", { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data);
}
