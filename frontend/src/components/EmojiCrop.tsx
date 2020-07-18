import * as React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  imageUrl: string;
};

const EmojiCropRenderFn: React.ForwardRefRenderFunction<Cropper, Props> = (
  props,
  ref
) => {
  return (
    <Cropper
      ref={ref}
      src={props.imageUrl}
      style={{ height: 300, width: 300 }}
      aspectRatio={1}
      movable={false}
      zoomable={false}
      minCropBoxWidth={32}
      minCropBoxHeight={32}
    />
  );
};

export const EmojiCrop = React.forwardRef(EmojiCropRenderFn);
