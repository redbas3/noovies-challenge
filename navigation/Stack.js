import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetail from "../screens/CoinDetail";
import colors from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      sceneContainerStyle={{
        backgroundColor: `${colors.backgroundColor}`,
      }}
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: `${colors.backgroundColor}`,
        },
        headerTitleStyle: {
          color: "pink",
        },
      }}
    >
      <NativeStack.Screen name="CoinDetail" component={CoinDetail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
