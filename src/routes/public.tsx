import { lazyImport } from "@/utils/lazyImport";
import { NotFound } from "@/features";

const { AuthRoutes } = lazyImport(
  () => import("@/features/auth"),
  "AuthRoutes"
);

export function publicRoutes() {
  return [
    {
      path: "/auth/*",
      element: <AuthRoutes/>,
    },
    {
      path: "/*",
      element: <NotFound/>,
    },
  ];
}