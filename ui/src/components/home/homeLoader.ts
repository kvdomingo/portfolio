import { AxiosError } from "axios";

import api from "@/api";
import {
  updateHomeContent,
  updateHomeTechnologies,
} from "@/store/generalSlice.ts";
import { AppDispatch } from "@/store/store.ts";

export const whatIDoLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.home.content();
    const { data } = res;
    dispatch(
      updateHomeContent({
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

export const howIDoItLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.home.technologies();
    const { data } = res;
    dispatch(
      updateHomeTechnologies({
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
