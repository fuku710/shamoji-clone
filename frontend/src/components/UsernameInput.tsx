import * as React from "react";

type Props = {
  username: string;
  onChange?: any;
};

export const UsernameInput: React.FC<Props> = (props) => {
  return (
    <div>
      <label>ユーザー名</label>
      <input type="text" value={props.username} onChange={props.onChange} />
    </div>
  );
};
