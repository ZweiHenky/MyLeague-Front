import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function Index() {

  return (
    <ScrollView className='p-2 flex-1 w-[90%] mx-auto'
      showsVerticalScrollIndicator={false}
    >
      <Text className=' mt-4 text-2xl'>Liga</Text>
      <View className='p-5 bg-white rounded-lg shadow-lg  mt-2 gap-4'>
        <Text>Nombre: Nombre</Text>
        <Text>Direccion: Direccion</Text>
        <Text>Telefono: Telefono</Text>
        <Text>Correo: Correo</Text>
        <Text>Descripcion: Descripcion</Text>
        <Text>Encargado: Encargado</Text>
      </View>    
      <Text className=' mt-4 text-2xl'>Division</Text>
      <View className='p-5 bg-white rounded-lg shadow-lg  mt-2 gap-4'>
        <Text>Division: Nombre</Text>
        <Text>Arbitraje: Arbitraje</Text>
        <Text>Premio: Premio</Text>
        <Text>Descripcion: Descripcion</Text>
      </View>    
      <View className='h-20'></View>
    </ScrollView>
  )
}