import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { MainLayout } from "@/components";
import { NotFound } from "@/features";
import { lazyImport } from "@/utils/lazyImport";
import { Spinner } from "@nextui-org/react";

const { Dashboard } = lazyImport(() => import("@/features/"), "Dashboard");
const { BugsRoutes } = lazyImport(() => import("@/features/"), "BugsRoutes");
const { ProjectRoutes } = lazyImport(() => import("@/features/"), "ProjectRoutes");
const { TeamRoutes } = lazyImport(() => import("@/features/"), "TeamRoutes");
const { SettingRoutes } = lazyImport(() => import("@/features/"), "SettingRoutes");

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="lg"/>
          </div>
        }
      >
        <Outlet/>
      </Suspense>
    </MainLayout>
  );
};

export function protectedRoutes() {
  return [
    {
      path: "/app",
      element: <App/>,
      children: [
        { path: "/app/", element: <Dashboard/> },
        { path: "/app/bugs/*", element: <BugsRoutes/> },
        { path: "/app/projects/*", element: <ProjectRoutes/> },
        { path: "/app/teams/*", element: <TeamRoutes/> },
        { path: "/app/discussions/", element: <Dashboard/> },
        { path: "/app/users", element: <Dashboard/> },
        { path: "/app/profile", element: <Dashboard/> },
        { path: "/app/settings", element: <SettingRoutes/> },
        { path: "/app/*", element: <NotFound/> },
      ],
    },
  ];
}

export function ProtectedManagerRoutes() {
  return [
    {
      path: "/app",
      element: <App/>,
      children: [
        { path: "/app/manage/teams", element: <Dashboard/> },
        { path: "/app/manage/projects", element: <Dashboard/> },
      ],
    },
  ];
}
