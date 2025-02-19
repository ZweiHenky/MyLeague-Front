import { router, Stack } from "expo-router";

import "../global.css";
import { useEffect } from "react";
import { Toaster } from 'sonner-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  useEffect(() => {
    router.replace("/(tabs)/home")
  }, [])
  

  return (
    <SafeAreaProvider>

      <GestureHandlerRootView>

        <Stack 
          screenOptions={{
            headerShown:false
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>

        <Toaster />

      </GestureHandlerRootView>

    </SafeAreaProvider>
  )
}
