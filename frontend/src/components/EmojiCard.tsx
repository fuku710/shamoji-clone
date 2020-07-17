import * as React from "react";

export type EmojiCardProps = {
  name: string;
  user: string;
  imageUrl: string;
};

export const EmojiCard: React.FC<EmojiCardProps> = (props) => {
  return (
    <div>
      <img width="64" height="64" src={props.imageUrl} />
      <div>:{props.name}:</div>
      <div>{props.user}</div>
    </div>
  );
};
