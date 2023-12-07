import { axios } from "@/lib/axios";

import { RegisterUserType } from "../types";
import { ApiResponse, UserType } from "@/global";

export const registerWithEmailAndPassword = async (
  data: RegisterUserType
): Promise<ApiResponse<UserType>> => {
  const response = await axios.post<RegisterUserType, ApiResponse<UserType>>(
    "/user/register",
    data
  );
  if (response.success) {
    return response;
  } else {
    return Promise.reject(response);
  }
};
