import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Linking, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

const SNewsRow = styled.View`
  background-color: ${colors.boxColor};
  border-radius: 8px;
  display: flex;
  margin: 6px 10px;
  padding: 12px;
`;

const BottomWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
`;

const BottomLeftWrap = styled.View`
  flex-direction: row;
`;

const BottomLeftWrapText = styled.Text`
  color: ${colors.textColor};
  margin-right: 10px;
`;

const Text = styled.Text`
  color: ${colors.textColor};
`;

const BtnText = styled.Text`
  color: hotpink;
`;

const NewsRow = ({ title, url, points, num_comments }) => {
  const openUrl = async (url) => {
    // await Linking.openURL(url);
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SNewsRow>
      <Text>{title}</Text>
      <BottomWrap>
        <BottomLeftWrap>
          <BottomLeftWrapText>👍🏻 {points}</BottomLeftWrapText>
          <Text>💬 {num_comments}</Text>
        </BottomLeftWrap>
        <TouchableOpacity onPress={() => openUrl(url)}>
          <BtnText>Read 👉</BtnText>
        </TouchableOpacity>
      </BottomWrap>
    </SNewsRow>
  );
};

export default NewsRow;
