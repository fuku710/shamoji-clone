import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext, UserStore } from "../stores/user";

type Props = {
  title: String;
};

export const Header: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext<UserStore>(UserContext);
  const isLoggedIn = state.accessToken && state.user;
  return (
    <header>
      <Link to="/">
        <h1>{props.title}</h1>
      </Link>
      <div>{isLoggedIn && state.user.username}</div>
      {isLoggedIn ? (
        <>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>
            ログアウト
          </button>
          <Link to="/emoji/new">絵文字登録</Link>
        </>
      ) : (
        <>
          <Link to="/login">ログイン</Link>
          <Link to="/register">ユーザー登録</Link>
        </>
      )}
    </header>
  );
};
