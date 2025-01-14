import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userPlanSelectionState {
  selections: string[];
}

const initialState: userPlanSelectionState = {
  selections: [],
};

const userPlanSelectionSlice = createSlice({
  name: "userPlanSelection",
  initialState,
  reducers: {
    addSelection: (state, action) => {
      // Add the selection if it doesn't already exist
      if (!state.selections.includes(action.payload)) {
        state.selections.push(action.payload);
      }
    },
    removeSelection: (state, action) => {
      // Remove the selection if it exists
      state.selections = state.selections.filter(
        (item) => item !== action.payload,
      );
    },
    clearSelections: (state) => {
      // Clear all selections
      state.selections = [];
    },
  },
});

export default userPlanSelectionSlice.reducer;

export const { addSelection, removeSelection, clearSelections } =
  userPlanSelectionSlice.actions;
//   export const selectUserSelection = (state: RootState) => state.userSelection;
export const selectUserPlanSelection = (state: RootState) =>
  state.userPlanSelection.selections;
