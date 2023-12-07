import { Route, Routes } from "react-router-dom";
import { Setting } from "./Setting.tsx";
import { NotFound } from "@/features";

export const SettingRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Setting/>}/>
      <Route path={"/*"} element={<NotFound/>}/>
    </Routes>
  );
};