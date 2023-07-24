import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { makeChangeString, makeImgPath } from "../utils";

const SPrice = styled.View`
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1%;
  height: 70px;
  padding: 0 10px;
`;

const LeftWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightWrap = styled.View`
  align-items: flex-end;
`;

const LeftWrapText = styled.Text`
  margin-left: 10px;
  color: ${colors.textColor};
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Text = styled.Text`
  color: ${colors.textColor};
  margin-top: 8px;
`;

const Price = ({ symbol, name, price, change }) => {
  return (
    <SPrice>
      <LeftWrap>
        <Image source={{ uri: makeImgPath(symbol) }}></Image>
        <LeftWrapText>{name}</LeftWrapText>
      </LeftWrap>
      <RightWrap>
        <Text>${price}</Text>
        {makeChangeString(change)}
      </RightWrap>
    </SPrice>
  );
};

export default Price;
