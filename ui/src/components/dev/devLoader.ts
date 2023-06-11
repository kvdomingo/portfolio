import { AxiosError } from "axios";

import api from "@/api";
import { updateProjects } from "@/store/devSlice.ts";
import { AppDispatch } from "@/store/store.ts";

export const devLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.dev.projects();
    const { data } = res;
    dispatch(
      updateProjects({
        data,
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
