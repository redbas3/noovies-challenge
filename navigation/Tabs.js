import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Coins from "../screens/Coins";
import Prices from "../screens/Prices";
import News from "../screens/News";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "black",
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "pink",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "pink",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
          marginTop: -5,
        },
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
