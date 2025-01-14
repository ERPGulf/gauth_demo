import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BlockData } from "@/types/onboardingpages-types";

interface UserSelectionState {
  selectedServer: BlockData | null;
  selectedHost: BlockData | null;
  selectedSize: BlockData | null;
}

const initialState: UserSelectionState = {
  selectedServer: null,
  selectedHost: null,
  selectedSize: null,
};

const userSelectionSlice = createSlice({
  name: "userSelection",
  initialState,
  reducers: {
    setUserSelection: (state, action) => {
      const { page, value } = action.payload;
      switch (page) {
        case 1:
          state.selectedServer = value;
          break;
        case 2:
          state.selectedHost = value;
          break;
        case 3:
          state.selectedSize = value;
          break;
        default:
          console.warn(`Unhandled page value: ${page}`);
          break;
      }
    },
    removeUserSelection: (state, action) => {
      const { page } = action.payload;
      switch (page) {
        case 1:
          state.selectedServer = null;
          break;
        case 2:
          state.selectedHost = null;
          break;
        case 3:
          state.selectedSize = null;
          break;
        default:
          console.warn(`Unhandled page value: ${page}`);
          break;
      }
    },
  },
});

export default userSelectionSlice.reducer;

export const { setUserSelection, removeUserSelection } =
  userSelectionSlice.actions;

export const selectUserSelection = (state: RootState) => state.userSelection;
