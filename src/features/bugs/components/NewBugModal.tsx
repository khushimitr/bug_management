import {
  Avatar,
  Button, Input,
  Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  Select, SelectItem, Selection,
  Textarea,
  useDisclosure
} from "@nextui-org/react";
import React, { ReactNode, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineUser } from "react-icons/hi2";
import { useAppSelector } from "@/hooks";
import {
  AddNewBugReducer,
  AddNewBugReducerActions,
  AddNewBugReducerInitialState, getAllUsersInProject, useAddNewBug,
  useGetAllBugs,
} from "@/features";
import { useDetectClickOutside } from "react-detect-click-outside";
import { EditorComponent } from "@/components";
import { BugPriority, BugSeverity, BugStatus } from "@/utils";
import { UserType } from "@/global";
import { DateTime } from "luxon";
import { useBoolean } from "usehooks-ts";
import { queryClient } from "@/lib";
import { EditorState } from "draft-js";


export const NewBugModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector(state => state.user.entities);
  const modalRef = useRef<HTMLButtonElement>(null);
  const shouldEditorReset = useBoolean(false);
  const [addNewBugState, addNewBugReducer] = useReducer(AddNewBugReducer, AddNewBugReducerInitialState);
  const [isBugAddingLoading, setIsBugAddingLoading] = useState(false);
  const [isEditorHovered, setIsEditorHovered] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [contentState, setContentState] = useState(EditorState.createEmpty());
  const editorRef = useDetectClickOutside({
    onTriggered: () => {
      setIsEditorActive(false);
    }
  });

  const [bugIds, setBugIds] = useState(-1);
  const allBugsByProjects = useGetAllBugs({});
  const [assigneeSelected, setAssigneeSelected] = useState<Selection>(new Set([]));
  const addNewBug = useAddNewBug({
    config: {
      onSuccess: () => {
        console.log("bug added successfully");
        queryClient.invalidateQueries(["/bug/new"]);
        queryClient.refetchQueries(["allBugs"]);
        queryClient.refetchQueries(["allBugs/", addNewBugState.project.id]);
        setIsBugAddingLoading(false);
        handleModalClose();
      },
      onError: (error) => {
        console.log(error);
        setIsBugAddingLoading(false);
      }
    }
  });

  useEffect(() => {
    if (user) {
      addNewBugReducer(AddNewBugReducerActions.setAddNewBugIdentifier(user.id));
    }
  }, []);

  const [allUsersInProject, setAllUsersInProject] = useState<UserType[]>([]);

  useEffect(() => {
    (async function () {
      const result = await getAllUsersInProject(bugIds);
      if (result.data) {
        setAllUsersInProject(result.data);
      }
    })();
    setAssigneeSelected(new Set([]));
    addNewBugReducer(AddNewBugReducerActions.setAddNewBugAssignee(null));
    addNewBugReducer(AddNewBugReducerActions.setAddNewBugStatus(BugStatus[BugStatus.NEW]));
  }, [bugIds]);


  const bugPriorityList = useMemo(() => {
    return Object.keys(BugPriority).reduce<{ key: string, value: string, icon: ReactNode }[]>((acc, cv) => {
      if (cv.length > 2) {
        acc.push({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          key: cv.toLowerCase(), value: cv.toLowerCase(), icon: BugPriority[cv] > 1 ?
            <HiOutlineArrowDown strokeWidth={3.5} color={"#17c964"}/> :
            <HiOutlineArrowUp strokeWidth={3.5} color={"#f31260"}/>
        });
      }
      return acc;
    }, []);
  }, []);

  const bugSeverityList = useMemo(() => {
    return Object.keys(BugSeverity).reduce<{ key: string, value: string, icon: ReactNode }[]>((acc, cv: string) => {
      if (cv.length > 2) {
        acc.push({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          key: cv.toLowerCase(), value: cv.toLowerCase(), icon: BugSeverity[cv] > 2 ?
            <HiOutlineArrowDown strokeWidth={3.5} color={"#17c964"}/> :
            <HiOutlineArrowUp strokeWidth={3.5} color={"#f31260"}/>
        });
      }
      return acc;
    }, []);
  }, []);

  const handleSubmit = () => {
    console.log(addNewBugState);
    setIsBugAddingLoading(true);
    addNewBug.mutate(addNewBugState);
  };
  const handleModalClose = () => {
    shouldEditorReset.setTrue();
    addNewBugReducer(AddNewBugReducerActions.setAddNewBugReset(AddNewBugReducerInitialState));
  };

  const syncEditorState = (value: string) => {
    addNewBugReducer(AddNewBugReducerActions.setAddNewBugDescription(value));
  };

  return (
    <>
      <Button
        color={"danger"}
        size={"md"}
        onPress={onOpen}
      >
        + Submit Bug</Button>
      <Modal
        scrollBehavior={"inside"}
        ref={modalRef}
        size={"3xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleModalClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Project</ModalHeader>
              <ModalBody className={"flex flex-col gap-4"}>
                <Textarea
                  autoFocus
                  type={"text"}
                  label="Short Summary"
                  labelPlacement={"outside"}
                  placeholder={"Concisely summarize the issue in one or two sentences."}
                  isRequired={true}
                  variant="bordered"
                  value={addNewBugState.summary}
                  onValueChange={(value) => {
                    addNewBugReducer(AddNewBugReducerActions.setAddNewBugSummary(value));
                  }}
                />

                <div
                  ref={editorRef}
                  data-hover={!isEditorActive && isEditorHovered}
                  data-focus={isEditorActive}
                  onMouseEnter={() => setIsEditorHovered(true)}
                  onMouseLeave={() => setIsEditorHovered(false)}
                  className={"group flex flex-col data-[has-helper=true]:pb-4 w-full mb-2"}>
                  <label
                    className={"block text-small font-medium text-foreground pb-1.5 after:content-['*'] after:text-danger after:ml-0.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none"}>Description</label>
                  <div
                    className={`relative w-full tap-highlight-transparent flex-row items-center shadow-sm p-1 gap-3 border-medium border-default-200 group-data-[hover=true]:border-default-400 group-data-[focus=true]:border-foreground h-unit-10 min-h-unit-10 rounded-medium !h-auto transition-background !duration-150 transition-colors motion-reduce:transition-none`}>
                    <EditorComponent
                      contentState={contentState}
                      isDisabled={false}
                      setResetFalse={shouldEditorReset.setFalse}
                      shouldReset={shouldEditorReset.value}
                      stateChangeHandler={syncEditorState}
                      setIsEditorActive={setIsEditorActive}/>
                  </div>
                </div>

                <div className={"flex flex-row gap-4"}>

                  <Select
                    isLoading={allBugsByProjects.isLoading}
                    items={allBugsByProjects?.data?.data || []}
                    labelPlacement={"outside"}
                    disallowEmptySelection={true}
                    size={"lg"}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setBugIds(id);
                      addNewBugReducer(AddNewBugReducerActions.setAddNewBugProject(id));
                    }}
                    variant={"bordered"}
                    label="Related Project"
                    placeholder={"Select A Project"}
                    selectionMode="single"
                  >
                    {(item) => (
                      <SelectItem key={item.id} className="capitalize">
                        {item.name}
                      </SelectItem>
                    )}
                  </Select>

                  <Input
                    type={"date"}
                    label={"Target Date"}
                    labelPlacement={"outside"}
                    size={"lg"}
                    isRequired={true}
                    variant="bordered"
                    value={addNewBugState.targetResolutionDate ? DateTime.fromISO(addNewBugState.targetResolutionDate).toFormat("yyyy-MM-dd") : ""}
                    onValueChange={value => {
                      addNewBugReducer(AddNewBugReducerActions.setAddNewBugTargetDate(
                        DateTime.fromFormat(value, "yyyy-MM-dd").toUTC().toISO() || ""));
                    }}
                    className={"w-full"}
                    placeholder={"mm/dd/yyyy"}
                  />
                </div>

                <div className={"flex flex-row gap-4"}>
                  <Select
                    disallowEmptySelection={true}
                    isRequired={true}
                    items={bugPriorityList}
                    label="Bug Priority"
                    defaultSelectedKeys={["high"]}
                    labelPlacement={"outside"}
                    onChange={(e) => {
                      addNewBugReducer(AddNewBugReducerActions.setAddNewBugPriority(e.target.value.toUpperCase()));
                    }}
                    size={"lg"}
                    variant={"bordered"}
                    placeholder={"Select Priority"}
                    selectionMode="single"
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2 capitalize">
                          {item?.data?.icon}
                          {item?.data?.value}
                        </div>
                      ));
                    }}
                  >
                    {(item) => (
                      <SelectItem
                        startContent={item.icon}
                        key={item.key}
                        textValue={item.key}
                        className="capitalize">
                        {item.value}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    isRequired={true}
                    disallowEmptySelection={true}
                    defaultSelectedKeys={["major"]}
                    items={bugSeverityList}
                    label="Bug Severity"
                    labelPlacement={"outside"}
                    size={"lg"}
                    onChange={(e) => {
                      addNewBugReducer(AddNewBugReducerActions.setAddNewBugSeverity(e.target.value.toUpperCase()));
                    }}
                    variant={"bordered"}
                    placeholder={"Select Severity"}
                    selectionMode={"single"}
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2 capitalize">
                          {item?.data?.icon}
                          {item?.data?.value}
                        </div>
                      ));
                    }}
                  >
                    {(item) => (
                      <SelectItem
                        startContent={item.icon}
                        key={item.key}
                        textValue={item.key}
                        className="capitalize">
                        {item.value}
                      </SelectItem>
                    )}
                  </Select>

                </div>

                <div className={"flex flex-row gap-4"}>
                  <Select
                    size={"lg"}
                    isDisabled={true}
                    isRequired={true}
                    label="Bug Identifier"
                    labelPlacement={"outside"}
                    variant={"bordered"}
                    selectionMode="single"
                    items={[user]}
                    defaultSelectedKeys={[user!.id.toString()]}
                    renderValue={() => {
                      return (
                        <div key={user!.id.toString()} className="flex items-center gap-2">
                          <Avatar
                            alt={user?.userName}
                            className="flex-shrink"
                            size="sm"
                            fallback={<HiOutlineUser size={18}/>}
                            src={user?.profileUrl}
                          />
                          <div className="flex flex-col">
                            <span>{user?.userName}</span>
                            <span className="text-default-500 text-tiny">({user?.email})</span>
                          </div>
                        </div>
                      );
                    }}
                  >
                    {(user) => {
                      return <SelectItem key={user!.id} textValue={user!.userName}></SelectItem>;
                    }}
                  </Select>

                  <Select
                    isRequired={true}
                    items={[...allUsersInProject] || []}
                    label="Bug Asignee"
                    labelPlacement={"outside"}
                    size={"lg"}
                    selectedKeys={assigneeSelected}
                    onSelectionChange={setAssigneeSelected}
                    placeholder={"Select A Member"}
                    selectionMode="single"
                    onChange={(e) => {
                      if (e.target.value) {
                        const id = Number(e.target.value);
                        addNewBugReducer(AddNewBugReducerActions.setAddNewBugAssignee(id));
                        addNewBugReducer(AddNewBugReducerActions.setAddNewBugStatus(BugStatus[BugStatus.ASSIGNED]));
                      }
                    }}
                    variant={"bordered"}
                    renderValue={(items) => {
                      return items.map((user) => {
                        return (
                          <div key={user?.data?.id.toString()} className="flex items-center gap-2">
                            <Avatar
                              alt={user?.data?.userName}
                              className="flex-shrink"
                              size="sm"
                              fallback={<HiOutlineUser size={18}/>}
                              src={user?.data?.profileUrl}
                            />
                            <div className="flex flex-col">
                              <span>{user?.data?.userName}</span>
                              <span className="text-default-500 text-tiny">({user?.data?.email})</span>
                            </div>
                          </div>
                        );
                      });
                    }}
                  >
                    {(item) => (
                      <SelectItem key={item.id} className="capitalize">
                        {item.userName}
                      </SelectItem>
                    )}
                  </Select>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => {
                  shouldEditorReset.setTrue();
                  setAllUsersInProject([]);
                  addNewBugReducer(AddNewBugReducerActions.setAddNewBugReset(AddNewBugReducerInitialState));
                }}>
                  Clear
                </Button>
                <Button color="primary" onPress={handleSubmit} isLoading={isBugAddingLoading}>
                  Add Bug
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};