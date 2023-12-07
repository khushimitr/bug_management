import { createAction, createReducer } from "@reduxjs/toolkit";

export type AddNewProjectInitialStateType = {
  id?: number,
  projectKey: string,
  name: string,
  startDate: string,
  targetDate: string,
  manager: { id: number },
  teams: {
    id: number
  }[],
}

export const AddNewProjectReducerInitialState: AddNewProjectInitialStateType = {
  id: undefined,
  manager: { id: -1 },
  name: "",
  projectKey: "",
  startDate:  "",
  targetDate: "",
  teams: []
};

const setAddNewProjectReducerId = createAction("SET_ADD_NEW_PROJECT_REDUCER_ID", (value: number) => {
  return { payload: value };
});

const setAddNewProjectReducerName = createAction("SET_PROJECT_NAME", (projectName: string) => {
  return { payload: projectName };
});

const setAddNewProjectManager = createAction("SET_PROJECT_MANAGER", (managerId: number) => {
  return { payload: managerId };
});

const setAddNewProjectProjectKey = createAction("SET_PROJECT_KEY", (projectKey: string) => {
  return { payload: projectKey };
});

const setAddNewProjectStartDate = createAction("SET_PROJECT_START_DATE", (startDate: string) => {
  return { payload: startDate };
});

const setAddNewProjectTargetDate = createAction("SET_PROJECT_TARGET_DATE", (targetDate: string) => {
  return { payload: targetDate };
});

const addTeamToProject = createAction("SET_ADD_TEAM_TO_PROJECT", (team: number) => {
  return { payload: team };
});

const removeTeamFromProject = createAction("SET_REMOVE_TEAM_FROM_PROJECT", (team: number) => {
  return { payload: team };
});

const setProjectTeam = createAction("SET_PROJECT_TEAM", (teams: { id: number }[]) => {
  return { payload: teams };
});

const initAddNewProjectReset = createAction("RESET_NEW_PROJECT", (resetState: AddNewProjectInitialStateType) => {
  return { payload: resetState };
});

export const AddNewProjectReducer = createReducer(AddNewProjectReducerInitialState, builder => {

  builder.addCase(setAddNewProjectReducerId, (state, action) => {
    state.id = action.payload;
  });
  builder.addCase(setAddNewProjectReducerName, (state, action) => {
    state.name = action.payload;
  });
  builder.addCase(setAddNewProjectManager, (state, action) => {
    state.manager.id = action.payload;
  });
  builder.addCase(setAddNewProjectProjectKey, (state, action) => {
    state.projectKey = action.payload;
  });
  builder.addCase(setAddNewProjectStartDate, (state, action) => {
    state.startDate = action.payload;
  });
  builder.addCase(setAddNewProjectTargetDate, (state, action) => {
    state.targetDate = action.payload;
  });
  builder.addCase(addTeamToProject, (state, action) => {
    state.teams.push({ id: action.payload });
  });
  builder.addCase(removeTeamFromProject, (state, action) => {
    const ind = state.teams.findIndex((item) => item.id === action.payload);
    if (ind !== -1) {
      state.teams.splice(ind, 1);
    }
  });
  builder.addCase(setProjectTeam, (state, action) => {
    state.teams = action.payload;
  });

  builder.addCase(initAddNewProjectReset, (state, action) => {
    state.teams = action.payload.teams;
    state.targetDate = action.payload.targetDate;
    state.name = action.payload.name;
    state.projectKey = action.payload.projectKey;
    state.startDate = action.payload.startDate;
  });
});

export const AddNewProjectReducerActions = {
  setAddNewProjectReducerId,
  setAddNewProjectReducerName,
  setAddNewProjectManager,
  setAddNewProjectProjectKey,
  setAddNewProjectStartDate,
  setAddNewProjectTargetDate,
  addTeamToProject,
  removeTeamFromProject,
  setProjectTeam,
  initAddNewProjectReset
};




