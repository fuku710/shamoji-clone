import * as React from "react";
import { InputEmoji } from "./InputEmoji";
import { InputName } from "./InputName";

type Props = {
  name: string;
  dataUrl: string;
  onChangeName?: Function;
  onChangeDataUrl?: Function;
  onSubmit?: any;
};
export const RegisterEmojiForm: React.FC<Props> = (props) => {
  const handleChangeEmoji = (e: any) => {
    const cropper: Cropper = e.target.cropper;
    const dataUrl = cropper
      .getCroppedCanvas({ width: 128, height: 128 })
      .toDataURL();
    props.onChangeDataUrl(dataUrl);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    props.onChangeName(name);
  };
  return (
    <form onSubmit={props.onSubmit}>
      <InputEmoji onChange={handleChangeEmoji} />
      <InputName name={props.name} onChange={handleChangeName} />
      <button>送信</button>
    </form>
  );
};
