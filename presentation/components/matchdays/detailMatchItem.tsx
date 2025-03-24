import { View, Text, Pressable } from 'react-native'
import React from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { MatchDetailItemResponse, Partido } from '@/infraestructure/interfaces/matchdaydb-response'
import { router } from 'expo-router'

interface Props{
  match : Partido
}

export default function DetailMatchdayItem({match}: Props) {
  return (
    <Pressable className='w-full rounded-xl bg-white flex-row items-center  p-2 mt-6' onPress={()=> router.push(`/leagues/matchday/${match.id}/updateMatch`)}>

      <Text className='w-[30%] text-center' numberOfLines={1} lineBreakMode="tail">{match.equipoLocal.nombre}</Text>

      <Text   className='p-4 bg-white w-[15%] text-center' >{match.golesLocal}</Text>
      
      <Text className='w-[10%] text-center'>VS</Text>

      <Text  className='p-4 bg-white w-[15%] text-center' >{match.golesVisitante}</Text>

      <Text className='w-[30%] text-center' numberOfLines={1} lineBreakMode="tail">{match.equipoVisitante.nombre}</Text>
      
    </Pressable>
  )
}