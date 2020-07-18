import * as React from "react";
import { InputUsername } from "./InputUsername";
import { InputPassword } from "./InputPassword";

type Props = {
  username: string;
  password: string;
  onChange?: Function;
  onSubmit?: any;
};

export const LoginUserForm: React.FC<Props> = (props) => {
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    props.onChange({ username, password: props.password });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    props.onChange({ password, username: props.username });
  };
  return (
    <form onSubmit={props.onSubmit}>
      <InputUsername
        username={props.username}
        onChange={handleChangeUsername}
      />
      <InputPassword
        password={props.password}
        onChange={handleChangePassword}
      />
      <button>ログイン</button>
    </form>
  );
};
