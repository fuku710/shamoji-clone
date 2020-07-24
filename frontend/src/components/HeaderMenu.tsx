import * as React from "react";
import styled from "styled-components";

type Props = {};

export const HeaderMenu: React.FC<Props> = (props) => {
  return <Menu>{props.children}</Menu>;
};

const Menu = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
`;
