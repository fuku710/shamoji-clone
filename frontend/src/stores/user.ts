import { createContext, Dispatch } from "react";

type User = {
  id: number;
  username: string;
};

type State = {
  user: User;
  accessToken: string;
};

type Action =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER_INFO"; payload: User };

export const initialState: State = {
  user: null,
  accessToken: null,
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      persistAccessToken(action.payload);
      return {
        ...state,
        accessToken: action.payload,
      };
    case "LOGOUT":
      removeAccessToken();
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const persistAccessToken = (accessToken: string) => {
  window.localStorage.setItem("accessToken", accessToken);
};

const removeAccessToken = () => {
  window.localStorage.removeItem("accessToken");
};

export type UserStore = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const UserContext = createContext<UserStore>({} as UserStore);
