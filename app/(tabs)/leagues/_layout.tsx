import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import Icon from '@expo/vector-icons/FontAwesome6'
import 'react-native-get-random-values';

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
            name='divisions/[idLiga]/addDivision'
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

        <Stack.Screen 
            name='divisions/[idDivision]/teamDivision'
            options={{
                headerTitleAlign:"center",
                title:"Equipos por Division",
            }}
        />
        <Stack.Screen 
            name='divisions/[idDivision]/readingQr'
        />

        <Stack.Screen 
            name='matchday/[idDivision]/generateMatchdays'
            options={{
                headerTitleAlign:"center",
                title:"Agregar Jornadas",
            }}
        />
        <Stack.Screen 
            name='matchday/[idDivision]/index'
            options={{
                headerTitleAlign:"center",
                title:"Jornadas",
            }}
        />
        <Stack.Screen 
            name='matchday/[idMatchday]/detailMatchday'
            options={{
                headerTitleAlign:"center",
                title:"Detalle de la jornada",
            }}
        />
        <Stack.Screen 
            name='matchday/[idMatch]/updateMatch'
            options={{
                headerTitleAlign:"center",
                title:"Asignar Resultado",
            }}
        />

    </Stack>
  )
}