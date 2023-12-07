import { useParams } from "react-router-dom";
import { ContentLayout } from "@/components";
import { useAppSelector } from "@/hooks";
import { TeamTableComponent } from "@/features/teams/components/TeamTableComponent.tsx";

export const Team = () => {
  const { teamName: _teamName } = useParams();
  const teamName = _teamName?.replaceAll('-', ' ');
  const teamId = useAppSelector(state => {
    return state.user.entities?.teamsManaged?.find(team => team.name === teamName)?.id || -1;
  });
  return (
    <ContentLayout title={"Team Members"}>
      <TeamTableComponent teamId={teamId}/>
    </ContentLayout>
  );
};

