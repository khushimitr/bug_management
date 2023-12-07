import { createAction, createReducer } from "@reduxjs/toolkit";
import { RegisterUserType } from "@/features";

const initialState: RegisterUserType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  userName: "",
  isMale: false,
  role: ""
};


export const setFirstName = createAction("SET_FIRST_NAME", (firstName: string) => {
  return { payload: firstName };
});

export const setLastName = createAction("SET_LAST_NAME", (lastName: string) => {
  return { payload: lastName };
});

export const setEmail = createAction("SET_EMAIL", (email: string) => {
  return { payload: email };
});

export const setPassword = createAction("SET_PASSWORD", (password: string) => {
  return { payload: password };
});


export const setPhone = createAction("SET_PHONE", (phone: string) => {
  return { payload: phone };
});

export const setUserName = createAction("SET_USERNAME", (userName: string) => {
  return { payload: userName };
});

export const setIsMale = createAction("SET_IS_MALE", (isMale: boolean) => {
  return { payload: isMale };
});

export const setRole = createAction("SET_ROLE", (role: string) => {
  return { payload: role };
});


// type RegisterFormAction =
//   ReturnType<typeof setFirstName> |
//   ReturnType<typeof setLastName> |
//   ReturnType<typeof setEmail> |
//   ReturnType<typeof setPassword> |
//   ReturnType<typeof setPhone> |
//   ReturnType<typeof setUserName> |
//   ReturnType<typeof setIsMale> |
//   ReturnType<typeof setRole>

export const RegisterFormReducer = createReducer(initialState, builder => {
  builder.addCase(setEmail, (state, action) => {
    state.email = action.payload;
  });

  builder.addCase(setFirstName, (state, action) => {
    state.firstName = action.payload;
  });

  builder.addCase(setLastName, (state, action) => {
    state.lastName = action.payload;
  });

  builder.addCase(setPassword, (state, action) => {
    state.password = action.payload;
  });

  builder.addCase(setPhone, (state, action) => {
    state.phone = action.payload;
  });

  builder.addCase(setUserName, (state, action) => {
    state.userName = action.payload;
  });

  builder.addCase(setIsMale, (state, action) => {
    state.isMale = action.payload;
  });

  builder.addCase(setRole, (state, action) => {
    state.role = action.payload;
  });
});
