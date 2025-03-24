import { View, Text, Image, Pressable } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { Href, router } from 'expo-router';

type Props = {
    item: LeagueInterface
}

export default function FavoriteItem  ({item}:Props) {
    
    const {nombre, logo, id} = item

    return(
      <Pressable className=' mx-2 h-[140] w-[160] items-center' onPress={()=> router.push(`/detailLeague/${id}` as Href)}>
        <Image
         source={{uri:logo}} 
         className='w-full h-full absolute rounded-lg object-contain'
         />
         <View className='w-[100%] h-[99%] items-center justify-center'>
          <LinearGradient
            colors={['transparent', '#00000060']}
            className='w-[95%] h-[100%] justify-end '
          >
            <Text className='text-white p-1 text-center text-lg '>{nombre}</Text>
          </LinearGradient>
         </View>
      </Pressable>
    )
  }