import { View, Text, Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { LigasData } from './types';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';

type Props = {
    item: LeagueInterface
}

export default function FavoriteItem  ({item}:Props) {

    
    const {nombre, logo} = item

    return(
      <View className=' mx-2 h-[120] w-[200] items-center '>
        <Image
         source={require('../../../assets/images/favoritos/logo.jpg')} 
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
      </View>
    )
  }