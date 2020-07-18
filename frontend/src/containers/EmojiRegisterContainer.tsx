import * as React from "react";
import { useState, useContext } from "react";

import { EmojiCrop } from "../components/EmojiCrop";
import { AuthContext } from "../contexts/auth";
import ReactCropper from "react-cropper";
import { apiClient } from "../api";

export const EmojiRegisterContainer: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>(null);
  const cropperEl = React.useRef<ReactCropper>();
  const { state } = useContext(AuthContext);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataUrl = e.target.result as string;
      setDataUrl(dataUrl);
    };
  };

  const handleClickButton = () => {
    const croppedDataUrl = getCroppedDataUrl(cropperEl.current);
    sendEmoji(name, croppedDataUrl);
  };

  const getCroppedDataUrl = (cropper: ReactCropper): string =>
    cropper.getCroppedCanvas({ width: 128, height: 128 }).toDataURL();

  const sendEmoji = async (name: string, dataUrl: string) => {
    await apiClient("/emojis", "POST", {
      accessToken: state.accessToken,
      json: { name, dataUrl },
    });
  };

  return (
    <>
      <EmojiCrop imageUrl={dataUrl} ref={cropperEl} />
      <form>
        <div>
          <label>画像</label>
          <input type="file" onChange={handleChangeInput}></input>
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
        <button type="button" onClick={handleClickButton}>
          送信
        </button>
      </form>
    </>
  );
};
