import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { WHITE, GRAY_2 } from "./common/Colors";

export type EmojiCardProps = {
  name: string;
  user: string;
  imageUrl: string;
};

export const EmojiCard: React.FC<EmojiCardProps> = (props) => {
  return (
    <Card>
      <ImageLink href={props.imageUrl} download={props.name}>
        <IconWrapper>
          <FontAwesomeIcon icon={faDownload} size="2x" />
        </IconWrapper>
        <img width="64" height="64" src={props.imageUrl} />
      </ImageLink>
      <CardLabel>:{props.name}:</CardLabel>
      <CardLabelBottom>{props.user}</CardLabelBottom>
    </Card>
  );
};

const IconWrapper = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 400ms;
  :hover {
    opacity: 1;
  }
  > * {
    color: ${WHITE};
    opacity: 0.8;
  }
`;

const Card = styled.div`
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${WHITE};
`;

const CardLabel = styled.div`
  color: ${GRAY_2};
  font-size: 1.4em;
  margin: auto;
`;

const CardLabelBottom = styled(CardLabel)`
  font-size: 1em;
  padding-bottom: 20px;
`;

const ImageLink = styled.a`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
