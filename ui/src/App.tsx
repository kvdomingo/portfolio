import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import AOS from "aos";

import FullPageLoading from "@/components/shared/FullPageLoading.tsx";
import createRouter from "@/components/shared/routes";
import { useDispatch } from "@/store/hooks.ts";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const router = createRouter(dispatch);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    <RouterProvider router={router} fallbackElement={<FullPageLoading />} />
  );
}
