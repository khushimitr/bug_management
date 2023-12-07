// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { configureAuth } from "react-query-auth";
import {
  getUser,
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
} from "@/features";

export const {
  useUser,
  useLogin,
  useRegister,
  useLogout,
} =
  configureAuth({
    userFn: getUser,
    loginFn: loginWithEmailAndPassword,
    logoutFn: logout,
    registerFn: registerWithEmailAndPassword,
  });
