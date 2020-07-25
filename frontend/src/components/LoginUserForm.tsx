import * as React from "react";
import { InputUsername } from "./InputUsername";
import { InputPassword } from "./InputPassword";
import { Button } from "./common/Button";
import { Form } from "./common/Form";

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
    <Form onSubmit={props.onSubmit}>
      <InputUsername username={props.username} onChange={handleChangeUsername} />
      <InputPassword password={props.password} onChange={handleChangePassword} />
      <Button>ログイン</Button>
    </Form>
  );
};
