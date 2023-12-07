import { axios } from '@/lib/axios';
import { ApiResponse, UserType } from "@/global";

export const getUser = async (): Promise<ApiResponse<UserType>> => {
  return axios.get<void, ApiResponse<UserType>>('/user/me');
};