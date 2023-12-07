import { ApiResponse, TeamType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type NewTeamAddDto = {
  name: string,
  manager: { id: number },
  members: { id: number }[]
}

const addNewTeam = (data: NewTeamAddDto): Promise<ApiResponse<TeamType>> => {
  return axios.post<NewTeamAddDto, ApiResponse<TeamType>>("/team/new", data,);
};

type UseAddNewType = {
  config?: MutationConfig<typeof addNewTeam>;
}

export const useAddNewTeam = ({ config }: UseAddNewType): UseMutationResult<ApiResponse<TeamType>, unknown, NewTeamAddDto, unknown> => {
  return useMutation((data: NewTeamAddDto): Promise<ApiResponse<TeamType>> => addNewTeam(data), {
    ...config
  });
};

