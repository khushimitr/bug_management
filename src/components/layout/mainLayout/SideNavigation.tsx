import {
  HiOutlineBugAnt,
  HiOutlineCog8Tooth,
  HiOutlineSquare3Stack3D,
  HiOutlineSquares2X2,
  HiOutlineUsers
} from "react-icons/hi2";
import { IconType } from "react-icons";
import LOGO from "@/assets/Images/logo-dark.png";
import clsx from "clsx";
import { NavLink, useNavigate, } from "react-router-dom";
import { motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useUser } from "@/lib";
import { UserRole } from "@/utils";
import { SideDropDown } from "@/components/layout/mainLayout/SideDropDown.tsx";
import { NewTeamModal } from "@/features/teams/components/NewTeamModal.tsx";
import { NewBugModal } from "@/features/bugs/components/NewBugModal.tsx";
import { NewProjectModal } from "@/features/projects/components/NewProjectModal.tsx";
import { useGetAllBugs } from "@/features";
import { Image } from "@nextui-org/react";


export type SideNavigationItem = {
  name: string;
  to: string;
  icon: IconType;
  iconReactType: ReactNode;
  isDropdown: boolean;
  data: unknown;
  shouldShowModal: boolean,
  modal: ReactNode;
};

export const SideNavigation = ({
                                 isSidebarOpen
                               }: {
  isSidebarOpen: boolean
  isSmallerScreen: boolean
}) => {
  const user = useUser();
  const allBugs = useGetAllBugs({});
  const navigationCommon = [
    { name: "Dashboard", to: ".", icon: HiOutlineSquares2X2, isDropdown: false },
    {
      name: "Bugs",
      to: "./discussions",
      icon: HiOutlineBugAnt,
      isDropdown: true,
      iconReactType: <HiOutlineBugAnt size={"32"}/>,
      shouldShowModal: false,
      data: allBugs?.data?.data || [
        { id: 1, name: "Team1" },
        { id: 2, name: "Team2" },
        { id: 3, name: "Team3" },
      ],
      modal: <NewBugModal/>
    },
    { name: "Settings", to: "./settings", icon: HiOutlineCog8Tooth, isDropdown: false },
  ].filter(Boolean) as SideNavigationItem[];

  const navigationManager = [
    {
      name: "Teams", to: "./manage/teams", icon: HiOutlineUsers, isDropdown: true,
      iconReactType: <HiOutlineUsers size={"32"}/>,
      shouldFetchData: false,
      shouldShowModal: true,
      data: user.data?.data?.teamsManaged || [], modal: <NewTeamModal/>
    },
    {
      name: "Projects", to: "./manage/projects", icon: HiOutlineSquare3Stack3D, isDropdown: true,
      shouldFetchData: false,
      shouldShowModal: true,
      iconReactType: <HiOutlineSquare3Stack3D size={"32"}/>,
      data: user.data?.data?.projectsCreated || [], modal: <NewProjectModal/>
    }
  ].filter(Boolean) as SideNavigationItem[];

  let navigation: SideNavigationItem[] = [...navigationCommon];

  if (user.data?.data?.role.id === UserRole.ROLE_MANAGER) {
    navigation = [...navigationCommon, ...navigationManager];
  }

  return (
    <>
      {navigation.map((item, index) => {
        if (item.isDropdown) {
          return (
            <li key={item.name}>
              <SideDropDown item={item}/>
            </li>
          );
        } else
          return (
            <li key={item.name} className={"group"}>
              <NavLink
                end={index === 0}
                to={item.to}
                className={({ isActive }) => {
                  return clsx(
                    [
                      " flex group group-hover:text-black items-center justify-start rounded-xl px-2 py-2 text-base font-medium mx-2",
                    ],
                    isActive ? "bg-default-200 text-black transition-all duration-1000" : "text-gray-500",
                  );
                }}
              >
                <item.icon
                  className={clsx(
                    "text-inherit transition-[margin] duration-300 group-hover:mr-6",
                    "mr-4 h-8 w-8 flex-shrink-0",
                  )}
                  aria-hidden="true"
                />
                <motion.div
                  animate={isSidebarOpen ? "open" : "close"}
                  variants={{
                    open: {
                      opacity: 1,
                      transition: { duration: 0.3 },
                    },
                    close: {
                      opacity: 0,
                      transition: { duration: 0.3 },
                    },
                  }}
                >
                  <motion.div
                    animate={isSidebarOpen ? "open" : "close"}
                    variants={{
                      open: {
                        display: "block",
                      },
                      close: {
                        transition: {
                          delay: 0.6,
                        },
                        display: "none",
                      },
                    }}
                  >
                    {item.name}
                  </motion.div>
                </motion.div>
              </NavLink>
            </li>
          );
      })}
    </>
  );
};

type SidebarType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarType) => {
  const window = useWindowSize();
  const navigate = useNavigate();
  const [isSmallerScreen, setIsSmallerScreen] = useState(false);
  useEffect(() => {
    if (window.width < 768) {
      if (!isSmallerScreen) {
        setIsSmallerScreen(true);
        setIsSidebarOpen(false);
      }
    } else {
      if (isSmallerScreen) {
        setIsSmallerScreen(false);
        setIsSidebarOpen(true);
      }
    }
  }, [isSmallerScreen, window]);
  return (
    <motion.div
      className={clsx("flex min-h-screen w-0 flex-shrink-0 md:w-56")}
      animate={isSidebarOpen ? "open" : "close"}
      variants={
        isSmallerScreen
          ? {
            close: { width: "14rem", left: "-100%", position: "absolute", transition: { duration: 0.3 }, },
            open: { width: "14rem", left: "0", position: "relative", transition: { duration: 0.3 }, },
          }
          : {
            open: { width: "14rem" },
            close: { width: "4rem" },
          }
      }
    >
      <motion.div className={clsx(["flex w-full flex-col"])}>
        <div className=" flex h-0 flex-1 flex-col">
          <div className="flex h-16 items-center px-2 text-white rounded-br-md bg-primary-600">
            <Image onClick={() => navigate("/app/")} src={LOGO} className={"mr-4"} width={50} height={80}/>
          </div>
          <div className="flex-1 mt-2 max-h-full bg-white rounded-t-md overflow-y-scroll">
            <nav className="flex-1 py-4">
              <ul className={"flex p-0 h-full flex-col gap-1 space-y-1"}>
                <SideNavigation isSidebarOpen={isSidebarOpen} isSmallerScreen={isSmallerScreen}/>
              </ul>
            </nav>
          </div>
          <div className="bg-white flex h-16 flex-shrink-0 items-center px-4">
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
