import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import MatchItem from '@/presentation/components/matchdays/matchItem'
import { useMatchday } from '@/hooks/matchDay/useMatchday'
import Loading from '@/presentation/components/auth/loading'
import Icon from "@expo/vector-icons/FontAwesome6";

export default function index() {

  const {idDivision} = useLocalSearchParams()

  const {queryMatchday} = useMatchday({idDivision:Number(idDivision)})

  if (queryMatchday.isLoading) {
    <Loading/>
  }

  return (
    <View className='flex-1 w-[90%] mx-auto p-2' >

      <Pressable className='p-3 w-12 bg-light-primary rounded-full items-center absolute right-3 bottom-12 z-50' onPress={() => router.push(`/leagues/matchday/${idDivision}/generateMatchdays`)}>
        <Icon name='plus' size={18} color="white" />
      </Pressable>

      
      <FlatList 
        data={queryMatchday.data?.data}
        renderItem={({item}) => <MatchItem jornada={item} />}
        className='flex-1'
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View className='h-20' />}
      />

      

    </View>
  )
}