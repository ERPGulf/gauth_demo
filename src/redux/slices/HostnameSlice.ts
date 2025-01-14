import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InstanceIdState {
  isHostname: string | null;
}

const initialState: InstanceIdState = {
  isHostname: null,
};

export const HostnameSlice = createSlice({
  name: "hostname",
  initialState,
  reducers: {
    setHostname: (state, action) => {
      state.isHostname = action.payload;
    },
  },
});

export const { setHostname } = HostnameSlice.actions;

// select total from state
export const selectHostname = (state: RootState) => state.hostname.isHostname;

export default HostnameSlice.reducer;
