import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/FontAwesome6";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Href, router } from 'expo-router';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { DivisionInterface } from '@/infraestructure/interfaces/divisions.interface';

interface Props {
    division:DivisionInterface
}

export default function CardAnimation({division}:Props) {

    const goEdit = ()=>{
      router.push(`/leagues/divisions/${division.id}/modifyDivision` as Href)
    }

    const translateX = useSharedValue(0)
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }))
  
    const moveAnimation = () => {
      translateX.value = withTiming(translateX.value === 250 ? 0 : 250)
    }
  
    return (
      <View key={division.id} className="gap-4 mx-auto mb-10 w-[90%]">
        <View className="absolute w-full bg-light-primary gap-2 h-full flex-row -z-10 rounded-xl items-center px-5">
          <Pressable className="items-center gap-1 w-[20%]" onPress={goEdit}>
            <Icon name="pen-to-square" color="white" size={18} />
            <Text className="text-white">Editar</Text>
          </Pressable>
          <View className="w-[0.3%] h-[60%] bg-white" />
          <Pressable className="items-center gap-1 w-[20%]" onPress={()=>router.push(`/leagues/divisions/${division.id}/teamDivision`)} >
            <Icon name="eye" color="white" size={18} />
            <Text className="text-white">Equipos</Text>
          </Pressable>
          <View className="w-[0.3%] h-[60%] bg-white " />
          <Pressable className="items-center gap-1 w-[20%]" onPress={()=>router.push(`/leagues/matchday/${division.id}`)} >
            <Icon name="calendar-days" color="white" size={18} />
            <Text className="text-white">Jornadas</Text>
          </Pressable>
        </View>

        <Animated.View style={[animatedStyle]} className="bg-white w-full rounded-xl ">
          <Pressable
            className="w-full p-3 rounded-xl h-full absolute z-50"
            onPress={() => moveAnimation()}
          />
          <View className="flex-row gap-3 items-center p-5">
            <View>
              <Text className="text-3xl font-bold">{division.nombre}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }