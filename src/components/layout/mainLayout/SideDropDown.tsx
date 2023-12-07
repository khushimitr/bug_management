import { Accordion, AccordionItem, Spinner } from "@nextui-org/react";
import { SideNavigationItem } from "@/components";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import React, { Suspense } from "react";


const DropDownItemNew = ({ item, path }: { item: string, path: string }) => {
  return <li key={item} className={"group relative"}>
    <NavLink
      to={path}
      className={({ isActive }) => {
        return clsx(
          [
            " flex relative hover:text-black items-center justify-start rounded-xl mx-2 px-2 py-2 text-base font-medium before:content-[''] before:absolute before:top-[28%] before:left-[-24px] before:z-[10] before:w-5 before:h-4 before:bg-dropdown-img before:bg-no-repeat",
          ],
          isActive ? " bg-default-200 text-black transition-all duration-1000" : "text-gray-500",
        );
      }}
    >
      {item}
    </NavLink>
  </li>;
};


export const SideDropDown = ({ item }: { item: SideNavigationItem }) => {
    return (
      <Accordion
        showDivider={false}
        className={"p-0 group relative"}
        isCompact={true}
        itemClasses={{
          title: "text-gray-500 group group-hover:text-black",
          titleWrapper: "group group-hover:ml-2 transition-[margin] duration-300 ",
          startContent: "group group-hover:text-black",
          indicator: "text-gray-500 group group-hover:text-black"
        }}

      >
        <AccordionItem
          key={"1"}
          startContent={item.iconReactType}
          title={item.name}
          className={"mx-2 px-2 font-medium text-gray-500 relative"}
        >
          <Suspense fallback={<Spinner className={"flex justify-center items-center"}/>}>
            <div
              className={"w-full relative before:content-[''] before:absolute before:top-0 before:left-5 before:bottom-6 before:w-[2px] before:bg-gray-500 pl-9"}>
              {/*{item.shouldShowModal && <li*/}
              {/*    className={"relative before:content-[''] before:absolute before:top-[6px] before:left-[-16px] before:w-5 before:h-4 before:bg-dropdown-img before:bg-no-repeat"}>*/}
              {/*  {item.modal}*/}
              {item.shouldShowModal && <li
                  className={"relative before:content-[''] before:absolute before:top-[28%] before:left-[-16px] before:z-[10] before:w-5 before:h-4 before:bg-dropdown-img before:bg-no-repeat"}>
                {item.modal}
              </li>}
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                item.data.map(entry => {
                  return (
                    <DropDownItemNew key={entry.id} item={entry.name}
                                     path={`./${item.name.toLowerCase()}/${(entry.name as string).replaceAll(' ', '-')}`}/>
                  );
                })}
            </div>
          </Suspense>
        </AccordionItem>
      </Accordion>
    )
      ;
  }
;

