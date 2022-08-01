import { AxiosResponse } from 'axios';

import { http } from './axiosBase';

type GetByAssetTypeProps = {
  result: object[];
};

export function getByAssetType(
  type: 'car' | 'driver' | 'team' | 'event',
): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          '@assetType': { type },
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}
