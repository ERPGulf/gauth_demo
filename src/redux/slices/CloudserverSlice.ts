import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CloudServerItem } from "@/types/cloudserver-types";
interface CloudserverState {
  selectedServer: CloudServerItem | null;
  totalPages: number;
  hostName: string | null;
  cloudPlatform: string | null;
}

// Initialize the state with default values
const initialState: CloudserverState = {
  selectedServer: null,
  totalPages: 0,
  hostName: null,
  cloudPlatform: null,
};

// Create the slice
export const cloudserverSlice = createSlice({
  name: "cloudserver",
  initialState,
  reducers: {
    setSelectedServer: (state, action: PayloadAction<CloudServerItem>) => {
      state.selectedServer = action.payload;
    },
    setSelectedServerHostname: (state, action: PayloadAction<string>) => {
      state.hostName = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setServerCloudPlatform: (state, action: PayloadAction<string>) => {
      state.cloudPlatform = action.payload;
    },
    clearSelectedServer(state) {
      state.selectedServer = null;
    },
  },
});

export const {
  setSelectedServer,
  setTotalPages,
  clearSelectedServer,
  setSelectedServerHostname,
  setServerCloudPlatform,
} = cloudserverSlice.actions;

export const selectSelectedServer = (state: RootState) =>
  state.cloudserver.selectedServer;

export const selectTotalPages = (state: RootState) =>
  state.cloudserver.totalPages;

export const selectedHostname = (state: RootState) =>
  state.cloudserver.hostName;

export const selectedServerCloudPlatform = (state: RootState) =>
  state.cloudserver.cloudPlatform;

export default cloudserverSlice.reducer;
