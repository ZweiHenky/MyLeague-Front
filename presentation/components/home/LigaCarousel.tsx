import { View, Text, Image } from 'react-native'
import React from 'react'
import { LigasData } from './types'

interface Props {
    liga: LigasData
}

export default function LigaCarousel({liga} : Props) {
    
  return (
    <View className='px-5 '>
      <Image 
        source={require("@/assets/images/favoritos/NE.png")} 
        className=' rounded-3xl'
        resizeMode="cover"
        style={{
            width:250,
            height:350,
            position:"absolute",
        }}
      />
      <Text>{liga.name}</Text>
    </View>
  )
}