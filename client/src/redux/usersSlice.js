import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    allUsers: [],
    
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
    },
    SetAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    Logout(state) {
      // Reset the user to null when logging out
      state.user = null;
    },
    SetUserUpdate(state, action) {
      // Update the user information with the new data
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    
  },
});

export const { SetUser, SetAllUsers,Logout ,SetUserUpdate} = usersSlice.actions;

export default usersSlice.reducer;