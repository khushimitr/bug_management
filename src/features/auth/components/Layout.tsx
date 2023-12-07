import * as React from "react";

import logo from "@/assets/react.svg";
import { Image } from "@nextui-org/react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={"min-h-screen flex flex-col gap-2 justify-center m-auto max-w-max"}>
      <Image src={logo}></Image>
      <h2 className={"text-4xl font-bold"}>{title}</h2>
      <div>
        {children}
      </div>
    </div>
  );
};
