import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientMetadata, ImageMetadata } from "../types/photography";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface GeneralState {
  latest: DataLoadedState<ImageMetadata[]>;
  clients: DataLoadedState<ClientMetadata[]>;
}

const initialState: GeneralState = {
  latest: {
    data: [],
    loaded: false,
  },
  clients: {
    data: [],
    loaded: false,
  },
};

export const photographySlice = createSlice({
  name: "photography",
  initialState,
  reducers: {
    updateLatest: (
      state,
      action: PayloadAction<DataLoadedState<ImageMetadata[]>>,
    ) => {
      state.latest = action.payload;
    },
    updateClients: (
      state,
      action: PayloadAction<DataLoadedState<ClientMetadata[]>>,
    ) => {
      state.clients = action.payload;
    },
  },
});

export const { updateLatest, updateClients } = photographySlice.actions;

export const selectLatest = (state: RootState) => state.photography.latest;

export const selectClients = (state: RootState) => state.photography.clients;

export default photographySlice.reducer;
