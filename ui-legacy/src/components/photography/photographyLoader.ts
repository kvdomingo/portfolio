import { AxiosError } from "axios";

import api from "@/api";
import { updateClients, updateLatest } from "@/store/photographySlice.ts";
import { AppDispatch } from "@/store/store.ts";

export const clientsLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.photography.client();
    const { data } = res;
    dispatch(
      updateClients({
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

export const galleryLoader = async (
  dispatch: AppDispatch,
  slug: string,
  isClient = false,
) => {
  let res;

  try {
    if (isClient) {
      res = await api.photography.clients(slug);
    } else {
      res = await api.photography.gallery(slug);
    }
    const { data } = res;
    dispatch(
      updateLatest({
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
