import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  value: number;
}

const initialState: ProgressState = {
  value: 20,
};

export const ProgressSlice = createSlice({
  initialState,
  name: "progress",
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setProgress } = ProgressSlice.actions;

export const selectProgress = (state: { progress: ProgressState }) =>
  state.progress.value;

export default ProgressSlice.reducer;
