import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

// select sidebar from state
export const selectSidebar = (state: RootState) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
