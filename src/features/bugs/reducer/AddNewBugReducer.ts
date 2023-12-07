import { BugPriority, BugSeverity, BugStatus } from "@/utils";
import { createAction, createReducer } from "@reduxjs/toolkit";

export type AddNewBugInitialStateType = {
  id?: number
  summary: string
  description: string
  bugStatus: string
  bugSeverity: string
  bugPriority: string
  targetResolutionDate: string | null
  identifier: {
    id: number
  }
  assignee: {
    id: number | null
  }
  project: {
    id: number
  }
}

export const AddNewBugReducerInitialState: AddNewBugInitialStateType = {
  assignee: { id: null },
  bugPriority: BugPriority[BugPriority.HIGH],
  bugSeverity: BugSeverity[BugSeverity.MAJOR],
  bugStatus: BugStatus[BugStatus.NEW],
  description: "",
  identifier: { id: -1 },
  project: { id: -1 },
  summary: "",
  targetResolutionDate: ""
};


const setAddNewBugID = createAction("SET_ADD_NEW_BUG_ID", (value: number) => {
  return { payload: value };
});

const setAddNewBugIdentifier = createAction("SET_ADD_NEW_BUG_IDENTIFIER", (value: number) => {
  return { payload: value };
});

const setAddNewBugProject = createAction("SET_ADD_NEW_BUG_PROJECT", (value: number) => {
  return { payload: value };
});

const setAddNewBugTargetDate = createAction("SET_ADD_NEW_BUG_TARGET_DATE", (value: string) => {
  return { payload: value };
});

const setAddNewBugAssignee = createAction("SET_ADD_NEW_BUG_ASSIGNEE", (value: number | null) => {
  return { payload: value };
});

const setAddNewBugPriority = createAction("SET_ADD_NEW_BUG_PRIORITY", (value: string) => {
  return { payload: value.toString() };
});

const setAddNewBugSeverity = createAction("SET_ADD_NEW_BUG_SEVERITY", (value: string) => {
  return { payload: value.toString() };
});

const setAddNewBugStatus = createAction("SET_ADD_NEW_BUG_STATUS", (value: string) => {
  return { payload: value.toString() };
});

const setAddNewBugDescription = createAction("SET_ADD_NEW_BUG_DESCRIPTION", (value: string) => {
  return { payload: value };
});

const setAddNewBugSummary = createAction("SET_ADD_NEW_BUG_SUMMARY", (value: string) => {
  return { payload: value };
});

const setAddNewBugReset = createAction("SET_ADD_NEW_BUG_RESET", (value: AddNewBugInitialStateType) => {
  return { payload: value };
});


export const AddNewBugReducer = createReducer(AddNewBugReducerInitialState, builder => {

  builder.addCase(setAddNewBugID, (state, action) => {
    state.id = action.payload;
  });

  builder.addCase(setAddNewBugIdentifier, (state, action) => {
    state.identifier = { id: action.payload };
  });

  builder.addCase(setAddNewBugProject, (state, action) => {
    state.project.id = action.payload;
  });

  builder.addCase(setAddNewBugSummary, (state, action) => {
    state.summary = action.payload;
  });

  builder.addCase(setAddNewBugPriority, (state, action) => {
    state.bugPriority = action.payload;
  });

  builder.addCase(setAddNewBugTargetDate, (state, action) => {
    state.targetResolutionDate = action.payload;
  });

  builder.addCase(setAddNewBugAssignee, (state, action) => {
    state.assignee.id = action.payload;
  });

  builder.addCase(setAddNewBugDescription, (state, action) => {
    state.description = action.payload;
  });

  builder.addCase(setAddNewBugStatus, (state, action) => {
    state.bugStatus = action.payload;
  });

  builder.addCase(setAddNewBugSeverity, (state, action) => {
    state.bugSeverity = action.payload;
  });

  builder.addCase(setAddNewBugReset, (state, action) => {
    state.assignee.id = action.payload.assignee.id;
    state.bugPriority = action.payload.bugPriority;
    state.bugSeverity = action.payload.bugSeverity;
    state.bugStatus = action.payload.bugStatus;
    state.description = action.payload.description;
    state.project = action.payload.project;
    state.summary = action.payload.summary;
    state.targetResolutionDate = action.payload.targetResolutionDate;
  });
});


export const AddNewBugReducerActions = {
  setAddNewBugID,
  setAddNewBugIdentifier,
  setAddNewBugProject,
  setAddNewBugTargetDate,
  setAddNewBugAssignee,
  setAddNewBugPriority,
  setAddNewBugSeverity,
  setAddNewBugStatus,
  setAddNewBugDescription,
  setAddNewBugSummary,
  setAddNewBugReset
};
