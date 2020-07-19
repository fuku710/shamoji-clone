import * as ReactDOM from "react-dom";
import * as React from "react";
import { useReducer, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { EmojiListContainer } from "./containers/EmojiListContainer";
import { UserLoginContainer } from "./containers/UserLoginContainer";
import { UserRegisterContainer } from "./containers/UserRegisterContainer";
import { EmojiRegisterContainer } from "./containers/EmojiRegisterContainer";

import { Header } from "./components/Header";

import { reducer, initialState, UserContext } from "./stores/user";
import { apiClient } from "./api";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const response: Response = await apiClient("/user", "GET", {
        accessToken: state.accessToken,
      });
      const user = await response.json();
      dispatch({ type: "SET_USER_INFO", payload: user });
    };

    const localStorageAccessToken = window.localStorage.getItem("accessToken");
    if (localStorageAccessToken && !state.accessToken) {
      dispatch({ type: "LOGIN", payload: localStorageAccessToken });
    }

    if (state.accessToken) {
      fetchUser();
    }
  }, [state.accessToken]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
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
    </UserContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
