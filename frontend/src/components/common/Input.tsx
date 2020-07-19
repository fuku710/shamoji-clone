import styled from "styled-components";

import { GRAY_2 } from "./Colors";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const InputLabel = styled.label`
  font-size: 1.2em;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  min-width: 240px;
  height: 24px;
  color: ${GRAY_2};
  outline: none;
  border: 2px solid ${GRAY_2};
  border-radius: 8px;
  padding: 4px;
`;
