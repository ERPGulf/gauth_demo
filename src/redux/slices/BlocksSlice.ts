import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BlockData } from "@/types/onboardingpages-types";

interface BlocksState {
  blocks: BlockData[];
  currBlock: BlockData | null;
}
const initialState: BlocksState = {
  blocks: [],
  currBlock: null,
};
export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setCurrBlock: (state, action: PayloadAction<BlockData>) => {
      state.currBlock = action.payload;
    },
  },
});

export const { setCurrBlock } = blocksSlice.actions;

// select blocks from state
export const selectBlocks = (state: RootState) => state.blocks.blocks;
// select initial block from state
export const selectInitialBlock = (state: RootState) => state.blocks.blocks[0];
// select current block from state
export const selectCurrBlock = (state: RootState) => state.blocks.currBlock;
export default blocksSlice.reducer;
