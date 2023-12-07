import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  AddNewProjectReducer,
  AddNewProjectReducerActions,
  useGetProjectById, usePatchProject
} from "@/features";
import { DateTime } from "luxon";
import { useReducer, useRef, useState } from "react";
import { useAppSelector } from "@/hooks";
import { queryClient } from "@/lib";
import { giveProjectIdByName } from "@/utils";
import { ApiResponse, ProjectType } from "@/global";

type UpdateProjectProps = {
  projectName: string
}

export const UpdateProject = ({ projectName }: UpdateProjectProps) => {
  const projects = queryClient.getQueryData<ApiResponse<ProjectType[]>>(["allBugs"]);
  let projectId = -1;
  if (projects && projects.data)
    projectId = giveProjectIdByName(projects.data, projectName);

  const project = useGetProjectById({ projectId: projectId, config: {} });
  const teams = useAppSelector(state => state.user.entities?.teamsManaged);
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isProjectAddingLoading, setIsProjectAddingLoading] = useState(false);
  const [newProjectState, newProjectStateDispatcher] = useReducer(AddNewProjectReducer, {
    id: project?.data?.data?.id,
    name: project?.data?.data?.name || "",
    projectKey: project?.data?.data?.projectKey || "",
    teams: project?.data?.data?.teams.reduce<{ id: number }[]>((acc, cv) => {
      acc.push({ id: cv.id });
      return acc;
    }, []) || [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startDate: project?.data?.data?.startDate || "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    targetDate: project?.data?.data?.targetEndDate || "",
    manager: {
      id: project?.data?.data?.manager?.id || -1
    },
  }, () => {
    return {
      id: project?.data?.data?.id,
      name: project?.data?.data?.name,
      projectKey: project?.data?.data?.projectKey,
      teams: project?.data?.data?.teams.reduce<{ id: number }[]>((acc, cv) => {
        acc.push({ id: cv.id });
        return acc;
      }, []),
      startDate: project?.data?.data?.startDate,
      targetDate: project?.data?.data?.targetEndDate,
      manager: {
        id: project?.data?.data?.manager?.id
      },
    };
  });


  const patchProject = usePatchProject({
    config: {
      onSuccess: () => {
        console.log("Project added successfully");
        setIsProjectAddingLoading(false);
        queryClient.refetchQueries(["allBugs"]);
        queryClient.refetchQueries(["authenticated-user"]);
        queryClient.refetchQueries(["project/", projectId]);
        modalRef.current?.click();
      },
      onError: (error) => {
        console.log(error);
        setIsProjectAddingLoading(false);
      }
    }
  });

  const handleSubmit = async () => {
    setIsProjectAddingLoading(true);
    console.log(newProjectState);
    patchProject.mutate(newProjectState);
  };


  return (
    <div className={"w-[70%] flex flex-col gap-4 mx-auto p-8 items-start"}>

      <Input
        autoFocus
        type={"text"}
        label="Project Name"
        fullWidth={true}
        isRequired={true}
        variant="bordered"
        value={newProjectState.name}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onValueChange={value => newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectReducerName(value))}
      />
      <Input
        label="Project Key"
        maxLength={3}
        isRequired={true}
        fullWidth={true}
        type="text"
        variant="bordered"
        value={newProjectState.projectKey}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onValueChange={value => newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectProjectKey(value))}
      />
      <div className={"w-full flex flex-row gap-2"}>
        <Input
          type={"date"}
          label={"Start Date"}
          placeholder={"mm/dd/yyyy"}
          isRequired={true}
          variant="bordered"
          className={"w-full"}
          value={DateTime.fromISO(newProjectState.startDate).toFormat("yyyy-MM-dd")}
          onValueChange={value => {
            console.log(value);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectStartDate(
              DateTime.fromFormat(value, "yyyy-MM-dd").toUTC().toISO() || ""));
          }}
        />
        <Input
          type={"date"}
          placeholder={"mm/dd/yyyy"}
          label={"Target End Date"}
          variant="bordered"
          value={DateTime.fromISO(newProjectState.targetDate).toFormat("yyyy-MM-dd")}
          onValueChange={value => {
            console.log(value);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectTargetDate(
              DateTime.fromFormat(value, "yyyy-MM-dd").toUTC().toISO() || ""));
          }}
          className={"w-full"}
        />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ /* @ts-ignore */}
      <Select
        label={"Assign Teams"}
        isRequired={true}
        placeholder={"Select Teams"}
        selectionMode={"multiple"}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selectedKeys={newProjectState.teams.reduce((acc: string[], cv) => {
          acc.push(cv.id.toString());
          return acc;
        }, [])}
        onSelectionChange={(x) => {
          const newTeams: { id: number }[] = [];
          for (const ele of x) {
            newTeams.push({ id: Number(ele) });
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newProjectStateDispatcher(AddNewProjectReducerActions.setProjectTeam(newTeams));
        }}
      >
        // @ts-ignore
        {teams?.map((team) => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
      </Select>
      <Button className={"mt-4"} color="primary" onPress={handleSubmit} isLoading={isProjectAddingLoading}>
        Update Project
      </Button>
    </div>
  );
};
