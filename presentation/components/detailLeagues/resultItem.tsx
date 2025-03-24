import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/FontAwesome6";
import { Partido } from '@/infraestructure/interfaces/detailAllLeaguedb.-response';

interface Props{
    match:Partido
}

export default function ResultItem({match}:Props) {


  return (
    <>
        <View className="flex flex-row justify-center items-center p-3 gap-2 rounded-t-full bg-white w-[40%] mx-auto">
            <Icon name="clock" size={16} color="#0E7C7B" />
            <Text className="text-light-primary ">{match.horaInicio}</Text>
        </View>
        <View className="w-[90%] mx-auto rounded-md flex flex-row justify-center items-center bg-white py-5" >
            <View className="gap-2 justify-center items-center w-[40%]">
                <Image className=" rounded-lg" source={{uri:match.equipoLocal.logo!}} width={50} height={50} resizeMode="cover" />
                <Text ellipsizeMode="tail" numberOfLines={1}>{match.equipoLocal.nombre}</Text>
            </View>
            <View className="w-[20%] justify-center items-center flex-row gap-2">
                <Text className="text-light-primary text-2xl">{match.golesLocal}</Text>
                <Text className="text-light-primary text-2xl">:</Text>
                <Text className="text-light-primary text-2xl">{match.golesVisitante}</Text>
            </View>
            <View className="gap-2 justify-center items-center w-[40%]">
                <Image className=" rounded-lg" source={{uri:match.equipoVisitante.logo!}} width={50} height={50} resizeMode="cover" />
                <Text ellipsizeMode="tail" numberOfLines={1}>{match.equipoVisitante.nombre}</Text>
            </View>
        </View>
    </>
  )
}