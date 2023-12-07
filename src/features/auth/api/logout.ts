import { axios } from "@/lib/axios";

export const logout = async (): Promise<void> => {
  return await axios.get<void, void>("/user/logout");
};
