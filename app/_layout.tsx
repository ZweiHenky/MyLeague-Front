import { router, Stack } from "expo-router";

import "../global.css";
import { useEffect } from "react";
import { Toaster } from 'sonner-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function RootLayout() {

  useEffect(() => {
    router.replace("/(tabs)/home")
  }, [])

  const queryClient = new QueryClient()
  

  return (
    <SafeAreaProvider>

      <GestureHandlerRootView>

        <QueryClientProvider client={queryClient}>

          <Stack 
            screenOptions={{
              headerShown:false
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>

          <Toaster />

        </QueryClientProvider>

        

      </GestureHandlerRootView>

    </SafeAreaProvider>
  )
}
