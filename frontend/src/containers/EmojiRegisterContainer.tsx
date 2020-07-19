import * as React from "react";
import { useState, useContext } from "react";

import { apiClient } from "../api";
import { UserContext, UserStore } from "../stores/user";
import { RegisterEmojiForm } from "../components/RegisterEmojiForm";

type vError = {
  field?: string;
  message: string;
};

export const EmojiRegisterContainer: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>(null);
  const [vErrors, setVErrors] = useState<vError[]>([]);
  const [registerError, setRegisterError] = useState<string>(null);
  const { state } = useContext<UserStore>(UserContext);

  const validateInput = (): boolean => {
    const errors: vError[] = [];
    if (!name) {
      errors.push({ field: "name", message: "名前が入力されていません" });
    }
    if (!dataUrl) {
      errors.push({ field: "dataUrl", message: "画像が選択されていません" });
    }
    setVErrors(errors);
    return errors.length === 0;
  };

  const sendEmoji = async () => {
    const response = await apiClient("/emojis", "POST", {
      accessToken: state.accessToken,
      json: { name, dataUrl },
    });
    if (response.status !== 201) {
      setRegisterError("登録に失敗しました");
    }
  };

  const handleSubmitEmojiForm = (e: React.FormEvent) => {
    setRegisterError(null);
    if (validateInput()) sendEmoji();
    e.preventDefault();
  };

  return (
    <>
      <h2>絵文字登録</h2>
      <RegisterEmojiForm
        name={name}
        dataUrl={dataUrl}
        onChangeName={setName}
        onChangeDataUrl={setDataUrl}
        onSubmit={handleSubmitEmojiForm}
      />
      <div style={{ color: "red" }}>
        {vErrors.map((vError) => (
          <div key={vError.field}>{vError.message}</div>
        ))}
        <div>{registerError}</div>
      </div>
    </>
  );
};
