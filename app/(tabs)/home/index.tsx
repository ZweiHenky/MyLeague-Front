import { View, Text, FlatList, Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect } from 'react'

import FavoriteItem from '@/presentation/components/home/FavoriteItem'
import MainCarousel from '@/presentation/components/home/MainCarousel'
import { LigasData } from '@/presentation/components/home/types'
import { toast } from 'sonner-native'


const data: LigasData[] = [
  {
    name:'Equipo1',
    url:'../../../assets/images/favoritos/manchester.png',
    prize:"10000",
    divisions: "10",
    teams:"10",
    location:"lago cuitzeo 107"

  },
  {
    name:'Equipo2',
    url:'file:///myLeague/app/images/favoritos/NE.png',
    prize:"10000",
    divisions: "10",
    teams:"10",
    location:"lago cuitzeo 107"
  },
  {
    name:'Equipo3',
    url:'../../../assets/images/favoritos/manchester.png',
    prize:"10000",
    divisions: "10",
    teams:"10",
    location:"lago cuitzeo 107"
  },
  {
    name:'Equipo4',
    url:'file:///myLeague/app/images/favoritos/NE.png',
    prize:"10000",
    divisions: "10",
    teams:"10",
    location:"lago cuitzeo 107"
  }
]

export default function index() {
  return (
    <View className='p-3'>
      <View>
        <Text className='text-2xl p-2'>Favoritos</Text>
        <FlatList 
          data={data}
          renderItem={(data) => <FavoriteItem item={data.item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <Text className='text-2xl p-2 mt-5' onPress={()=> toast.success("hola")}>
          Ligas más cerca de tí
        </Text>
        <MainCarousel ligas = {data}/>
      </View>
    </View>
  )
}