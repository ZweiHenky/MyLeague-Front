import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/FontAwesome6";

interface Props {
    id:number,
    nombre: string,
    usuario: string,
    index:number,
    onDelete:(id:number)=>void
}

export default function TeamItem({id, nombre, usuario, index, onDelete}:Props) {
  return (
    <View className='flex-1 flex-row w-[90%] p-3 mx-auto mb-5'>

        <View className=' w-[10%]' >
            <Text className='flex-shrink ' numberOfLines={1} ellipsizeMode='tail'>
                {index+1}
            </Text>
       </View>

        {/* Nombre a la izquierda */}
       <View className=' w-[35%]' >
        <Text className='flex-shrink ' numberOfLines={1} ellipsizeMode='tail'>
                {nombre}
            </Text>
       </View>

        {/* Espacio flexible en el medio para centrar el usuario */}
        <View className='flex-1 w-35%]'>
            <Text className='flex-shrink' numberOfLines={1}>
            {usuario}
            </Text>
        </View>

        {/* Icono a la derecha */}
        <Pressable className='w-[20%] items-center' onPress={() => onDelete(id)} >
            <Icon name='trash' size={18} color="red" />
        </Pressable>
        
    </View>
  )
}