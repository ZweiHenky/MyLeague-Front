import { View, Text, FlatList, Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect } from 'react'

import FavoriteItem from '@/presentation/components/home/FavoriteItem'
import MainCarousel from '@/presentation/components/home/MainCarousel'
import { LigasData } from '@/presentation/components/home/types'
import { toast } from 'sonner-native'
import { useLeagueStore } from '@/presentation/store/league/useLeagueStore'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'

export default function index() {

  const {saveLeagues, leagues} = useLeagueStore() 
  const {user} = useAuthStore() 

  useEffect(() => {
    if (user?.id) {
      saveLeagues(user.id)
    }
  }, [user])

  return (
    <View className='flex-1'>
      <View>
        <Text className='text-2xl p-2'>Favoritos</Text>
        <FlatList 
          data={leagues}
          renderItem={(data) => <FavoriteItem item={data.item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <Text className='text-2xl p-2 mt-5' onPress={()=> toast.success("hola")}>
          Ligas más cerca de tí
        </Text>
        <MainCarousel ligas = {leagues}/>
      </View>
    </View>
  )
}