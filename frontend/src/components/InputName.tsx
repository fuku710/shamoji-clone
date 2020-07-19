import * as React from "react";
import { InputWrapper, InputLabel, Input } from "./common/Input";

type Props = {
  name: string;
  onChange?: any;
};

export const InputName: React.FC<Props> = (props) => {
  return (
    <InputWrapper>
      <InputLabel>名前</InputLabel>
      <Input type="text" value={props.name} onChange={props.onChange} />
    </InputWrapper>
  );
};
