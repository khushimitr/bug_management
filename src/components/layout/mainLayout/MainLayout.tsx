import React, { useState } from "react";
import { Sidebar } from "@/components";
import {
  HiOutlineUser,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBellAlert,
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle
} from "react-icons/hi2";
import {
  Badge,
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger,
  Input, Kbd,
  useDisclosure, User
} from "@nextui-org/react";
import { useLogout, useUser } from "@/lib";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { NewBugModal } from "@/features/bugs/components/NewBugModal.tsx";

type MainLayoutProps = React.PropsWithChildren;
export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-10 flex h-16 flex-shrink-0">
          <div className="flex flex-1 justify-end">
            <div className="flex w-full items-center bg-white justify-between rounded-b-md mx-2">

              <div className={"flex flex-row gap-8 items-center"}>
                <Button
                  variant={"light"}
                  radius={"full"}
                  size={"md"}
                  isIconOnly
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  {isSidebarOpen ?
                    <HiOutlineArrowLeftCircle className={"text-gray-500"} size={"28"}/> :
                    <HiOutlineArrowRightCircle className={"text-gray-500"} size={"28"}/>}
                </Button>

                <div>
                  <Input
                    size={"lg"}
                    radius="lg"
                    placeholder="Type to search..."
                    endContent={
                      <Kbd keys={["command"]}>F</Kbd>
                    }
                    startContent={
                      <CiSearch size={"32"}/>
                    }
                  />
                </div>
              </div>
              <div className={"basis-[25%] flex flex-row justify-between items-center gap-4 mx-4"}>

                <NewBugModal/>

                <Badge color="danger" shape="circle">
                  <Button radius="full"
                          isIconOnly
                          variant="light">
                    <HiOutlineChatBubbleOvalLeftEllipsis className={"text-gray-500"} size={"24"}/>
                  </Button>
                </Badge>

                <Badge color="danger" shape="circle">
                  <Button radius="full"
                          isIconOnly
                          variant="light"
                  >
                    <HiOutlineBellAlert className={"text-gray-500"} size={"24"}/>
                  </Button>
                </Badge>

                <Dropdown>
                  <DropdownTrigger>
                    <User
                      as={"button"}
                      className={"transition-transform"}
                      avatarProps={{
                        src: `${user.data?.data?.profileUrl}`,
                        showFallback: true,
                        fallback: <HiOutlineUser className={"text-gray-500"} size={"24"}/>
                      }}
                      name={user.data?.data?.userName}
                      description={user.data?.data?.role?.name.toString().substring(5).toLowerCase()}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label={"Profile Actions"} variant={"flat"}>
                    <DropdownSection showDivider>
                      <DropdownItem key="settings" onClick={() => navigate("/app/settings")}>
                        Account Settings
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection showDivider>
                      <DropdownItem key="analytics">
                        Analytics
                      </DropdownItem>
                      <DropdownItem key="affiliate">
                        Affiliate Centers
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection>
                      <DropdownItem key="settings" onClick={async () => {
                        await logout.mutateAsync({});
                        navigate("/");
                      }}>
                        Logout
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>

              </div>
            </div>
          </div>
        </div>
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
    ;
};
