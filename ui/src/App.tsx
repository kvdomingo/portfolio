import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import AOS from "aos";
import { block } from "million/react";

import FullPageLoading from "@/components/shared/FullPageLoading.tsx";
import createRouter from "@/components/shared/routes";
import { useDispatch } from "@/store/hooks.ts";

import "./App.css";

const App = block(() => {
  const dispatch = useDispatch();
  const router = createRouter(dispatch);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    <RouterProvider router={router} fallbackElement={<FullPageLoading />} />
  );
});

export default App;
