import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeContent, HomeTechnologies } from "../types/home";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface GeneralState {
  home: DataLoadedState<HomeContent[]>;
  technologies: DataLoadedState<HomeTechnologies[]>;
}

const initialState: GeneralState = {
  home: {
    data: [],
    loaded: false,
  },
  technologies: {
    data: [],
    loaded: false,
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateHomeContent: (state, action: PayloadAction<DataLoadedState<HomeContent[]>>) => {
      state.home = action.payload;
    },
    updateHomeTechnologies: (state, action: PayloadAction<DataLoadedState<HomeTechnologies[]>>) => {
      state.technologies = action.payload;
    },
  },
});

export const { updateHomeContent, updateHomeTechnologies } = generalSlice.actions;

export const selectHomeContent = (state: RootState) => state.general.home;

export const selectHomeTechnologies = (state: RootState) => state.general.technologies;

export default generalSlice.reducer;
