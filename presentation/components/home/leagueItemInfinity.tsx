import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon from '@expo/vector-icons/FontAwesome6';

interface Props{
    liga: LeagueInterface
}

export default function LeagueItemInfinity({liga}: Props) {
  return (
    <Pressable className='h-56 w-[90%] mt-10 mx-auto z-30' onPress={()=> router.push(`/detailLeague/${liga.id}/`)}>
        <View className='h-full w-full'>

        <View className='bg-black opacity-30 absolute h-full w-full z-20 rounded-xl' />

        <Image
            source={{ uri: liga.logo }}
            className='rounded-3xl'
            resizeMode="cover"
            style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            }}
        />
        <View className='absolute bottom-2 p-3 left-5 z-50'>
            <Text className='text-3xl text-white'>{liga.nombre}</Text>
            <View className='flex-row gap-3'>
                <Icon name="location-dot" color="white" size={20} />
                <Text className='text-white' numberOfLines={3}>{liga.direccion}</Text>
            </View>
            </View>
        </View>
    </Pressable>
  )
}