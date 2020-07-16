import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/auth";

type Props = {
  title: String;
};

export const Header: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const isLoggedIn = !!state.accessToken;
  return (
    <header>
      <Link to="/">
        <h1>{props.title}</h1>
      </Link>
      <div>{isLoggedIn && state.auth.username}</div>
      {isLoggedIn ? (
        <>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>ログアウト</button>
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
