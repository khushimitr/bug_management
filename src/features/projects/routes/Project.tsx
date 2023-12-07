import { useParams } from "react-router-dom";
import { ContentLayout } from "@/components";
import { UpdateProject } from "@/features/projects/components/UpdateProject.tsx";

export const Project = () => {
  const { projectName: _projectName } = useParams();
  const projectName = _projectName?.replaceAll('-', ' ');
  return (
    <ContentLayout title={projectName || ""}>
      <div>
        <UpdateProject projectName={projectName || ""}/>
      </div>
    </ContentLayout>
  );
};
