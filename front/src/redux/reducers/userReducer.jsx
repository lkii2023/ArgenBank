import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isAuthenticated: false,
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    updateUserProfile: (state, action) => {
      const { firstName, lastName, email, userName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.userName = userName;
    },

    updateUsername: (state, action) => {
      state.userName = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, updateUserProfile, updateUsername, logout } =
  userSlice.actions;

export default userSlice.reducer;
