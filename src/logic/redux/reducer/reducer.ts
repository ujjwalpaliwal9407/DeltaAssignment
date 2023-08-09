import { createReducer } from "@reduxjs/toolkit";
import { setLoggedDetail, setLoggedIn } from "../action/action";

interface I_Props {
  userName: string;
  email: string;
}

interface I_InitialStateProps {
  isLoggedIn: boolean;
  isLoggedDetail: I_Props[];
}
export const initialState: I_InitialStateProps = {
  isLoggedIn: false,
  isLoggedDetail: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoggedIn, (state, action) => {
    state.isLoggedIn = action.payload;
  });
  builder.addCase(setLoggedDetail, (state, action) => {
    state.isLoggedDetail = action.payload;
  });
});

export default userReducer;
