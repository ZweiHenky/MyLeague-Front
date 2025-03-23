import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function Clasificacion() {
  return (
    <ScrollView className='flex-1'>
      <View className='flex flex-row justify-between p-3 '>
        <Text className='text-center w-[10%] text-gray-500'>#</Text>
        <Text className='w-[35%] text-gray-500'>Equipo</Text>
        <Text className='text-center w-[10%] text-gray-500'>G</Text>
        <Text className='text-center w-[10%] text-gray-500'>E</Text>
        <Text className='text-center w-[10%] text-gray-500'>P</Text>
        <Text className='text-center w-[15%] text-gray-500'>GF/GC</Text>
        <Text className='text-center w-[10%] text-gray-500'>PTS</Text>
      </View>
      <View className='flex flex-row justify-between p-3'>
        <Text className='text-center w-[10%]'>1</Text>
        <Text className='w-[35%]'>Liverpool</Text>
        <Text className='text-center w-[10%]'>5</Text>
        <Text className='text-center w-[10%]'>0</Text>
        <Text className='text-center w-[10%]'>0</Text>
        <Text className='text-center w-[15%]'>15/3</Text>
        <Text className='text-center w-[10%]'>15</Text>
      </View>
      <View className='h-10' />
    </ScrollView>
  )
}