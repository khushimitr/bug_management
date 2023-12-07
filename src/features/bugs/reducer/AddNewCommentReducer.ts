import { createAction, createReducer } from "@reduxjs/toolkit";

export type AddNewCommentReducerState = {
  id?: number
  content: string
  commenter: {
    id: number
  }
  referredProject: {
    id: number
  }
  referredBug: {
    id: number
  }
}


export const AddNewCommentReducerInitialState: AddNewCommentReducerState = {
  content: "",
  commenter: {
    id: -1
  },
  referredProject: {
    id: -1
  },
  referredBug: {
    id: -1
  },
};


const setAddNewCommentId = createAction("SET_ADD_NEW_COMMENT_ID", (value: number) => {
  return { payload: value };
});

const setAddNewCommentContent = createAction("SET_ADD_NEW_COMMENT_CONTENT", (value: string) => {
  return { payload: value };
});

const setAddNewCommentCommenter = createAction("SET_ADD_NEW_COMMENT_COMMENTER", (value: number) => {
  return { payload: value };
});

const setAddNewCommentRefferedProject = createAction("SET_ADD_NEW_COMMENT_REFERRED_PROJECT", (value: number) => {
  return { payload: value };
});

const setAddNewCommentRefferedBug = createAction("SET_ADD_NEW_COMMENT_REFERRED_BUG", (value: number) => {
  return { payload: value };
});

const setAddNewCommentSetState = createAction("SET_ADD_NEW_COMMENT_SET_STATE", (value: AddNewCommentReducerState) => {
  return { payload: value };
});


export const AddNewCommentReducer = createReducer(AddNewCommentReducerInitialState, builder => {

  builder.addCase(setAddNewCommentId, (state, action) => {
    state.id = action.payload;
  });

  builder.addCase(setAddNewCommentContent, (state, action) => {
    state.content = action.payload;
  });

  builder.addCase(setAddNewCommentCommenter, (state, action) => {
    state.commenter = { id: action.payload };
  });

  builder.addCase(setAddNewCommentRefferedProject, (state, action) => {
    state.referredProject = { id: action.payload };
  });

  builder.addCase(setAddNewCommentRefferedBug, (state, action) => {
    state.referredBug = { id: action.payload };
  });

  builder.addCase(setAddNewCommentSetState, (state, action) => {
    if (action.payload.id)
      state.id = action.payload.id;
    state.content = action.payload.content;
    state.commenter = action.payload.commenter;
    state.referredBug = action.payload.referredBug;
    state.referredProject = action.payload.referredProject;
  });
});

export const AddNewCommentActions = {
  setAddNewCommentId,
  setAddNewCommentContent,
  setAddNewCommentCommenter,
  setAddNewCommentRefferedProject,
  setAddNewCommentRefferedBug,
  setAddNewCommentSetState
};

