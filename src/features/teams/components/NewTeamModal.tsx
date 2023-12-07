import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner, User,
} from "@nextui-org/react";
import { Suspense, useEffect, useReducer, useRef, useState } from "react";
import {
  addMemberToTeam,
  AddNewTeamFormReducer,
  initialState, removeMemberFromTeam, setManagerId, setTeamMember, setTeamName, useAddNewTeam, useGetAllUsersLike
} from "@/features";
import { useDebounce } from "usehooks-ts";
import { HiOutlineUser } from "react-icons/hi2";
import { UserType } from "@/global";
import { useAppSelector } from "@/hooks";
import { queryClient } from "@/lib";

export const NewTeamModal = () => {
  const managerId = useAppSelector(state => state.user.entities?.id);
  const popOverRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isTeamAddingLoading, setIsTeamAddingLoading] = useState(false);
  const [userChips, setUserChips] = useState<UserType[]>([]);
  const [newTeamState, newTeamStateDispatcher] = useReducer(
    AddNewTeamFormReducer,
    initialState
  );
  const [searchPattern, setSearchPattern] = useState("");
  const debounceSearchPattern = useDebounce(searchPattern, 600);
  const users = useGetAllUsersLike({
    name: debounceSearchPattern,
    config: {},
  });

  const addNewTeam = useAddNewTeam({
    config: {
      onSuccess: () => {
        console.log("team added successfully");
        queryClient.invalidateQueries(["/team/new"]);
        queryClient.refetchQueries(["authenticated-user"]);
        setIsTeamAddingLoading(false);
        handleModalClose();
        modalRef.current?.click();
      },
      onError: (error) => {
        console.log(error);
        setIsTeamAddingLoading(false);
      },
    }
  });

  useEffect(() => {
    if (managerId != null) {
      newTeamStateDispatcher(setManagerId(managerId));
    }
  }, []);

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


  const handleSubmit = async () => {
    setIsTeamAddingLoading(true);
    addNewTeam.mutate(newTeamState);
  };

  const handleModalClose = () => {
    newTeamStateDispatcher(setTeamName(""));
    newTeamStateDispatcher(setTeamMember([]));
    setSearchPattern("");
    setUserChips([]);
  };

  const handleRemoveFromTeam = (user: UserType) => {
    setUserChips([...userChips.filter(item => item.id !== user.id)]);
    newTeamStateDispatcher(removeMemberFromTeam(user.id));
  };

  const handleAddToTeam = (user: UserType) => {
    if (userChips.findIndex(item => item.id === user.id) === -1) {
      setUserChips([...userChips, user]);
      newTeamStateDispatcher(addMemberToTeam(user.id));
    }
  };

  return (
    <>
      <Button
        ref={modalRef}
        onPress={onOpen}
        className={
          "flex relative group group-hover:text-black items-center justify-start rounded-xl mx-2 px-2 py-2 text-base font-medium text-gray-500"
        }
      >
        Add New
      </Button>
      <Modal
        size={"md"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={handleModalClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Team
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Team Name"
                  variant="bordered"
                  value={newTeamState.name}
                  onValueChange={(name) => newTeamStateDispatcher(setTeamName(name))}
                />
                <div className={"relative"}>
                  <Input
                    label="Search User"
                    type="text"
                    variant="bordered"
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

                <div
                  className={`flex flex-row flex-wrap gap-2 bg-gray-100 rounded-xl ${userChips.length > 0 ? 'p-2' : 'p-0'} transition-all duration-300`}>
                  {userChips.map(
                    (user) => (
                      <User
                        key={user.id}
                        className={"justify-start gap-2 p-1 bg-white"}
                        name={user.userName}
                        onClick={() => handleRemoveFromTeam(user)}
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
                    )
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleModalClose}
                >
                  Clear
                </Button>
                <Button color="primary" onPress={handleSubmit} isLoading={isTeamAddingLoading}>
                  Add Team
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
