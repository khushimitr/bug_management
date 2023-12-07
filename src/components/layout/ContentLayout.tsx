import React from "react";

type ContentLayoutProps = React.PropsWithChildren<{
  title: string;
}>;

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className={"h-full px-2 pt-2"}>
      <div className="py-4 h-full max-h-full overflow-y-scroll rounded-t-md bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold ti">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </div>
  );
};