import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Coins from "../screens/Coins";
import Prices from "../screens/Prices";
import News from "../screens/News";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: `${colors.backgroundColor}`,
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: `${colors.backgroundColor}`,
        },
        tabBarActiveTintColor: "pink",
        headerStyle: {
          backgroundColor: `${colors.backgroundColor}`,
        },
        headerTitleStyle: {
          color: "pink",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
          marginTop: -5,
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Coins"
        component={Coins}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name="coins" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Prices"
        component={Prices}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="dollar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="newspaper-o" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
