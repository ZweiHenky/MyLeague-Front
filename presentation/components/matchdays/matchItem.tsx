import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Data } from '@/infraestructure/interfaces/matchdaydb-response'

interface Props{
    jornada:Data
}

export default function MatchItem({jornada}:Props) {
  return (
    <Pressable className='w-full bg-white rounded-xl p-6 mt-5 active:opacity-20 mb-5' onPress={()=>router.push(`/leagues/matchday/${jornada.id}/detailMatchday`)}>
      <Text className='text-xl'>Jornada {jornada.numero}</Text>
    </Pressable>
  )
}