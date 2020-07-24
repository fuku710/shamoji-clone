import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  to?: string;
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  text: string;
};

export const HeaderMenuItem: React.FC<Props> = (props) => {
  return (
    <MenuItem onClick={props.onClick}>
      <MenuListLink to={props.to}>{props.text}</MenuListLink>
    </MenuItem>
  );
};

const MenuItem = styled.li`
  width: 120px;
  height: 100%;
  list-style: none;
  transition: 200ms;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.main2};
  }
`;

const MenuListLink = styled(Link)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
