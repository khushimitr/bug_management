import { Route, Routes } from "react-router-dom";
import { Project } from "./Project.tsx";
import { NotFound } from "@/features";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path={":projectName"} element={<Project/>}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>);
};