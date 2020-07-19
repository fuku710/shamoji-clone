import * as React from "react";
import styled from "styled-components";
import { EmojiCard } from "./EmojiCard";
import { Emoji } from "../types";

type EmojiCardListProps = {
  emojis: Emoji[];
};

export const EmojiCardList: React.FC<EmojiCardListProps> = (props) => {
  return (
    <CardList>
      {props.emojis.map((emoji) => (
        <EmojiCard
          name={emoji.name}
          user={emoji.user}
          imageUrl={emoji.dataUrl}
          key={emoji.id}
        />
      ))}
    </CardList>
  );
};

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  > *{
    margin: 8px;
  }
`;
