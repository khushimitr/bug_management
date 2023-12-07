import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/features";
import { Team } from "./Team.tsx";

export const TeamRoutes = () => {
  return (
    <Routes>
      <Route path={":teamName"} element={<Team/>}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>);
};