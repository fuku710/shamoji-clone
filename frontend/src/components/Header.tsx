import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { HeaderMenu } from "./HeaderMenu";
import { HeaderMenuItem } from "./HeaderMenuItem";

import { UserContext, UserStore } from "../stores/user";
import { MAIN, WHITE } from "./common/Colors";

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
        {isLoggedIn ? (
          <HeaderMenu>
            <HeaderMenuItem to="/emoji/new" text="絵文字登録" />
            <HeaderMenuItem onClick={logout} text="ログアウト" />
          </HeaderMenu>
        ) : (
          <HeaderMenu>
            <HeaderMenuItem to="/register" text="ユーザー登録" />
            <HeaderMenuItem to="/login" text="ログイン" />
          </HeaderMenu>
        )}
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
