import { useGetBugById } from "@/features";
import { queryClient } from "@/lib";
import { ApiResponse, ProjectType, UserType } from "@/global";
import { BugPriority, BugSeverity, BugStatus, giveProjectIdByName, statusColorMap } from "@/utils";
import { EditorComponent } from "@/components";
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useReducer, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { convertFromRaw, EditorState } from "draft-js";
import BugComments from "@/features/bugs/components/BugComments.tsx";
import { useAppSelector } from "@/hooks";
import { Avatar, Chip, Select, SelectItem, Textarea } from "@nextui-org/react";
import {
  AddNewBugInitialStateType,
  AddNewBugReducer,
  AddNewBugReducerActions,
  AddNewBugReducerInitialState, getAllUsersInProject
} from "@/features";
import { HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineUser } from "react-icons/hi2";

interface UseBooleanOutputLocal {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

type BugComponentProps = {
  bugKey: string
  projectName: string
  isEditable: UseBooleanOutputLocal
  isAuthor: UseBooleanOutputLocal
  setTempState: Dispatch<React.SetStateAction<AddNewBugInitialStateType | undefined>>
}

export const BugComponent = ({ setTempState, isAuthor, bugKey, projectName, isEditable }: BugComponentProps) => {
  const bugId = Number(bugKey.split('-')[1]);
  const userId = useAppSelector(state => state.user.entities?.id);
  const projects = queryClient.getQueryData<ApiResponse<ProjectType[]>>(["allBugs"]);
  let projectId = -1;
  if (projects && projects.data)
    projectId = giveProjectIdByName(projects.data, projectName);

  console.log(bugKey, bugId, projectId);
  const Bug = useGetBugById({ bugId: bugId, projectId: projectId, config: {} });


  // for Editor : description
  const [isEditorActive, setIsEditorActive] = useState(false);
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(Bug!.data!.data!.description)));
  const shouldEditorReset = useBoolean(false);
  const [allUsersInProject, setAllUsersInProject] = useState<UserType[]>([]);

  useEffect(() => {
    (async function () {
      const result = await getAllUsersInProject(projectId);
      if (result.data) {
        setAllUsersInProject(result.data);
      }
    })();

    isAuthor.setValue(() => userId === Bug?.data?.data?.identifier.id);
  }, [projectId]);


  // Bug State:
  const [addNewBugState, addNewBugReducer] = useReducer(
    AddNewBugReducer,
    AddNewBugReducerInitialState,
    (): AddNewBugInitialStateType => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id: bugId, assignee: { id: Bug?.data?.data?.assignee.id || -1 }, bugPriority: Bug?.data?.data?.bugPriority, bugSeverity: Bug?.data?.data?.bugSeverity, bugStatus: Bug?.data?.data?.bugStatus, description: "", identifier: { id: Bug?.data?.data?.identifier.id }, project: { id: Bug?.data?.data?.project.id }, summary: Bug?.data?.data?.summary, targetResolutionDate: Bug?.data?.data?.targetResolutionDate
      };
    }
  );


  useEffect(() => {
    setTempState(addNewBugState);
  }, [addNewBugState]);

  //lists

  const bugStatusList = useMemo(() => {
    return Object.keys(BugStatus).reduce<{
      key: string,
      icon: ReactNode
    }[]>((acc, cv) => {
      if (cv.length > 2) {
        acc.push({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          key: cv.toLowerCase(), value: cv.toLowerCase()
        });
      }
      return acc;
    }, []);
  }, []);

  const bugPriorityList = useMemo(() => {
    return Object.keys(BugPriority).reduce<{
      key: string,
      value: string,
      icon: ReactNode
    }[]>((acc, cv) => {
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
    return Object.keys(BugSeverity).reduce<{
      key: string,
      value: string,
      icon: ReactNode
    }[]>((acc, cv: string) => {
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


  const syncEditorState = (value: string) => {
    addNewBugReducer(AddNewBugReducerActions.setAddNewBugDescription(value));
  };

  //edit buttons:

  return (
    <div className={"flex flex-row gap-4 justify-between"}>
      <div className={"basis-[75%] shrink-0 p-2 flex flex-col gap-6 max-h-[70vh] overflow-y-scroll"}>
        <div className={"shrink-0"}>
          {/*<h1 className={"text-2xl whitespace-normal"}>{Bug?.data?.data?.summary}</h1>*/}
          <Textarea
            maxRows={isEditable.value ? 2 : 1}
            classNames={{
              input: "text-2xl whitespace-normal"
            }}
            variant={"bordered"}
            value={addNewBugState.summary}
            onValueChange={(value) => {
              if (isEditable.value)
                addNewBugReducer(AddNewBugReducerActions.setAddNewBugSummary(value));
            }}
          />
        </div>
        <div className={"w-full"}>
          <div className={"text-md font-medium"}>DESCRIPTION :</div>
          <EditorComponent
            contentState={contentState}
            isDisabled={!isEditable.value}
            setResetFalse={shouldEditorReset.setFalse}
            shouldReset={shouldEditorReset.value}
            stateChangeHandler={syncEditorState}
            setIsEditorActive={setIsEditorActive}/>
        </div>
        <div className={"shrink-0 grow-1"}>
          <div className={"text-md font-medium"}>COMMENTS :</div>
          <BugComments Bug={Bug}/>
          <div className={"px-4"}></div>
        </div>
      </div>

      <aside className={"basis-[25%] shrink-0 flex flex-col gap-4"}>
        <div>
          <div className={"text-md font-medium"}>STATUS :</div>
          <Select
            isRequired={true}
            disallowEmptySelection={true}
            labelPlacement={"outside"}
            defaultSelectedKeys={[addNewBugState.bugStatus.toLowerCase()]}
            items={bugStatusList}
            onChange={(e) => {
              addNewBugReducer(AddNewBugReducerActions.setAddNewBugSeverity(e.target.value.toUpperCase()));
            }}
            variant={"bordered"}
            disabledKeys={addNewBugState.assignee.id ? ["new"] : undefined}
            placeholder={"Select Severity"}
            selectionMode={"single"}
            isOpen={isEditable.value ? undefined : false}
            renderValue={(items) => {
              return items.map((item) => (
                <Chip
                  radius={"sm"}
                  classNames={{
                    content: "p-2",
                    base: "py-2"
                  }}
                  className="capitalize" color={statusColorMap[item.key?.toString().toUpperCase() || ""]} size="md"
                  variant="flat">
                  {item.key?.toString().toUpperCase() || ""}
                </Chip>
              ));
            }}
          >
            {(item) => (
              <SelectItem
                key={item.key}
                textValue={item.key}
                className={`capitalize`}>
                <div>
                  {item.key.toString().toUpperCase()}
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        <div>
          <div className={"text-md font-medium"}>ASSIGNEE :</div>
          <Select
            isOpen={isEditable.value ? undefined : false}
            isRequired={true}
            disallowEmptySelection={false}
            items={[...allUsersInProject] || []}
            selectedKeys={[`${addNewBugState.assignee.id}`]}
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
                <div key={item.id} className="flex items-center gap-2">
                  <Avatar
                    alt={item.userName}
                    className="flex-shrink"
                    size="sm"
                    fallback={<HiOutlineUser size={18}/>}
                    src={item.profileUrl}
                  />
                  <div className="flex flex-col">
                    <span>{item.userName}</span>
                    <span className="text-default-500 text-tiny">({item.email})</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        <div>
          <div className={"text-md font-medium"}>IDENTIFIER :</div>
          <Select
            isRequired={true}
            isOpen={false}
            variant={"bordered"}
            placeholder={"Select A Member"}
            selectionMode="single"
            items={[Bug?.data?.data?.identifier]}
            defaultSelectedKeys={[`${Bug?.data?.data?.identifier.id}`]}
            renderValue={() => {
              return (
                <div key={Bug?.data?.data?.identifier.id.toString()} className="flex items-center gap-2">
                  <Avatar
                    alt={Bug?.data?.data?.identifier?.userName}
                    className="flex-shrink"
                    size="sm"
                    fallback={<HiOutlineUser size={18}/>}
                    src={Bug?.data?.data?.identifier?.profileUrl}
                  />
                  <div className="flex flex-col">
                    <span>{Bug?.data?.data?.identifier?.userName}</span>
                    <span className="text-default-500 text-tiny">({Bug?.data?.data?.identifier?.email})</span>
                  </div>
                </div>
              );
            }}
          >
            {(user) => {
              return <SelectItem key={user!.id} textValue={user!.userName}></SelectItem>;
            }}
          </Select>
        </div>
        <div className={"flex flex-row items-start justify-between gap-2"}>
          <div className={"basis-1/2"}>
            <div className={"text-md font-medium"}>PRIORITY :</div>
            <Select
              isOpen={isEditable.value ? undefined : false}
              disallowEmptySelection={true}
              isRequired={true}
              labelPlacement={"outside"}
              items={bugPriorityList}
              defaultSelectedKeys={[addNewBugState.bugPriority.toLowerCase()]}
              onChange={(e) => {
                addNewBugReducer(AddNewBugReducerActions.setAddNewBugPriority(e.target.value.toUpperCase()));
              }}
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
          </div>
          <div className={"basis-1/2"}>
            <div className={"text-md font-medium"}>SEVERITY :</div>
            <Select
              isOpen={isEditable.value ? undefined : false}
              isRequired={true}
              disallowEmptySelection={true}
              labelPlacement={"outside"}
              defaultSelectedKeys={[addNewBugState.bugSeverity.toLowerCase()]}
              items={bugSeverityList}
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
        </div>
        <div>
          <div className={"text-md font-medium"}>TARGET END DATE :</div>
          <div>{addNewBugState.targetResolutionDate}</div>
        </div>
        <div className={"h-[1px] bg-default"}></div>
        <div>
          <div className={"text-xs"}>
            <p>Created at 5 months ago</p>
            <p>Updated at 15 days ago</p>
          </div>
        </div>
      </aside>
    </div>
  );
};
