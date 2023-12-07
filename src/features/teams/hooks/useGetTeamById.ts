import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { ApiResponse, TeamType } from "@/global";
import { useQuery } from "@tanstack/react-query";

const getTeamById = (id: number): Promise<ApiResponse<TeamType>> => {
  return axios.get<number, ApiResponse<TeamType>>(`/team/${id}`);
};

type QueryFnType = typeof getTeamById;

type GetTeamByIdType = {
  id: number,
  config?: QueryConfig<QueryFnType>
};

export const useGetTeamById = ({ id, config }: GetTeamByIdType) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["team/", id],
    queryFn: () => getTeamById(id),
    ...config
  });
};
