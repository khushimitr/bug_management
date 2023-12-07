import { createAction, createReducer } from "@reduxjs/toolkit";

export type initialStateType = {
  id?: number,
  name: string,
  manager: { id: number },
  members: { id: number }[]
}

export const initialState: initialStateType = {
  name: "",
  manager: {
    id: -1,
  },
  members: []
};


export const setTeamID = createAction("SET_TEAM_ID", (value: number) => {
  return { payload: value };
});

export const setTeamName = createAction("SET_NAME", (teamName: string) => {
  return { payload: teamName };
});
export const setManagerId = createAction("SET_MANAGER_ID", (id: number) => {
  return { payload: id };
});

export const addMemberToTeam = createAction("SET_ADD_MEMBER", (member: number) => {
  return { payload: member };
});

export const removeMemberFromTeam = createAction("SET_REM_MEMBER", (member: number) => {
  return { payload: member };
});

export const setTeamMember = createAction("SET_TEAM_MEMBER", (member: { id: number }[]) => {
  return { payload: member };
});

export const setFullState = createAction("SET_FULL_STATE", (value: initialStateType) => {
  return { payload: value };
});


export const AddNewTeamFormReducer = createReducer(initialState, builder => {

    builder.addCase(setFullState, (state, action) => {
      state.id = action.payload.id;
      state.members = action.payload.members;
      state.manager = action.payload.manager;
      state.name = action.payload.name;
    });

    builder.addCase(setTeamID, (state, action) => {
      state.id = action.payload;
    });

    builder.addCase(setTeamName, (state, action) => {
      state.name = action.payload;
    });

    builder.addCase(setManagerId, (state, action) => {
      state.manager.id = action.payload;
    });

    builder.addCase(addMemberToTeam, (state, action) => {
      state.members.push({ id: action.payload });
    });

    builder.addCase(removeMemberFromTeam, (state, action) => {
      const ind = state.members.findIndex(item => item.id === action.payload);
      if (ind > 0) {
        state.members.splice(ind, 1);
      }
    });

    builder.addCase(setTeamMember, (state, action) => {
      state.members = action.payload;
    });
  })
;

