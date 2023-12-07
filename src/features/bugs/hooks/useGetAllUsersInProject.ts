import { ApiResponse, UserType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getAllUsersInProject = (id: number): Promise<ApiResponse<UserType[]>> => {
  return axios.get(`/user/in-project/${id}`);
};


type QueryFnType = typeof getAllUsersInProject;

type GetAllUsersInProject = {
  id: number
  config?: QueryConfig<QueryFnType>
};

export const useGetAllUsersInProject = ({ id, config }: GetAllUsersInProject) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["/user/in-project", id],
    queryFn: () => getAllUsersInProject(id),
    ...config
  });
};