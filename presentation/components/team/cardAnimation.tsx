import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/FontAwesome6";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import TeamInterface from '@/infraestructure/interfaces/teams.interface';
import { Href, router } from 'expo-router';

interface Props {
    team:TeamInterface
}

export default function CardAnimation({team}:Props) {



    const goEdit = ()=>{
      router.push(`/teams/modifyTeam/${team.id}` as Href)
    }

    const translateX = useSharedValue(0)
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }))
  
    const moveAnimation = () => {
      translateX.value = withTiming(translateX.value === 170 ? 0 : 170)
    }
  
    return (
      <View className="gap-4 mx-auto mb-10 w-[90%]">
        <View className="absolute w-full bg-light-primary gap-5 h-full flex-row -z-10 rounded-xl items-center px-5">
        <Pressable className="items-center gap-1 w-[15%]" onPress={goEdit} >
            <Icon name="pen-to-square" color="white" size={18} />
            <Text className="text-white">Editar</Text>
          </Pressable>
          <View className="w-[0.3%] h-[60%] bg-white" />
          <Pressable className="items-center gap-1 w-[15%]" onPress={()=>router.push(`/teams/${team.id}/${team.usuario.id}/showQr` as Href)}>
            <Icon name="qrcode" color="white" size={18} />
            <Text className="text-white">Qr</Text>
          </Pressable>
          
        </View>
  
        <Animated.View style={[animatedStyle]} className="bg-white w-full rounded-xl">
          <Pressable className="w-full rounded-xl h-full absolute z-50 p-3" onPress={moveAnimation} />
          <View className="flex-row gap-3 items-center p-5">
            <Image source={{uri:team.logo}} className="w-20 h-20 items-center rounded-lg" />
            <View>
              <Text className="text-3xl font-bold">{team.nombre}</Text>
              <View className="flex-row gap-1 pt-2 items-center">
                <Icon name="users" size={16} />
                <Text> Jugadores: {0}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }