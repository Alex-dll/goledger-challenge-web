import { AxiosResponse } from "axios";

import { http } from "./axiosBase";

interface Result {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  id: number;
  name: string;
}

interface GetByAssetTypeProps {
  result: Result[];
}

export interface CreateTeams {
  asset: [
    {
      "@assetType": string;
      id: number;
      name: string;
      team: {
        "@assetType": string;
        "@key": string;
      };
    }
  ];
}

export interface UpdateTeam {
  update: {
    "@assetType": string;
    id: number;
    name: string;
    team: {
      "@assetType": string;
      "@key": string;
    };
  };
}

type CreateCreateProps = {
  payload: CreateTeams;
};

type UpdateTeamProps = {
  payload: UpdateTeam;
};

export function createTeam({
  payload,
}: CreateCreateProps): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`invoke/createAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function updateTeamAsset({
  payload,
}: UpdateTeamProps): Promise<GetByAssetTypeProps> {
  return http
    .put<GetByAssetTypeProps>(`invoke/updateAsset`, payload)
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getTeams(): Promise<GetByAssetTypeProps> {
  return http
    .post<GetByAssetTypeProps>(`query/search`, {
      query: {
        selector: {
          "@assetType": "team",
        },
      },
    })
    .then(({ data }: AxiosResponse<GetByAssetTypeProps>) => data);
}

export function getTeamById(id: number): Promise<Result> {
  return http
    .post<Result>(`query/readAsset`, {
      key: {
        "@assetType": "team",
        id,
      },
    })
    .then(({ data }: AxiosResponse<Result>) => data);
}

export function DeleteTeamById(id: number): Promise<void> {
  const requestBody = {
    key: {
      "@assetType": "team",
      id,
    },
  };

  return http
    .delete<void>("invoke/deleteAsset/", { data: requestBody })
    .then(({ data }: AxiosResponse<void>) => data);
}
