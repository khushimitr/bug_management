import { ApiResponse, BugType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type NewBugDto = {
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

const addNewBug = (data: NewBugDto): Promise<ApiResponse<BugType>> => {
  return axios.post<NewBugDto, ApiResponse<BugType>>("/bug/new", data,);
};

type UseAddNewType = {
  config?: MutationConfig<typeof addNewBug>;
}

export const useAddNewBug = ({ config }: UseAddNewType): UseMutationResult<ApiResponse<BugType>, unknown, NewBugDto, unknown> => {
  return useMutation((data: NewBugDto): Promise<ApiResponse<BugType>> => addNewBug(data), {
    ...config
  });
};

