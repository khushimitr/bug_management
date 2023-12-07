import { Route, Routes } from "react-router-dom";
import { Bugs } from "./Bugs.tsx";
import { Bug } from "./Bug.tsx";
import { NotFound } from "@/features";

export const BugsRoutes = () => {
    return (
      <Routes>
        <Route path={":projectName"} element={< Bugs/>}/>
        <Route path={":projectName/:bugKey"} element={< Bug/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    );
  }
;