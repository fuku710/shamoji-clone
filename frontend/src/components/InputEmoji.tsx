import * as React from "react";
import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  onChange: any;
};

export const InputEmoji: React.FC<Props> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>(null);

  const handleChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataUrl = e.target.result as string;
      setImageUrl(dataUrl);
    };
  };

  const handleChange = () => {
    props.onChange();
  };

  return (
    <div>
      <Cropper
        src={imageUrl}
        style={{ height: 300, width: 300 }}
        aspectRatio={1}
        movable={false}
        zoomable={false}
        minCropBoxWidth={32}
        minCropBoxHeight={32}
        ready={props.onChange}
        cropend={props.onChange}
      />
      <input type="file" onChange={handleChangeInputFile}></input>
    </div>
  );
};
