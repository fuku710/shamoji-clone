import * as React from "react";

export const EmojiRegisterContainer: React.FC = () => {
  return (
    <>
      <form>
        <div>
          <label>画像</label>
          <input type="file"></input>
        </div>
        <div>
          <label>名前</label>
          <input></input>
        </div>
      </form>
    </>
  );
};
