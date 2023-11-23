import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isLoggedIn: false,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
        state.name = action.payload.name;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.email = action.payload.email;
    },
    logout: (state) => {
        state.name = "";
        state.isLoggedIn = false;
        state.email = "";
        
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
