import { ApiResponse, TeamType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getAllProjectsManaged = (): Promise<ApiResponse<TeamType[]>> => {
  return axios.get(`/project/managed`);
};


type QueryFnType = typeof getAllProjectsManaged;

type GetAllProjectsManagedOptions = {
  config?: QueryConfig<QueryFnType>
};


export const useGetAllProjectsManaged = ({ config }: GetAllProjectsManagedOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["projects/managed"],
    queryFn: getAllProjectsManaged,
    ...config
  });
};
