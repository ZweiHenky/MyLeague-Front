import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import QRCode from 'react-native-qrcode-svg';

export default function ShowQr() {

    const {idTeam, idUser} = useLocalSearchParams()

    console.log(idTeam, idUser);
    
    const value= JSON.stringify({
        idTeam,
        idUser
    })
    
  return (
    <View className='w-full h-[90%] justify-center items-center'>
      <View>
        <QRCode 
            value={value}
            size={250}
        />
      </View>
      <Text className='text-2xl text-center w-4/5 mt-5'>
            Muestrale el Qr al administrador de la liga para agregar a tu equipo
        </Text>
    </View>
  )
}