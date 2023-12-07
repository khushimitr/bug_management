import { ApiResponse, CommentType } from "@/global";
import { axios, MutationConfig } from "@/lib";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type NewCommentDto = {
  id?: number
  content: string
  commenter: {
    id: number
  }
  referredProject: {
    id: number
  }
  referredBug: {
    id: number
  }
}

const addNewComment = (data: NewCommentDto): Promise<ApiResponse<CommentType>> => {
  return axios.post<NewCommentDto, ApiResponse<CommentType>>("/comment/new", data,);
};

type UseAddNewType = {
  config?: MutationConfig<typeof addNewComment>;
}

export const useAddNewComment = ({ config }: UseAddNewType): UseMutationResult<ApiResponse<CommentType>, unknown, NewCommentDto, unknown> => {
  return useMutation((data: NewCommentDto): Promise<ApiResponse<CommentType>> => addNewComment(data), {
    ...config
  });
};
