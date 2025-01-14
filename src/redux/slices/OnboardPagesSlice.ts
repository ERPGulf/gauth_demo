import { Page, PortalSection } from "@/types/onboardingpages-types";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface onBoardingpagesState extends PortalSection {
  currPages: Page;
}

const initialState: onBoardingpagesState = {
  Section_number: "",
  portal_area: "",
  heading: "",
  short_description: "",
  pages: [],
  created_by: "",
  created_at: "",
  disable: 0,
  last_updated_by: "",
  last_updated_at: "",
  currPages: { page_number: null, data: [] },
};
export const onBoardPagesSlice = createSlice({
  name: "onboardPages",
  initialState,
  reducers: {
    setOnboardPages: (state, action: PayloadAction<PortalSection>) => {
      return { ...state, ...action.payload };
    },
    setCurrPages: (state, action: PayloadAction<number>) => {
      const pages = state.pages.find(
        (block) => block.page_number === action.payload,
      );
      if (pages) {
        state.currPages = pages;
      } else {
        state.currPages = { page_number: action.payload, data: [] };
      }
    },
  },
});

export const { setOnboardPages, setCurrPages } = onBoardPagesSlice.actions;

// select onboardPages from state
export const selectOnboardPages = (state: RootState) => state.onBoardPage;
// select intial blocks from state
export const selectInitialBlocks = createSelector(
  (state: RootState) => state.onBoardPage.pages,
  (pages) => {
    return pages.find((page) => page.page_number === 1)?.data || [];
  },
);
// select currPages from state
export const selectcurrPages = (state: RootState) =>
  state.onBoardPage.currPages;
// select blocks from currPages
export const selectCurrBlocks = (state: RootState) =>
  state.onBoardPage.currPages.data;

// select main page details from state
export const selectMainPageDetails = (state: RootState) => {
  if (state.onBoardPage) {
    return {
      heading: state.onBoardPage.heading,
      short_description: state.onBoardPage.short_description,
      created_by: state.onBoardPage.created_by,
      created_at: state.onBoardPage.created_at,
      last_updated_by: state.onBoardPage.last_updated_by,
      last_updated_at: state.onBoardPage.last_updated_at,
    };
  }
  return null;
};
// select headers from state
export const selectHeaders = createSelector(
  (state: RootState) => state.onBoardPage.heading,
  (state: RootState) => state.onBoardPage.short_description,
  (heading, short_description) => {
    return {
      heading,
      short_description,
    };
  },
);

export default onBoardPagesSlice.reducer;
