import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([
          Ionicons.font,
          FontAwesome.font,
          FontAwesome5.font,
        ]);

        const images = loadImages([require("./assets/crypto.png")]);

        await Promise.all([...fonts, ...images]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Tabs />
    </NavigationContainer>
  );
}
