import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon from '@expo/vector-icons/FontAwesome6';
import { useFavoriteStore } from '@/presentation/store/favorite/useFavoriteStore';

interface Props{
    liga: LeagueInterface
}

export default function LeagueItemInfinity({liga}: Props) {

      const { addFavorite, favorites, deleteFavorite } = useFavoriteStore();
      const isFavorite = favorites.find(favorite => favorite.id === liga.id);
    
      const addLeagueToFavorite = () => {
        if (isFavorite) {
          deleteFavorite(liga.id);
        } else {
          addFavorite(liga);
        }
      };

  return (
    <Pressable className='h-56 w-[90%] mt-6 mx-auto z-30 mb-4' onPress={()=> router.push(`/detailLeague/${liga.id}/`)}>
        <View className='h-full w-full'>

        <View className='bg-black opacity-40 absolute h-full w-full z-20 rounded-xl' />

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

        <Pressable className='p-5 absolute z-50 -right-1 top-0' onPress={addLeagueToFavorite}>
          {isFavorite ? (
            <Icon name='heart-crack' size={40} color='white' />
          ) : (
            <Icon name='heart' size={40} color='white' />
          )}
        </Pressable>

        <View className='absolute bottom-2 p-3 left-5 z-50'>
            <Text className='text-3xl text-white w-80' numberOfLines={3} lineBreakMode='tail'>{liga.nombre}</Text>
            <View className='flex-row gap-3'>
                <Icon name="location-dot" color="white" size={20} />
                <Text className='text-white w-72' numberOfLines={3} lineBreakMode='tail'>{liga.direccion}</Text>
            </View>
            </View>
        </View>
    </Pressable>
  )
}