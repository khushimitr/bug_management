import {
  addMemberToTeam,
  AddNewTeamFormReducer,
  initialState,
  initialStateType, removeMemberFromTeam,
  setFullState, setTeamMember,
  setTeamName, useGetAllUsersLike,
  useGetTeamById, usePatchTeam
} from "@/features";
import {
  Popover, PopoverContent, PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow, Tooltip,
  User,
  useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, Button, ModalFooter, Input
} from "@nextui-org/react";
import { Key, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { UserType } from "@/global";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import { useBoolean, useDebounce } from "usehooks-ts";
import { queryClient } from "@/lib";
import { useAppSelector } from "@/hooks";

type TeamTableComponentType = {
  teamId: number
}


export const TeamTableComponent = ({ teamId }: TeamTableComponentType) => {

  const team = useGetTeamById({ id: teamId, config: {} });
  const userId = useAppSelector(state => state.user.entities?.id);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const patchStatus = useBoolean(false);
  const idSelected = useRef(-1);
  const popOverRef = useRef<HTMLElement>(null);
  const [members, setMembers] = useState<UserType[]>(team?.data?.data?.members || []);
  const [patchTeamState, patchProjectDispatcher] = useReducer(AddNewTeamFormReducer, initialState, (): initialStateType => {
    return {
      id: team?.data?.data?.id,
      name: team?.data?.data?.name || "",
      manager: {
        id: team?.data?.data?.manager.id || -1
      },
      members: team?.data?.data?.members.reduce<{ id: number }[]>((acc, cv) => {
        acc.push({ id: cv.id });
        return acc;
      }, []) || [],
    };
  });


  const [searchPattern, setSearchPattern] = useState("");
  const debounceSearchPattern = useDebounce(searchPattern, 600);
  const users = useGetAllUsersLike({
    name: debounceSearchPattern,
    config: {},
  });


  useEffect(() => {
    setMembers(team?.data?.data?.members || []);
    patchProjectDispatcher(setFullState({
      id: team?.data?.data?.id,
      name: team?.data?.data?.name || "",
      manager: {
        id: team?.data?.data?.manager.id || -1
      },
      members: team?.data?.data?.members.reduce<{ id: number }[]>((acc, cv) => {
        acc.push({ id: cv.id });
        return acc;
      }, []) || [],
    }));
  }, [team?.data?.data]);

  useEffect(() => {
    if (
      debounceSearchPattern.trim() !== "" &&
      users.isSuccess &&
      users.data &&
      users.data.data &&
      users.data.data.length > 0
    ) {
      if (popOverRef.current) {
        popOverRef.current.click();
      }
    }
  }, [debounceSearchPattern]);


  const patchTeam = usePatchTeam({
    config: {
      onSuccess: () => {
        patchStatus.setFalse();
        queryClient.refetchQueries(["team/", teamId]);
      }
    }
  });

  const handleLocalDelete = () => {
    setMembers([...members.filter(item => item.id !== idSelected.current)]);
    patchProjectDispatcher(removeMemberFromTeam(idSelected.current));
    onClose();
  };
  const handleAddToTeam = (user: UserType) => {
    if (members.findIndex(item => item.id === user.id) === -1) {
      setMembers([...members, user]);
      patchProjectDispatcher(addMemberToTeam(user.id));
    }
  };

  const handlePatch = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (patchTeamState.id) { // @ts-ignore
      patchTeam.mutate(patchTeamState);
      patchStatus.setTrue();
    }
  };

  const renderCell = useCallback((user: UserType, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User

            avatarProps={{ radius: "lg", src: user.profileUrl, fallback: <HiOutlineUser size={"22"}/> }}
            description={`${user.firstName} ${user.lastName}`}
            name={user.userName}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.role.name.toString().substring(5).toLowerCase()}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.email}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Popover placement={"bottom"} showArrow={true}>
              <PopoverTrigger>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <HiOutlineEye/>
              </span>
              </PopoverTrigger>
              <PopoverContent>
                <User
                  avatarProps={{ radius: "lg", src: user.profileUrl, fallback: <HiOutlineUser size={"22"}/> }}
                  description={`${user.firstName} ${user.lastName}`}
                  name={user.userName}
                >
                  {user.email}
                </User>
              </PopoverContent>
            </Popover>
            <Tooltip color={`danger`}
                     content={userId !== user.id ? "Delete user" : `Can't Delete Team Creator`}>
              <span onClick={() => {
                if (userId !== user.id)
                  idSelected.current = user.id;
                onOpen();
              }} className="text-lg text-danger cursor-pointer active:opacity-50">
                <HiOutlineTrash/>
              </span>
            </Tooltip>
          </div>
        );
    }
  }, [patchTeamState, members, team]);


  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "actions" },
  ];
  return (

    <div className={"flex flex-col pt-6 gap-4"}>
      <div className={"flex flex-row justify-between gap-4"}>
        <div className={"flex-1 flex flex-row gap-4 items-start"}>
          <div>
            <Input
              label="Team Name"
              type="text"
              fullWidth={false}
              value={patchTeamState.name}
              onValueChange={(value: string) => {
                patchProjectDispatcher(setTeamName(value));
              }}
            />
          </div>
          <div className={"relative"}>
            <Input
              fullWidth={false}
              label="Search User"
              type="text"
              value={searchPattern}
              onValueChange={(name) =>
                setSearchPattern(name)
              }
            />
            <Popover triggerRef={popOverRef}>
              <PopoverTrigger>
                <button
                  className={
                    "absolute top-full bg-primary w-full h-0"
                  }
                ></button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col items-stretch gap-2 w-full px-1 py-2">
                  {users?.data?.data?.map(user => {
                    return (
                      <User
                        onClick={() => handleAddToTeam(user)}
                        key={user.id}
                        className={"w-full justify-start gap-2"}
                        name={user.userName}
                        description={(
                          <>
                            <div>{`${user.firstName} ${user.lastName}`}</div>
                            <div className={"text-primary"}>{user.email}</div>
                          </>
                        )}
                        avatarProps={{
                          src: user.profileUrl,
                          fallback: <HiOutlineUser size={"22"} className={"text-gray-500"}/>,
                        }}
                      />
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Button
            size={"md"}
            variant={"flat"}
            color={"secondary"}
            isLoading={patchStatus.value}
            startContent={<HiOutlinePencil size={"20"}/>}
            onClick={handlePatch}
          >
            update
          </Button>
        </div>

      </div>
      <Table isStriped={true} aria-label={"Team Table"}>
        <TableHeader columns={columns}>
          {(column) => {
            return (
              <TableColumn aria-label={column.name} key={column.uid}>
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody isLoading={team.isFetching} items={members}>
          {(user) => {
            return <TableRow key={user.id}>
              {(columnKey) => {
                return <TableCell>{renderCell(user, columnKey)}</TableCell>;
              }}
            </TableRow>;
          }}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <div>
                  Are you sure, you want to delete this user from Team.
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLocalDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
