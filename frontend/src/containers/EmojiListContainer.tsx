import * as React from "react";
import { useState, useEffect } from "react";
import { EmojiCardList } from "../components/EmojiCardList";
import { Emoji } from "../types";

export const EmojiListContainer: React.FC = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const response: Response = await fetch("http://localhost:5000/emojis");
      const data: { emojis: Emoji[] } = await response.json();
      setEmojis(data.emojis);
    };

    fetchEmojis();
  }, []);

  return (
    <>
      <h2>emoji 一覧</h2>
      <div>
        <EmojiCardList emojis={emojis} />
      </div>
    </>
  );
};
