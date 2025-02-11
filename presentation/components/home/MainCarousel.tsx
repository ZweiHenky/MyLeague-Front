import { View, Text, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { LigasData } from './types';
import LigaCarousel from './LigaCarousel';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
  
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

type Props = {
    ligas: LigasData[]
}

export default function MainCarousel({ligas}:Props) {

    const ref = useRef<ICarouselInstance>(null) 
    const width = useWindowDimensions().width

  return (
    <View className='w-full h-[350]'>
      <Carousel 
        ref={ref}
        data={ligas}
        renderItem = {({item})=> (<LigaCarousel liga={item} />)}
        width={300}
        height={350}
        style={{
            width:width,
            height:350,
            justifyContent:"center",
            alignItems:"center",
        }}
        mode="parallax"
      />

    </View>
  )
}