import * as React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { apiClient } from "../api";
import { UserContext, UserStore } from "../stores/user";
import { RegisterEmojiForm } from "../components/RegisterEmojiForm";
import { Heading } from "../components/common/Heading";

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
  const history = useHistory();

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
    } else {
      history.push("/");
    }
  };

  const handleSubmitEmojiForm = (e: React.FormEvent) => {
    setRegisterError(null);
    if (validateInput()) sendEmoji();
    e.preventDefault();
  };

  return (
    <>
      <Heading>絵文字登録</Heading>
      <RegisterEmojiForm name={name} dataUrl={dataUrl} onChangeName={setName} onChangeDataUrl={setDataUrl} onSubmit={handleSubmitEmojiForm} />
      <div style={{ color: "red" }}>
        {vErrors.map((vError) => (
          <div key={vError.field}>{vError.message}</div>
        ))}
        <div>{registerError}</div>
      </div>
    </>
  );
};
