import { ApiResponse, ProjectType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getProjectById = (projectId: number): Promise<ApiResponse<ProjectType>> => {
  return axios.get(`/project/${projectId}`);
};


type QueryFnType = typeof getProjectById;

type useGetProjectByIdOptions = {
  projectId: number
  config?: QueryConfig<QueryFnType>
};

export const useGetProjectById = ({ projectId, config }: useGetProjectByIdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["project/", projectId],
    queryFn: () => getProjectById(projectId),
    ...config
  });
};