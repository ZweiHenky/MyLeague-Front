import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'

import FavoriteItem from '@/presentation/components/home/FavoriteItem'
import MainCarousel from '@/presentation/components/home/MainCarousel'
import { useLeagueStore } from '@/presentation/store/league/useLeagueStore'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import { useFavoriteStore } from '@/presentation/store/favorite/useFavoriteStore'
import { router } from 'expo-router'

export default function index() {

  const {saveLeagues, leagues} = useLeagueStore() 
  const { favorites, getFavorites } = useFavoriteStore()
  const {user} = useAuthStore() 

  useEffect(() => {
    getFavorites()
  }, [])
  

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
          data={favorites}
          renderItem={(data) => <FavoriteItem item={data.item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <View className='flex-row justify-between items-end p-2 mt-5'>
          <Text className='text-2xl'>
            Ligas cercanas a ti
          </Text>
          <Pressable
            onPress={() => router.push("/allLeagues/")}
          >
            {({ pressed }) => (
              <Text style={{ color: pressed ? "#0E7C7B" : "black" }}>
                Ver más
              </Text>
            )}
          </Pressable>
        </View>
        <MainCarousel ligas = {leagues}/>
      </View>
    </View>
  )
}