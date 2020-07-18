import * as React from "react";
import { useState } from "react";
import { apiClient } from "../api";

export const UserRegisterContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    if (username && password) {
      await apiClient("/register", "POST", { json: { username, password } });
    }
  };

  return (
    <>
      <h2>ユーザー登録</h2>
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
        <button type="button" onClick={() => registerUser()}>
          ユーザー登録
        </button>
      </form>
    </>
  );
};
