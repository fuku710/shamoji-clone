import { createContext } from "react";

type Auth = {
  username: string;
  password: string;
};

type State = {
  auth: Auth;
  accessToken: string;
};

type Action =
  | { type: "LOGIN"; payload: Auth }
  | { type: "LOGIN_SUCCEED"; payload: string }
  | { type: "LOGIN_FAILED" }
  | { type: "LOGOUT" };

export const initialState: State = {
  auth: {
    username: null,
    password: null,
  },
  accessToken: null,
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGIN_SUCCEED":
      return {
        ...state,
        auth: {
          ...state.auth,
          password: null,
        },
        accessToken: action.payload,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        auth: {
          username: null,
          password: null,
        },
        accessToken: null,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: {
          username: null,
          password: null,
        },
        accessToken: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(undefined!);