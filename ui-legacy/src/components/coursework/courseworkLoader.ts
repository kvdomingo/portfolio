import { AxiosError } from "axios";

import api from "@/api";
import { updateCourses, updatePosts } from "@/store/courseworkSlice.ts";
import { AppDispatch } from "@/store/store.ts";
import { CourseworkPostMetadata } from "@/types/coursework.ts";

export const coursesLoader = async (dispatch: AppDispatch) => {
  let res;

  try {
    res = await api.svip.courses();
    const { data } = res;
    dispatch(
      updateCourses({
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

export const courseLoader = async (dispatch: AppDispatch, slug: string) => {
  let res;

  try {
    res = await api.svip.blogPost("subject__slug", slug);
    const { data } = res;
    dispatch(
      updatePosts({
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

export const postLoader = async (
  slug: string,
): Promise<CourseworkPostMetadata | AxiosError> => {
  let res;

  try {
    res = await api.svip.blogPost("slug", slug);
    const { data } = res;
    return await Promise.resolve(data[0]);
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.message);
    }
    return await Promise.reject(null);
  }
};
