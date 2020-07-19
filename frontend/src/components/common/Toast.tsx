import styled from "styled-components";
import { MAIN, WHITE } from "./Colors";

export const Toast = styled.div`
  color: ${WHITE};
  background: ${MAIN};
  border: solid 2px;
  border-radius: 8px;
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 8px 16px;
  width: 320px;
  font-size: 1.2em;
  transition: 200ms;
  text-align: center;
  z-index: 1;
`;
