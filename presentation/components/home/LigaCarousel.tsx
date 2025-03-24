import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/FontAwesome6';
import { Href, router } from 'expo-router';
import { useFavoriteStore } from '@/presentation/store/favorite/useFavoriteStore';

interface Props {
  liga: LeagueInterface;
}

export default function LigaCarousel({ liga }: Props) {
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
    <Pressable onPress={() => router.push(`/detailLeague/${liga.id}/` as Href)}>
      <View className='px-5 items-center h-full'>
        <LinearGradient
          colors={['black', 'transparent']}
          style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 50, borderRadius: 20, opacity: 0.4 }}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0.1, 1]}
        />
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
        <Pressable className='p-5 absolute z-50 right-6 top-2' onPress={addLeagueToFavorite}>
          {isFavorite ? (
            <Icon name='heart-crack' size={40} color='white' />
          ) : (
            <Icon name='heart' size={40} color='white' />
          )}
        </Pressable>
        <View className='absolute top-[78%] p-3 left-5 z-50'>
          <Text className='text-3xl text-white'>{liga.nombre}</Text>
          <View className='flex-row gap-3'>
            <Icon name="location-dot" color="white" size={20} />
            <Text className='text-white'>{liga.direccion}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}