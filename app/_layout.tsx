import { router, Stack } from "expo-router";

import "../global.css";
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    router.replace("/(tabs)/home")
  }, [])
  

  return <Stack 
    screenOptions={{
      headerShown:false
    }}
  >
    <Stack.Screen name="(tabs)" />
  </Stack>;
}
