import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select, SelectItem,
} from "@nextui-org/react";


import { useAppSelector } from "@/hooks";
import {
  useAddNewProject,
  AddNewProjectReducer,
  AddNewProjectReducerActions,
  AddNewProjectReducerInitialState
} from "@/features";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { DateTime } from "luxon";
import { queryClient } from "@/lib";

export const NewProjectModal = () => {
  const managerId = useAppSelector(state => state.user.entities?.id);
  const teams = useAppSelector(state => state.user.entities?.teamsManaged);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isProjectAddingLoading, setIsProjectAddingLoading] = useState(false);
  const [newProjectState, newProjectStateDispatcher] = useReducer(AddNewProjectReducer, AddNewProjectReducerInitialState);

  useEffect(() => {
    if (managerId != null) {
      newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectManager(managerId));
    }
  }, []);


  const addNewProject = useAddNewProject({
    config: {
      onSuccess: () => {
        console.log("Project added successfully");
        setIsProjectAddingLoading(false);
        queryClient.invalidateQueries(["/project/new"]);
        queryClient.refetchQueries(["allBugs"]);
        queryClient.refetchQueries(["authenticated-user"]);
        handleModalClose();
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
    addNewProject.mutate(newProjectState);
  };

  const handleModalClose = () => {
    newProjectStateDispatcher(AddNewProjectReducerActions.initAddNewProjectReset(AddNewProjectReducerInitialState));
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className={
          "flex relative group group-hover:text-black items-center justify-start rounded-xl mx-2 px-2 py-2 text-base font-medium  text-gray-500"
        }
      >
        Add New
      </Button>
      <Modal
        ref={modalRef}
        size={"xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleModalClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Project</ModalHeader>
              <ModalBody>
                <div className={"flex flex-row gap-2"}>
                  <Input
                    autoFocus
                    type={"text"}
                    label="Project Name"
                    isRequired={true}
                    variant="bordered"
                    value={newProjectState.name}
                    onValueChange={value => newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectReducerName(value))}
                  />
                  <Input
                    label="Project Key"
                    maxLength={3}
                    isRequired={true}
                    type="text"
                    variant="bordered"
                    value={newProjectState.projectKey}
                    onValueChange={value => newProjectStateDispatcher(AddNewProjectReducerActions.setAddNewProjectProjectKey(value))}
                  />
                </div>

                <div className={"flex flex-row gap-2"}>
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
                  selectedKeys={newProjectState.teams.reduce((acc: string[], cv) => {
                    acc.push(cv.id.toString());
                    return acc;
                  }, [])}
                  onSelectionChange={(x) => {
                    const newTeams: { id: number }[] = [];
                    for (const ele of x) {
                      newTeams.push({ id: Number(ele) });
                    }
                    newProjectStateDispatcher(AddNewProjectReducerActions.setProjectTeam(newTeams));
                  }}
                >
                  // @ts-ignore
                  {teams?.map((team) => <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>)}
                </Select>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleModalClose}>
                  Clear
                </Button>
                <Button color="primary" onPress={handleSubmit} isLoading={isProjectAddingLoading}>
                  Add Project
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
