import { createContext, useReducer } from "react";

const initialState = {
  login: null,
  isDPS: null,
  penaltys: null,
  cars: null,
  licenseNumber: null,
  activity: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_USER":
      const { login, isDPS, penaltys, cars, licenseNumber } = payload;
      return { ...state, login, isDPS, penaltys, cars, licenseNumber };
    case "RESET_USER":
      return initialState;
    case "SET_ACTIVITY":
      return { ...state, activity: state.activity + 1 };
    default:
      return state;
  }
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const value = useReducer(reducer, initialState);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
