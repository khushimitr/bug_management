import { ApiResponse, ProjectType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type NewProjectDto = {
  projectKey: string,
  name: string,
  startDate: string,
  targetDate: string,
  manager: { id: number },
  teams: {
    id: number
  }[],
}


const addNewProject = (data: NewProjectDto): Promise<ApiResponse<ProjectType>> => {
  return axios.post<NewProjectDto, ApiResponse<ProjectType>>("/project/new", data);
};

type UseAddNewProjectType = {
  config?: MutationConfig<typeof addNewProject>;
}

export const useAddNewProject = ({ config }: UseAddNewProjectType): UseMutationResult<ApiResponse<ProjectType>, unknown, NewProjectDto, unknown> => {
  return useMutation((data: NewProjectDto): Promise<ApiResponse<ProjectType>> => addNewProject(data), {
    ...config
  });
};

