import { createContext } from "react";

type Auth = {
  username: string;
  password: string;
};

type User = {
  username: string;
}

type State = {
  auth: Auth;
  user: User;
  accessToken: string;
};

type Action =
  | { type: "LOGIN"; payload: Auth }
  | { type: "LOGIN_SUCCEED"; payload: string }
  | { type: "LOGIN_FAILED" }
  | { type: "LOGOUT" }
  | { type: "SET_ACCESS_TOKEN"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }

export const initialState: State = {
  auth: {
    username: null,
    password: null,
  },
  user: {
    username: null,
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
          username: null,
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
      removeAccessToken()
      return {
        ...state,
        auth: {
          username: null,
          password: null,
        },
        accessToken: null,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      }
    case "SET_USERNAME":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload
        },
      }
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state;
  }
};

export const persistAccessToken = (accessToken: string) => {
  window.localStorage.setItem('accessToken', accessToken)
}

export const removeAccessToken = () => {
  window.localStorage.removeItem('accessToken')
}

export const AuthContext = createContext(undefined!);