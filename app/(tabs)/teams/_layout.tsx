import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible:false,
      }}
    >
        <Stack.Screen 
            name='index'
            options={{
                headerTitleAlign:"center",
                title:"Mis Equipos",
            }}
        />
        <Stack.Screen 
            name='addTeam'
            options={{
                headerTitleAlign:"center",
                title:"Agregar Nuevo Equipo",
            }}
        />
        <Stack.Screen 
            name='modifyTeam/[id]'
            options={{
                headerTitleAlign:"center",
                title:"Modificar Equipo",
            }}
        />
        <Stack.Screen 
            name='[idTeam]/[idUser]/showQr'
            options={{
                headerTitleAlign:"center",
                title:"QR",
                presentation:"modal"
            }}
        />
    </Stack>
  )
}