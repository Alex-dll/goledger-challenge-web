import { AxiosResponse } from 'axios'

import { http } from './axiosBase'

type Team = {
  '@assetType': string
  '@key': string
}

type Result = {
  '@assetType': string
  '@key': string
  '@lastTouchBy': string
  '@lastTx': string
  id: number
  name: string
  team: Team
}

type GetByAssetTypeProps = {
  result: Result[]
}

export type CreateDriver = {
  asset: [
    {
      '@assetType': string
      id: number
      name: string
      team: {
        '@assetType': string
        '@key': string
      }
    },
  ]
}

export type UpdateDriver = {
  update: {
    '@assetType': string
    id: number
    name: string
    team: {
      '@assetType': string
      '@key': string
    }
  }
}

type CreateDriverProps = {
  payload: CreateDriver
}

type UpdateDriverProps = {
  payload: UpdateDriver
}

export function createDriver({
  payload,
}: CreateDriverProps): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`invoke/createAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
}

export function updateDriverAsset({
  payload,
}: UpdateDriverProps): Promise<GetByAssetTypeProps> {
  return http
    .put<GetByAssetTypeProps>(`invoke/updateAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
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
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
}

export function getDriverById(id: number): Promise<Result> {
  return http
    .post<Result>(`query/readAsset`, {
      key: {
        '@assetType': 'driver',
        id,
      },
    })
    .then(({ data }: AxiosResponse<Result>) => data)
}

export function DeleteDriverById(id: number): Promise<void> {
  const requestBody = {
    key: {
      '@assetType': 'driver',
      id,
    },
  }

  return http
    .delete<void>('invoke/deleteAsset/', { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data)
}
