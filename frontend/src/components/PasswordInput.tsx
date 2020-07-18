import * as React from "react";

type Props = {
  password: string;
  onChange?: any;
};

export const PasswordInput: React.FC<Props> = (props) => {
  return (
    <div>
      <label>パスワード</label>
      <input type="password" value={props.password} onChange={props.onChange} />
    </div>
  );
};
