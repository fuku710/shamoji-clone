import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { UserContext, UserStore } from "../stores/user";
import { MAIN, WHITE, GRAY_2 } from "./common/Colors";

type Props = {
  title: String;
};

export const Header: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext<UserStore>(UserContext);
  const isLoggedIn = state.accessToken && state.user;
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <HeaderContainer>
      <Title>
        <Link to="/">{props.title}</Link>
      </Title>
      <HeaderContainerItem>
        {isLoggedIn && (
          <UserNameIcon>
            <FontAwesomeIcon icon={faUser} size="lg" />
            <span>{state.user.username}</span>
          </UserNameIcon>
        )}
        <MenuList>
          {isLoggedIn ? (
            <>
              <MenuListItem>
                <Link to="/emoji/new">絵文字登録</Link>
              </MenuListItem>
              <MenuListItem onClick={logout}>
                <Link to="/">ログアウト</Link>
              </MenuListItem>
            </>
          ) : (
            <>
              <MenuListItem>
                <Link to="/register">ユーザー登録</Link>
              </MenuListItem>
              <MenuListItem>
                <Link to="/login">ログイン</Link>
              </MenuListItem>
            </>
          )}
        </MenuList>
      </HeaderContainerItem>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 48px;
  background: ${MAIN};
`;

const HeaderContainerItem = styled.div`
  display: flex;
  align-items: center;
`;

const UserNameIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100%;
  > * {
    color: ${WHITE};
  }
  > span {
    margin-left: 4px;
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-left: 8px;
  display: flex;
  font-size: 24px;
  align-items: center;
  cursor: default;
  a {
    color: ${WHITE};
    text-decoration: none;
  }
`;

const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const MenuListItem = styled.li`
  list-style: none;
  width: 120px;
  height: 100%;
  transition: 200ms;
  cursor: pointer;
  :hover {
    background: ${GRAY_2};
  }
  a {
    width: 100%;
    height: 100%;
    color: ${WHITE};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 32,
  color: "white",
  width: 320,
  height: 64,
  margin: "16 24 16 0",
  float: "left",
};

const usernameStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 16,
  color: "white",
  width: 320,
  height: 64,
  margin: "16 24 16 0",
  float: "left",
};
