import { createContext, useReducer, useContext } from "react";

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
    education: {
      data: [],
      loaded: false,
    },
    work: {
      data: [],
      loaded: false,
    },
    certifications: {
      data: [],
      scripts: [],
      loaded: false,
    },
    projects: {
      data: [],
      loaded: false,
    },
    publications: {
      data: [],
      loaded: false,
    },
    references: {
      data: [],
      loaded: false,
    },
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
    case "updateCVEducation": {
      return {
        ...state,
        cv: {
          ...state.cv,
          education: action.payload,
        },
      };
    }
    case "updateCVWork": {
      return {
        ...state,
        cv: {
          ...state.cv,
          work: action.payload,
        },
      };
    }
    case "updateCVCertifications": {
      return {
        ...state,
        cv: {
          ...state.cv,
          certifications: action.payload,
        },
      };
    }
    case "updateCVProjects": {
      return {
        ...state,
        cv: {
          ...state.cv,
          projects: action.payload,
        },
      };
    }
    case "updateCVPublications": {
      return {
        ...state,
        cv: {
          ...state.cv,
          publications: action.payload,
        },
      };
    }
    case "updateCVReferences": {
      return {
        ...state,
        cv: {
          ...state.cv,
          references: action.payload,
        },
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
