import { ApiResponse, TeamType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type UpdateTeamMembersDTO = {
  id: number,
  name: string,
  manager: { id: number },
  members: { id: number }[]
}
const updateTeamMembers = (data: UpdateTeamMembersDTO): Promise<ApiResponse<TeamType>> => {
  return axios.patch<UpdateTeamMembersDTO, ApiResponse<TeamType>>(`/team/update/${data.id}`, data);
};

type UseUpdateTeamMembersType = {
  config?: MutationConfig<typeof updateTeamMembers>;
}

export const usePatchTeam = ({ config }: UseUpdateTeamMembersType): UseMutationResult<ApiResponse<TeamType>, unknown, UpdateTeamMembersDTO, unknown> => {
  return useMutation((data: UpdateTeamMembersDTO): Promise<ApiResponse<TeamType>> => updateTeamMembers(data), {
    ...config
  });
};

