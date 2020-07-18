import * as React from "react";
import { useState, useEffect } from "react";
import { EmojiCardList } from "../components/EmojiCardList";
import { Emoji } from "../types";
import { apiClient } from "../api";

export const EmojiListContainer: React.FC = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const response: Response = await apiClient("/emojis", "GET");
      const emojis: Emoji[] = await response.json();
      setEmojis(emojis);
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
