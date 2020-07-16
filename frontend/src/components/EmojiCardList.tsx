import * as React from "react";
import { EmojiCard } from "./EmojiCard";
import { Emoji } from "../types";

type EmojiCardListProps = {
  emojis: Emoji[];
};

export const EmojiCardList: React.FC<EmojiCardListProps> = (props) => {
  return (
    <div>
      {props.emojis.map((emoji) => (
        <EmojiCard
          name={emoji.name}
          user={emoji.user}
          imageBase64={emoji.imageBase64}
          key={emoji.name}
        />
      ))}
    </div>
  );
};
