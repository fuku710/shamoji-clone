import styled from "styled-components";

import { GRAY_2 } from "./Colors";

export const Button = styled.button`
  outline: none;
  background: none;
  border: solid 2px;
  border-radius: 8px;
  font-size: 1.2em;
  min-width: 120px;
  padding: 4px 0px;
  color: ${GRAY_2};
  transition: 200ms;
  cursor: pointer;
  :hover {
    background: ${GRAY_2};
    border: solid 2px ${GRAY_2};
    color: white;
  }
`;
