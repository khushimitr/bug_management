import { ApiResponse, TeamType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getAllTeamsManaged = (): Promise<ApiResponse<TeamType[]>> => {
  return axios.get(`/team/managed`);
};


type QueryFnType = typeof getAllTeamsManaged;

type GetAllTeamsManagedOptions = {
  config?: QueryConfig<QueryFnType>
};


export const useGetAllTeamsManaged = ({ config }: GetAllTeamsManagedOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["teams/managed"],
    queryFn: getAllTeamsManaged,
    ...config
  });
};
