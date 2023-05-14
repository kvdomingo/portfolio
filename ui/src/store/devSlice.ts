import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DevProjectMetadata } from "../types/dev";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface DevState {
  projects: DataLoadedState<DevProjectMetadata[]>;
}

const initialState: DevState = {
  projects: {
    data: [],
    loaded: false,
  },
};

export const devSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {
    updateProjects: (
      state,
      action: PayloadAction<DataLoadedState<DevProjectMetadata[]>>,
    ) => {
      state.projects = action.payload;
    },
  },
});

export const { updateProjects } = devSlice.actions;

export const selectProjects = (state: RootState) => state.dev.projects;

export default devSlice.reducer;
