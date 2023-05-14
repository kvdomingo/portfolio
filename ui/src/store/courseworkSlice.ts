import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseMetadata, CourseworkPostMetadata } from "../types/coursework";
import { RootState } from "./store";

interface DataLoadedState<T> {
  data: T;
  loaded: boolean;
}

interface CourseworkState {
  courses: DataLoadedState<CourseMetadata[]>;
  posts: DataLoadedState<CourseworkPostMetadata[]>;
}

const initialState: CourseworkState = {
  courses: {
    data: [],
    loaded: false,
  },
  posts: {
    data: [],
    loaded: false,
  },
};

export const courseworkSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {
    updateCourses: (
      state,
      action: PayloadAction<DataLoadedState<CourseMetadata[]>>,
    ) => {
      state.courses = action.payload;
    },
    updatePosts: (
      state,
      action: PayloadAction<DataLoadedState<CourseworkPostMetadata[]>>,
    ) => {
      state.posts = action.payload;
    },
  },
});

export const { updateCourses, updatePosts } = courseworkSlice.actions;

export const selectCourses = (state: RootState) => state.coursework.courses;

export const selectPosts = (state: RootState) => state.coursework.posts;

export default courseworkSlice.reducer;
