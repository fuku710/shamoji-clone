import * as React from "react";

type Props = {
  name: string;
  onChange?: any;
};

export const InputName: React.FC<Props> = (props) => {
  return (
    <div>
      <label>名前</label>
      <input type="text" value={props.name} onChange={props.onChange} />
    </div>
  );
};
