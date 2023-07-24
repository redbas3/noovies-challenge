import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { makeImgPath } from "../utils";

const SCoin = styled.TouchableOpacity`
  background-color: ${colors.boxColor};
  border-radius: 4px;
  display: flex;
  width: 31%;
  margin: 1%;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Text = styled.Text`
  color: ${colors.textColor};
  margin-top: 8px;
`;

const Coin = ({ symbol, name, fullData }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "CoinDetail",
      params: {
        ...fullData,
      },
    });
  };

  return (
    <SCoin onPress={goToDetail}>
      <Image source={{ uri: makeImgPath(symbol) }}></Image>
      <Text>{name}</Text>
    </SCoin>
  );
};

export default Coin;
