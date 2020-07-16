import * as React from "react";
import { useContext, useState } from "react";

import { AuthContext } from "../contexts/auth";

export const UserLoginContainer: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <h2>ログイン</h2>
      <form>
        <div>
          <label>ユーザー名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          onClick={() => {
            dispatch({
              type: "LOGIN",
              payload: { username, password },
            });
          }}
        >
          ログイン
        </button>
      </form>
    </>
  );
};
