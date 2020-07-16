import * as React from "react";
import { useState } from "react";

export const UserRegisterContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    if (username && password) {
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
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
        <button onClick={() => registerUser()}>ログイン</button>
      </form>
    </>
  );
};
