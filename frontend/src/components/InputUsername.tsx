import * as React from "react";
import { InputWrapper, InputLabel, Input } from "./common/Input";

type Props = {
  username: string;
  onChange?: any;
};

export const InputUsername: React.FC<Props> = (props) => {
  return (
    <InputWrapper>
      <InputLabel>ユーザー名</InputLabel>
      <Input type="text" value={props.username} onChange={props.onChange} />
    </InputWrapper>
  );
};
