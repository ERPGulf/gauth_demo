import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CloudPlatformIdState {
  cloudPlatform: string | null;
  region: string | null;
  plan: string | null;
  apps: string[] | null;
}

const initialState: CloudPlatformIdState = {
  cloudPlatform: null,
  region: null,
  plan: null,
  apps: null,
};

export const CloudPlatformSlice = createSlice({
  name: "cloudPlatform",
  initialState,
  reducers: {
    setCloudPlatform: (state, action: PayloadAction<string | null>) => {
      state.cloudPlatform = action.payload;
    },
    setPlan: (state, action: PayloadAction<string | null>) => {
      state.plan = action.payload;
    },
    setRegion: (state, action: PayloadAction<string | null>) => {
      state.region = action.payload;
    },
    setApps: (state, action: PayloadAction<string[] | null>) => {
      state.apps = action.payload;
    },
  },
});

// Export the actions
export const { setCloudPlatform, setPlan, setRegion, setApps } =
  CloudPlatformSlice.actions;

// Selectors to access the state values
export const selectCloudPlatform = (state: RootState) =>
  state.cloudPlatform.cloudPlatform;
export const selectPlan = (state: RootState) => state.cloudPlatform.plan;
export const selectRegion = (state: RootState) => state.cloudPlatform.region;
export const selectApps = (state: RootState) => state.cloudPlatform.apps;

export default CloudPlatformSlice.reducer;
