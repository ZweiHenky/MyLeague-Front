import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDetailAllLeague } from '@/hooks/leagues/useDetailAllLeague'
import { useLocalSearchParams } from 'expo-router'
import Loading from '@/presentation/components/auth/loading'
import { useDetailLeagueStore } from '@/presentation/store/detailAllLeague/useDetailLeagueStore'

export default function Index() {

  const {idLiga} = useLocalSearchParams()

  const {queryDetailAllLeague} = useDetailAllLeague({idLiga:Number(idLiga)})

  const {save, detailLeague, divisionActual} = useDetailLeagueStore()
  
  useEffect(() => {
    if (queryDetailAllLeague.data?.status) {
      save(queryDetailAllLeague.data.data); 
    }
  }, [queryDetailAllLeague.data]);

  if (queryDetailAllLeague.isLoading) {
      return <Loading />
  }
  

  return (
    <ScrollView className='p-2 flex-1 w-[90%] mx-auto'
      showsVerticalScrollIndicator={false}
    >
      <Text className=' mt-4 text-2xl'>Liga</Text>
      <View className='p-5 bg-white rounded-lg shadow-lg  mt-2 gap-4'>
        <Text>Nombre: {detailLeague?.nombre}</Text>
        <Text>Direccion: {detailLeague?.direccion}</Text>
        <Text>Descripcion: {detailLeague?.descripcion}</Text>
      </View>    
      <Text className=' mt-4 text-2xl'>Division</Text>
      <View className='p-5 bg-white rounded-lg shadow-lg  mt-2 gap-4'>
        <Text>Division: {divisionActual?.nombre}</Text>
        <Text>Arbitraje: {divisionActual?.arbitraje}</Text>
        <Text>Premio: {divisionActual?.premio}</Text>
        <Text>Descripcion: {divisionActual?.descripcion}</Text>
      </View>    
      <View className='h-20'></View>
    </ScrollView>
  )
}