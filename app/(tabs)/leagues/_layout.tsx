import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import Icon from '@expo/vector-icons/FontAwesome6'

export default function _layout() {
  
  return (
    <Stack
      screenOptions={{
        headerShadowVisible:false,
        // contentStyle:{
        //   backgroundColor:"white"
        // }
      }}
    >
        <Stack.Screen 
            name='index'
            options={{
                headerTitleAlign:"center",
                title:"Mis Ligas",
            }}
        />
        <Stack.Screen 
            name='addLeague'
            options={{
                headerTitleAlign:"center",
                title:"Agregar Nueva Liga",
            }}
        />

        <Stack.Screen 
            name='modifyLeague/[id]'
            options={{
                headerTitleAlign:"center",
                title:"Modificar Liga",
            }}
        />

        <Stack.Screen 
            name='divisions/[idLiga]/index'
            options={{
                headerTitleAlign:"center",
                title:"Divisiones",
            }}
        />

        <Stack.Screen 
            name='divisions/addDivision'
            options={{
                headerTitleAlign:"center",
                title:"Agregar Division",
            }}
        />

        <Stack.Screen 
            name='divisions/[idDivision]/modifyDivision'
            options={{
                headerTitleAlign:"center",
                title:"Modificar Division",
            }}
        />

    </Stack>
  )
}