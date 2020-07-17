import * as React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";

export const EmojiRegisterContainer: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>("");
  const { state } = useContext(AuthContext);

  const inputFilesHandler = (files: FileList) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataUrl = e.target.result as string;
      setDataUrl(dataUrl);
    };
  };

  const sendEmoji = async () => {
    await fetch("http://localhost:5000/emojis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${state.accessToken}`,
      },
      body: JSON.stringify({ name, dataUrl }),
    });
  };

  return (
    <>
      <form>
        <div>
          <label>画像</label>
          <input
            type="file"
            onChange={(e) => inputFilesHandler(e.target.files)}
          ></input>
        </div>
        <div>
          <label>名前</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <button onClick={sendEmoji}>送信</button>
      </form>
    </>
  );
};
