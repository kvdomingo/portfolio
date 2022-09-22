import { createContext, useContext, useReducer } from "react";

let GeneralContext = createContext();

let initialState = {
  home: {
    content: {
      data: {},
      loaded: false,
    },
    technologies: {
      data: {},
      loaded: false,
    },
  },
  about: {
    data: {},
    loaded: false,
  },
  cv: {
    education: [],
    work: [],
    certification: [],
    project: [],
    publication: [],
    reference: [],
  },
};

let reducer = (state, action) => {
  switch (action.type) {
    case "updateHomeContent": {
      return {
        ...state,
        home: {
          ...state.home,
          content: action.payload,
        },
      };
    }
    case "updateHomeTechnologies": {
      return {
        ...state,
        home: {
          ...state.home,
          technologies: action.payload,
        },
      };
    }
    case "updateAbout": {
      return {
        ...state,
        about: action.payload,
      };
    }
    case "updateCV": {
      return {
        ...state,
        cv: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

function GeneralProvider(props) {
  let [generalState, generalDispatch] = useReducer(reducer, initialState);
  let value = { generalState, generalDispatch };

  return <GeneralContext.Provider value={value}>{props.children}</GeneralContext.Provider>;
}

let GeneralConsumer = GeneralContext.Consumer;
let useGeneralContext = () => useContext(GeneralContext);
let generalContextValue = {
  generalState: initialState,
  generalDispatch: reducer,
};

export { GeneralContext, GeneralProvider, GeneralConsumer, useGeneralContext, generalContextValue };
