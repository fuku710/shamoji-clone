import * as ReactDOM from "react-dom";
import * as React from "react";
import { useReducer, useEffect, createContext } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { EmojiListContainer } from "./containers/EmojiListContainer";
import { UserLoginContainer } from "./containers/UserLoginContainer";
import { Header } from "./components/Header";
import { UserRegisterContainer } from "./containers/UserRegisterContainer";
import {
  reducer,
  initialState,
  AuthContext,
  persistAccessToken,
} from "./contexts/auth";
import { EmojiRegisterContainer } from "./containers/EmojiRegisterContainer";
import { apiClient } from "./api";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const response: Response = await apiClient("/user", "GET", {
        accessToken: state.accessToken,
      });
      const username: string = (await response.json()).username;
      dispatch({ type: "SET_USERNAME", payload: username });
    };

    const localStorageAccessToken = window.localStorage.getItem("accessToken");
    if (state.accessToken) {
      persistAccessToken(state.accessToken);
    } else if (!state.accessToken && localStorageAccessToken) {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: localStorageAccessToken });
    }

    if (state.accessToken && !state.auth.username) {
      fetchUser();
    }
  }, [state.accessToken]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Header title="Shamoji@Clone" />
        <Switch>
          <Route path="/register">
            <UserRegisterContainer />
          </Route>
          <Route path="/login">
            <UserLoginContainer />
          </Route>
          <Route path="/emoji/new">
            <EmojiRegisterContainer />
          </Route>
          <Route path="/emoji">
            <EmojiListContainer />
          </Route>
          <Route path="/">
            <EmojiListContainer />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
