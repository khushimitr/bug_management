import { ApiResponse, BugType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type PatchBugDto = {
  id?: number
  summary: string
  description: string
  bugStatus: string
  bugSeverity: string
  bugPriority: string
  targetResolutionDate: string | null
  identifier: {
    id: number
  }
  assignee: {
    id: number | null
  }
  project: {
    id: number
  }
}


const patchBug = (data: PatchBugDto): Promise<ApiResponse<BugType>> => {
  console.log(data);
  return axios.patch<PatchBugDto, ApiResponse<BugType>>(`/bug/update/${data.id}`, data);
};

type UsePatchBugType = {
  config?: MutationConfig<typeof patchBug>;
}

export const usePatchBug = ({ config }: UsePatchBugType): UseMutationResult<ApiResponse<BugType>, unknown, PatchBugDto, unknown> => {
  return useMutation((data: PatchBugDto): Promise<ApiResponse<BugType>> => patchBug(data), {
    ...config
  });
};

