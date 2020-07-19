import * as React from "react";
import { InputWrapper, InputLabel, Input } from "./common/Input";

type Props = {
  password: string;
  label?: string;
  onChange?: any;
};

export const InputPassword: React.FC<Props> = (props) => {
  return (
    <InputWrapper>
      <InputLabel>{props.label || "パスワード"}</InputLabel>
      <Input type="password" value={props.password} onChange={props.onChange} />
    </InputWrapper>
  );
};
