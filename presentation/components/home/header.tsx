import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

interface Props {
  children: React.ReactNode
}

export default function Header({children} : Props) {

    const {height} = useWindowDimensions()

    const heightHeader = height * 0.3

  return (
    <View className='p-2' >
        <LinearGradient
            colors={['#2DAFE5','#12203F']}
            style={{position:'absolute',height:'110%', right:-350 , width:'300%'}}
            start={{x:0, y:0}}
            end={{x:1, y:0}}
            locations={[0,1]}
        >
        </LinearGradient>

        {children}

    </View>
  )
}