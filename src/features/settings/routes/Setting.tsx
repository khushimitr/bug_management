import React from 'react';
import { SettingsPage } from "@/features";
import { ContentLayout } from "@/components";

export const Setting = () => {
  return (
    <ContentLayout title={"Settings"}>
      <div>
        <SettingsPage/>
      </div>
    </ContentLayout>
  );
};
