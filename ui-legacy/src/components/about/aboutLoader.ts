import { AxiosError } from "axios";

import api from "@/api";
import { updateAboutContent, updateCV } from "@/store/generalSlice.ts";
import { AppDispatch } from "@/store/store.ts";

export const aboutContentLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.home.about();
    const { data } = res;
    dispatch(
      updateAboutContent({
        data: res.data,
        loaded: true,
      }),
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.message);
    }
    return e;
  }
};

export const cvLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.cv.all();
    const { data } = res;
    dispatch(
      updateCV({
        data: res.data,
        loaded: true,
      }),
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.message);
    }
    return e;
  }
};
