import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageMetadata } from "../types/photography";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface GeneralState {
  latest: DataLoadedState<ImageMetadata[]>;
}

const initialState: GeneralState = {
  latest: {
    data: [],
    loaded: false,
  },
};

export const photographySlice = createSlice({
  name: "photography",
  initialState,
  reducers: {
    updateLatest: (state, action: PayloadAction<DataLoadedState<ImageMetadata[]>>) => {
      state.latest = action.payload;
    },
  },
});

export const { updateLatest } = photographySlice.actions;

export const selectLatest = (state: RootState) => state.photography.latest;

export default photographySlice.reducer;
