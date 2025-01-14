import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface StatusFilterState {
  statusFilter: string | null;
}

const initialState: StatusFilterState = {
  statusFilter: null,
};

const statusFilterSlice = createSlice({
  name: "statusFilter",
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<string | null>) {
      state.statusFilter = action.payload;
    },
  },
});

export const { setStatusFilter } = statusFilterSlice.actions;

export const selectStatusFilter = (state: RootState) =>
  state.statusFilter.statusFilter;

export default statusFilterSlice.reducer;
