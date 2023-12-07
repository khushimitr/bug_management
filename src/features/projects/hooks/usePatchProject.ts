import { ApiResponse, ProjectType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type PatchProjectDto = {
  id: number,
  projectKey: string,
  name: string,
  startDate: string,
  targetDate: string,
  manager: { id: number },
  teams: {
    id: number
  }[],
}


const patchProject = (data: PatchProjectDto): Promise<ApiResponse<ProjectType>> => {
  console.log(data);
  return axios.patch<PatchProjectDto, ApiResponse<ProjectType>>(`/project/update/${data.id}`, data);
};

type UsePatchProjectType = {
  config?: MutationConfig<typeof patchProject>;
}

export const usePatchProject = ({ config }: UsePatchProjectType): UseMutationResult<ApiResponse<ProjectType>, unknown, PatchProjectDto, unknown> => {
  return useMutation((data: PatchProjectDto): Promise<ApiResponse<ProjectType>> => patchProject(data), {
    ...config
  });
};

