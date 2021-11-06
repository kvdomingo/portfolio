import { createContext, useReducer, useContext } from "react";

let CourseworkContext = createContext();

let initialState = {
  courses: {
    data: [],
    loaded: false,
  },
};

let reducer = (state, action) => {
  switch (action.type) {
    case "updateCourses": {
      return {
        ...state,
        courses: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

function CourseworkProvider(props) {
  let [courseworkState, courseworkDispatch] = useReducer(reducer, initialState);
  let value = { courseworkState, courseworkDispatch };

  return <CourseworkContext.Provider value={value}>{props.children}</CourseworkContext.Provider>;
}

let CourseworkConsumer = CourseworkContext.Consumer;
let useCourseworkContext = () => useContext(CourseworkContext);
let courseworkContextValue = {
  courseworkState: initialState,
  courseworkDispatch: reducer,
};

export { CourseworkContext, CourseworkProvider, CourseworkConsumer, useCourseworkContext, courseworkContextValue };
