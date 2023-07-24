import { useQuery } from "react-query";
import React, { useEffect } from "react";
import { Share, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { apis } from "../api";
import colors from "../colors";
import * as WebBrowser from "expo-web-browser";

const Container = styled.ScrollView`
  background-color: ${colors.backgroundColor};
  padding: 20px 10px 60px;
`;

const TitleText = styled.Text`
  color: ${colors.textColor};
  font-size: 18px;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  color: ${colors.textColor};
  margin-bottom: 8px;
`;

const LinksTitle = styled.Text`
  color: ${colors.textColor};
  font-size: 18px;
  margin: 16px 0 8px;
`;

const Text = styled.Text`
  color: ${colors.textColor};
`;

const LinkBtn = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px 0;
  justify-content: space-between;
`;

const BottomSpace = styled.View`
  height: 60px;
`;
const CoinDetail = ({
  navigation: { setOptions, goBack },
  route: { params },
}) => {
  const { isLoading, data } = useQuery(
    ["coinDetail", params.id],
    apis.coinDetail
  );

  const shareMedia = async () => {
    if (data) {
      const isAndroid = Platform.OS === "android";
      const homepage = data.links.website;
      if (isAndroid) {
        await Share.share({
          message: `${homepage}`,
          title: params.name,
        });
      } else {
        await Share.share({
          message: `${homepage}`,
          url: homepage,
        });
      }
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <FontAwesome name="share" size={20} color="white" />
    </TouchableOpacity>
  );
  const BackButton = () => {
    return (
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" color="white" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setOptions({
      title: params.name,
      headerLeft: () => <BackButton />,
    });
  }, [setOptions, params]);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [setOptions, data]);

  const openLink = async (link) => {
    if (!link) {
      return;
    }
    await WebBrowser.openBrowserAsync(link);
  };
  return (
    <Container>
      <TitleText>About {params.name}</TitleText>
      {!isLoading ? (
        <>
          <Description>{data?.description}</Description>
          <LinksTitle>Links</LinksTitle>
          {data?.links_extended?.map((link) => (
            <LinkBtn
              key={link.url}
              onPress={() => openLink(link.url)}
              style={{
                borderBottomColor: colors.textColorLight,
                borderBottomWidth: 1,
              }}
            >
              <Text>{link.type}</Text>
              <FontAwesome name="external-link" size={16} color="white" />
            </LinkBtn>
          ))}
        </>
      ) : null}
      <BottomSpace />
    </Container>
  );
};

export default CoinDetail;
