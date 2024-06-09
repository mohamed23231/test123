import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  userRole: string;
}

const initialState: UserState = {
  userRole: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;
