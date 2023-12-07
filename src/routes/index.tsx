import { useRoutes } from "react-router-dom";
import { Landing } from "@/features";
import { ProtectedManagerRoutes, protectedRoutes } from "@/routes/protected.tsx";
import { publicRoutes } from "@/routes/public.tsx";
import { useUser } from "@/lib";
import { UserRole } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { addUser } from "@/store";

export const AppRoutes = () => {
  const user = useUser();
  const appDispatch = useAppDispatch();
  if (user.isSuccess && user.data && user.data.data) {
    appDispatch(addUser(user.data.data));
  }
  const commonRoutes = [{ path: "/", element: <Landing/> }, ...publicRoutes()];
  const routes = user.data ? protectedRoutes() : [];
  const managerRoutes = user.data?.data?.role?.id === UserRole.ROLE_MANAGER ? ProtectedManagerRoutes() : [];
  const element = useRoutes([...routes, ...commonRoutes, ...managerRoutes]);
  return <>{element}</>;
};
