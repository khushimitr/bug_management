import { UserType } from "@/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  entities: UserType | null
}


const initialState: UserState = {
  entities: null
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.entities = action.payload;
    },
    removeUser: (state) => {
      state.entities = null;
    }
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;




