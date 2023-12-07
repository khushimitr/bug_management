import { ApiResponse, ProjectType } from "@/global";
import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const getAllBugs = (): Promise<ApiResponse<ProjectType[]>> => {
  return axios.get("/project-data/");
};


type QueryFnType = typeof getAllBugs;

type GetAllBugsOptions = {
  config?: QueryConfig<QueryFnType>
};

export const useGetAllBugs = ({ config }: GetAllBugsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["allBugs"],
    queryFn: getAllBugs,
    ...config
  });
};