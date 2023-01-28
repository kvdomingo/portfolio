import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AboutContent, CVContent } from "../types/about";
import { HomeContent, HomeTechnologies } from "../types/home";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface GeneralState {
  home: DataLoadedState<HomeContent[]>;
  technologies: DataLoadedState<HomeTechnologies[]>;
  about: DataLoadedState<AboutContent[]>;
  cv: DataLoadedState<CVContent>;
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
  about: {
    data: [],
    loaded: false,
  },
  cv: {
    data: {
      education: [],
      certification: [],
      project: [],
      publication: [],
      work: [],
      reference: [],
    },
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
    updateAboutContent: (state, action: PayloadAction<DataLoadedState<AboutContent[]>>) => {
      state.about = action.payload;
    },
    updateCV: (state, action: PayloadAction<DataLoadedState<CVContent>>) => {
      state.cv = action.payload;
    },
  },
});

export const { updateHomeContent, updateHomeTechnologies, updateAboutContent, updateCV } = generalSlice.actions;

export const selectHomeContent = (state: RootState) => state.general.home;

export const selectHomeTechnologies = (state: RootState) => state.general.technologies;

export const selectAboutContent = (state: RootState) => state.general.about;

export const selectCV = (state: RootState) => state.general.cv;

export default generalSlice.reducer;
