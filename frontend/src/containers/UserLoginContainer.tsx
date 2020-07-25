import * as React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext, UserStore } from "../stores/user";
import { LoginUserForm } from "../components/LoginUserForm";
import { apiClient } from "../api";
import { Heading } from "../components/common/Heading";

type Error = {
  field?: string;
  message: string;
};

export const UserLoginContainer: React.FC = () => {
  const { dispatch } = useContext<UserStore>(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);
  const [loginError, setLoginError] = useState<string>(null);
  const history = useHistory();

  const login = async () => {
    const response: Response = await apiClient("/auth", "POST", {
      json: { username, password },
    });
    if (response.status === 200) {
      const accessToken: string = (await response.json()).access_token;
      dispatch({ type: "LOGIN", payload: accessToken });
      history.push("/");
    } else {
      setLoginError("ログインに失敗しました");
    }
  };

  const validateInput = (): Error[] => {
    const errors: Error[] = [];
    if (!username) {
      errors.push({
        field: "username",
        message: "ユーザー名が入力されていません",
      });
    }
    if (!password) {
      errors.push({
        field: "password",
        message: "パスワードが入力されていません",
      });
    }
    return errors;
  };

  const handleChangeLoginForm = (input: { username: string; password: string }) => {
    setUsername(input.username);
    setPassword(input.password);
  };

  const handleSubmitLoginForm = (e: React.FormEvent) => {
    const errors: Error[] = validateInput();
    setErrors(errors);
    setLoginError(null);
    if (errors.length === 0) {
      login();
    }
    e.preventDefault();
  };

  return (
    <>
      <Heading>ログイン</Heading>
      <LoginUserForm username={username} password={password} onChange={handleChangeLoginForm} onSubmit={handleSubmitLoginForm} />
      <div style={{ color: "red" }}>{loginError}</div>
      <div style={{ color: "red" }}>
        {errors.map((error) => (
          <div key={error.field}>{error.message}</div>
        ))}
      </div>
    </>
  );
};
