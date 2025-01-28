import { View, Text, FlatList, Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import React from 'react'

type FavoriteData = {
  name: String,
  url:String
}

const data: FavoriteData[] = [
  {
    name:'Equipo1',
    url:'../../../assets/images/favoritos/manchester.png'
  },
  {
    name:'Equipo2',
    url:'file:///myLeague/app/images/favoritos/NE.png'
  },
  {
    name:'Equipo1',
    url:'../../../assets/images/favoritos/manchester.png'
  },
  {
    name:'Equipo2',
    url:'file:///myLeague/app/images/favoritos/NE.png'
  }
]

const FavoriteItem = ({name, url}:FavoriteData) =>{
  console.log(url);
  
  return(
    <View className=' mx-2 h-[120] w-[100] items-center '>
      <Image
       source={require('../../../assets/images/favoritos/logo.jpg')} 
       className='w-full h-full absolute rounded-lg object-contain'
       />
       <View className='w-[100%] h-[99%] items-center justify-center'>
        <LinearGradient
          colors={['transparent', '#00000060']}
          className='w-[95%] h-[100%] justify-end '
        >
          <Text className='text-white p-1 text-center text-lg '>{name}</Text>
        </LinearGradient>
       </View>
    </View>
  )
}

export default function index() {
  return (
    <View className='p-3'>
      <View>
        <Text className='text-2xl '>Favoritos</Text>
        <FlatList 
          data={data}
          renderItem={(data) => <FavoriteItem name={data.item.name} url={data.item.url} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View></View>
    </View>
  )
}