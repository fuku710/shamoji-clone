import * as React from "react";
import { useState } from "react";
import { apiClient } from "../api";
import { RegisterUserForm } from "../components/RegisterUserForm";
import { Heading } from "../components/common/Heading";

type vError = {
  field?: string;
  message: string;
};

export const UserRegisterContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [vErrors, setVErrors] = useState<vError[]>([]);
  const [registerError, setRegisterError] = useState<string>(null);

  const validateInput = (): boolean => {
    const errors: vError[] = [];
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
    } else if (password.length < 8) {
      errors.push({
        field: "password",
        message: "パスワードは8文字以上で入力してください",
      });
    }
    if (password !== confPassword) {
      errors.push({
        field: "confPassword",
        message: "確認用パスワードが一致しません",
      });
    }
    setVErrors(errors);
    return errors.length === 0;
  };

  const registerUser = async () => {
    const response = await apiClient("/register", "POST", {
      json: { username, password },
    });
    if (response.status !== 201) {
      setRegisterError("ユーザー登録に失敗しました");
    }
  };

  const handleSubmitRegisterUserForm = (e: React.FormEvent) => {
    setRegisterError(null);
    if (validateInput()) registerUser();
    e.preventDefault();
  };

  return (
    <>
      <Heading>ユーザー登録</Heading>
      <RegisterUserForm
        username={username}
        password={password}
        confPassword={confPassword}
        onChangeUsername={setUsername}
        onChangePassword={setPassword}
        onChangeConfPassword={setConfPassword}
        onSubmit={handleSubmitRegisterUserForm}
      />
      <div style={{ color: "red" }}>
        {vErrors.map((vError) => (
          <div key={vError.field}>{vError.message}</div>
        ))}
        <div>{registerError}</div>
      </div>
    </>
  );
};
