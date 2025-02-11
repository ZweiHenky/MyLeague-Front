import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
        screenOptions={
            {
                headerShadowVisible:false
            }
        }
    >
        <Stack.Screen 
            name='index' 
            options={{
                headerTitleAlign:"center",
                title:"Menu de Configuracion",
            }}
        />
    </Stack>
  )
}