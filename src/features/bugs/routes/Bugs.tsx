import { NavLink, useParams } from "react-router-dom";
import { ContentLayout } from "@/components";
import { BugTableComponent } from "@/features/bugs/components/BugTableComponent.tsx";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";


export const Bugs = () => {
  const { projectName: _projectName } = useParams();
  const projectName = _projectName!.replaceAll('-', ' ');
  return (
    <ContentLayout title={projectName || ""}>
      <div className="text-sm ds-breadcrumbs">
        <ul>
          <li><NavLink to={"/app"}><span>App</span></NavLink></li>
          <li>
            <span>Bugs</span>
          </li>
          <li>{projectName}</li>
        </ul>
      </div>

      <div className={"pt-4 min-h-full"}>
        <Suspense fallback={<div className={"flex h-full w-full justify-center item-center"}>
          <Spinner size={"lg"}/>
        </div>}>
          <BugTableComponent projectName={projectName}/>
        </Suspense>
      </div>
    </ContentLayout>
  );
};
