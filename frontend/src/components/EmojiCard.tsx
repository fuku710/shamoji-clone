import * as React from "react";

export type EmojiCardProps = {
  name: string;
  user: string;
  imageBase64: string;
};

export const EmojiCard: React.FC<EmojiCardProps> = (props) => {
  const imageUrl = `data:image/jpeg;base64,${props.imageBase64}`;
  return (
    <div>
      <img width="64" height="64" src={imageUrl} />
      <div>:{props.name}:</div>
      <div>{props.user}</div>
    </div>
  );
};
