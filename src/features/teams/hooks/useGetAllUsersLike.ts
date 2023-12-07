import { axios, ExtractFnReturnType, QueryConfig } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, UserType } from "@/global";

export const getAllUsersLike = (name: string): Promise<ApiResponse<UserType[]>> => {
  return axios.get(`/user/like?token=${name}`);
};

type QueryFnType = typeof getAllUsersLike;

type GetAllUsersLikeOptions = {
  name: string
  config?: QueryConfig<QueryFnType>
};

export const useGetAllUsersLike = ({ name, config }: GetAllUsersLikeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["getAllUsersLike", name],
    queryFn: () => getAllUsersLike(name),
    ...config
  });
};
