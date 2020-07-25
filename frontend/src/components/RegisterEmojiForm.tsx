import * as React from "react";
import { InputEmoji } from "./InputEmoji";
import { InputName } from "./InputName";
import { Button } from "./common/Button";
import { Form } from "./common/Form";

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
    const dataUrl = cropper.getCroppedCanvas({ width: 128, height: 128 }).toDataURL();
    props.onChangeDataUrl(dataUrl);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    props.onChangeName(name);
  };
  return (
    <Form onSubmit={props.onSubmit}>
      <InputEmoji onChange={handleChangeEmoji} />
      <InputName name={props.name} onChange={handleChangeName} />
      <Button>送信</Button>
    </Form>
  );
};
