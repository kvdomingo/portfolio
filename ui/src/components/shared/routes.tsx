import { RouteObject, createBrowserRouter } from "react-router-dom";

import loadable from "@loadable/component";

import {
  aboutContentLoader,
  cvLoader,
} from "@/components/about/aboutLoader.ts";
import {
  courseLoader,
  coursesLoader,
  postLoader,
} from "@/components/coursework/courseworkLoader.ts";
import { devLoader } from "@/components/dev/devLoader.ts";
import { howIDoItLoader, whatIDoLoader } from "@/components/home/homeLoader.ts";
import {
  clientsLoader,
  galleryLoader,
} from "@/components/photography/photographyLoader.ts";
import { AppDispatch } from "@/store/store.ts";

const Home = loadable(() => import("@/components/home"));
const About = loadable(() => import("@/components/about"));
const Photography = loadable(() => import("../photography"));
const Gallery = loadable(() => import("../photography/Gallery.tsx"));
const Dev = loadable(() => import("../dev"));
const Coursework = loadable(() => import("@/components/coursework"));
const Course = loadable(() => import("../coursework/Course.tsx"));
const Post = loadable(() => import("../coursework/Post.tsx"));

const createRoutes: (dispatch: AppDispatch) => RouteObject[] = dispatch => [
  {
    path: "/",
    element: <Home />,
    loader: async () =>
      await Promise.allSettled([
        whatIDoLoader(dispatch),
        howIDoItLoader(dispatch),
      ]),
  },
  {
    path: "/about",
    element: <About />,
    loader: async () =>
      await Promise.allSettled([
        aboutContentLoader(dispatch),
        cvLoader(dispatch),
      ]),
  },
  {
    path: "/photography",
    element: <Photography />,
    children: [
      {
        path: "",
        index: true,
        element: <Gallery />,
        loader: async () => await galleryLoader(dispatch, "latest"),
      },
      {
        path: ":gallerySlug",
        element: <Gallery />,
        loader: async ({ params }) => {
          if (params.gallerySlug === "clients") {
            return await clientsLoader(dispatch);
          }
          return await galleryLoader(dispatch, params.gallerySlug ?? "latest");
        },
        children: [
          {
            path: ":clientSlug",
            element: <Gallery />,
            loader: async ({ params }) => {
              return await galleryLoader(
                dispatch,
                params.clientSlug ?? "",
                true,
              );
            },
          },
        ],
      },
    ],
  },
  {
    path: "/dev",
    element: <Dev />,
    loader: async () => await devLoader(dispatch),
  },
  {
    path: "/svip",
    loader: async () => await coursesLoader(dispatch),
    children: [
      {
        path: "",
        index: true,
        element: <Coursework />,
      },
      {
        path: ":courseSlug",
        children: [
          {
            path: "",
            index: true,
            element: <Course />,
            loader: async ({ params }) =>
              await courseLoader(dispatch, params.courseSlug ?? ""),
          },
          {
            path: ":postSlug",
            element: <Post />,
            loader: async ({ params }) =>
              await postLoader(params.postSlug ?? ""),
          },
        ],
      },
    ],
  },
];

const createRouter = (dispatch: AppDispatch) =>
  createBrowserRouter(createRoutes(dispatch));

export default createRouter;
