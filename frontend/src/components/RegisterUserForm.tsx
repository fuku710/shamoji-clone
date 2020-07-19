import * as React from "react";
import { InputPassword } from "./InputPassword";
import { InputUsername } from "./InputUsername";
import { Button } from "./common/Button";
import { Form } from "./common/Form";

type Props = {
  username: string;
  password: string;
  confPassword: string;
  onChangeUsername?: Function;
  onChangePassword?: Function;
  onChangeConfPassword?: Function;
  onSubmit?: any;
};
export const RegisterUserForm: React.FC<Props> = (props) => {
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    props.onChangeUsername(name);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    props.onChangePassword(password);
  };
  const handleChangeConfPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    props.onChangeConfPassword(password);
  };
  return (
    <Form onSubmit={props.onSubmit}>
      <InputUsername
        username={props.username}
        onChange={handleChangeUsername}
      />
      <InputPassword
        password={props.password}
        onChange={handleChangePassword}
      />
      <InputPassword
        label="確認用パスワード"
        password={props.confPassword}
        onChange={handleChangeConfPassword}
      />
      <Button>登録</Button>
    </Form>
  );
};
