import { axios } from "@/lib/axios";

import { LoginUserType } from "../types";
import { ApiResponse, UserType } from "@/global";

export const loginWithEmailAndPassword = async (
  data: LoginUserType
): Promise<ApiResponse<UserType>> => {
  const response = await axios.post<LoginUserType, ApiResponse<UserType>>(
    "/user/login", null,
    {
      headers: { Authorization: `Basic ${btoa(`${data.username}:${data.password}`)}` }
    }
  );
  return response;
};
