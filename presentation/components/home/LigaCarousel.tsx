import { View, Text, Image } from 'react-native'
import React from 'react'
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/FontAwesome6'

interface Props {
    liga: LeagueInterface
}

export default function LigaCarousel({liga} : Props) {
    
  return (
    <View className='px-5 items-center h-full'>
      <LinearGradient
        colors={['white','transparent']}
        style={{position:'absolute',height:'100%', width:'100%', zIndex:50, borderRadius:20, opacity:0.4}}
        start={{x:1, y:1}}
        end={{x:1, y:0}}
        locations={[0.1,1]}
      >
      </LinearGradient>
      <Image 
        source={{uri:liga.logo}} 
        className=' rounded-3xl'
        resizeMode="cover"
        style={{
            width:"100%",
            height:"100%",
            position:"absolute",
        }}
      />
        <View className='absolute top-[78%] p-3 left-5 z-50'>
          <Text className='text-3xl'>{liga.nombre}</Text>
          <View className='flex-row gap-3'>
            <Icon name="location-dot" color="black" size={20} />
            <Text>{liga.direccion}</Text>
          </View>
        </View>
    </View>
  )
}