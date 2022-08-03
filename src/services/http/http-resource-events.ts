import { AxiosResponse } from 'axios'

import { http } from './axiosBase'

type Winner = {
  '@assetType': string
  '@key': string
}

type Result = {
  '@assetType': string
  '@key': string
  '@lastTouchBy': string
  '@lastTx': string
  date: Date
  name: string
  prize: number
  winner: Winner
}

type GetByAssetTypeProps = {
  result: Result[]
}

export type CreateEvent = {
  asset: [
    {
      '@assetType': string
      name: string
      date: Date
      prize: number
      winner: Winner
    },
  ]
}

export type UpdateEvent = {
  update: {
    '@assetType': string
    '@key': string
    name: string
    date: Date
    prize: number
    winner: Winner
  }
}

type CreateEventProps = {
  payload: CreateEvent
}

type UpdateEventProps = {
  payload: UpdateEvent
}

export function createEventAsset({
  payload,
}: CreateEventProps): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`invoke/createAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
}

export function updateEventAsset({
  payload,
}: UpdateEventProps): Promise<GetByAssetTypeProps> {
  return http
    .put<GetByAssetTypeProps>(`invoke/updateAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
}

export function getEvents(): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          '@assetType': 'event',
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data)
}

export function getEventDetails(key: string): Promise<Result> {
  return http
    .post<Result>(`query/readAsset`, {
      key: {
        '@assetType': 'event',
        '@key': key,
      },
    })
    .then(({ data }: AxiosResponse<Result>) => data)
}

export function DeleteEventById(key: string): Promise<void> {
  const requestBody = {
    key: {
      '@assetType': 'event',
      '@key': key,
    },
  }

  return http
    .delete<void>('invoke/deleteAsset/', { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data)
}
