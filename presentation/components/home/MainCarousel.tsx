import { View, Text, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import LigaCarousel from './LigaCarousel';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
  
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

type Props = {
    ligas: LeagueInterface[]
}

export default function MainCarousel({ligas}:Props) {

    const ref = useRef<ICarouselInstance>(null) 
    const width = useWindowDimensions().width
    

  return (
    <View className='w-full h-[400]'>
      <Carousel 
        ref={ref}
        data={ligas}
        renderItem = {({item})=> (<LigaCarousel liga={item} />)}
        width={350}
        height={400}
        style={{
            width:width,
            height:400,
            justifyContent:"center",
            alignItems:"center",

        }}
        mode="parallax"
      />

    </View>
  )
}