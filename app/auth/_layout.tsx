import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack 
        screenOptions={{
            headerShown:false,
            contentStyle:{
                backgroundColor:"#fff"
            }
        }}
    >
        <Stack.Screen  
            name='login'
            options={{
                title:"iniciar Sesion"
            }}  
        />
        <Stack.Screen  name='register' />
    </Stack>
  )
}