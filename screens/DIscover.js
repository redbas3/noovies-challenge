import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-query";
import { apis } from "../api";
import Loader from "../components/Loader";
import { FontAwesome5 } from "@expo/vector-icons";
import { makeImgPath } from "../utils";
import { useAssets } from "expo-asset";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Card = styled.View`
  background-color: #f091ad;
  width: 240px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);

const Image = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const CardText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;
const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

export default function Discover() {
  const { isLoading, data } = useQuery(["coins"], apis.coins);

  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  let cleanedList = [];
  let assetsList = [];
  if (data) {
    cleanedList = data
      ?.filter((coin) => coin.rank !== 0)
      .filter((coin) => coin.is_active === true)
      .slice(0, 100);

    const [assets] = useAssets(
      cleanedList.map((coin) => makeImgPath(coin.symbol))
    );
    assetsList = assets;
  }

  // Animations
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

  // Pan Responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex((prev) => prev + 1);
  };

  const closePress = () => {
    goLeft.start(onDismiss);
  };

  const checkPress = () => {
    goRight.start(onDismiss);
  };

  return isLoading ? (
    <Loader />
  ) : cleanedList ? (
    <Container>
      <CardContainer>
        <AnimatedCard
          style={{
            transform: [{ scale: secondScale }],
          }}
        >
          {assetsList && <Image source={assetsList[index + 1]}></Image>}
          <CardText>{cleanedList[index + 1].name}</CardText>
        </AnimatedCard>
        <AnimatedCard
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          {assetsList && <Image source={assetsList[index]}></Image>}
          <CardText>{cleanedList[index].name}</CardText>
        </AnimatedCard>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <FontAwesome5 name="heart-broken" size={36} color="white" />
        </Btn>
        <Btn onPress={checkPress}>
          <FontAwesome5 name="heart" size={36} color="white" />
        </Btn>
      </BtnContainer>
    </Container>
  ) : null;
}
