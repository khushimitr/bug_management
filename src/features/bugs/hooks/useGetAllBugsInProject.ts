import { ApiResponse, ProjectType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getAllBugsInProject = (projectId: number): Promise<ApiResponse<ProjectType>> => {
  return axios.get(`/project-data/${projectId}`);
};


type QueryFnType = typeof getAllBugsInProject;

type GetAllBugsOptions = {
  projectId: number
  config?: QueryConfig<QueryFnType>
};

export const useGetAllBugsInProject = ({ projectId, config }: GetAllBugsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["allBugs/", projectId],
    queryFn: () => getAllBugsInProject(projectId),
    ...config
  });
};