import { View, Text, Pressable, FlatList } from 'react-native'
import Icon from "@expo/vector-icons/FontAwesome6";
import React, { useEffect } from 'react'
import TeamItem from '@/presentation/components/teamsDivision/teamItem';
import { router, useLocalSearchParams } from 'expo-router';
import Loading from '@/presentation/components/auth/loading';
import { useTeamDivision } from '@/hooks/teamDivision/useTeamDivision';
import { useTeamDivisionMutation } from '@/hooks/teamDivision/useTeamDivisionMutation';

export default function TeamDivision() {
  
  const { idDivision } = useLocalSearchParams()
  
  const { teamsDivisionQuery } = useTeamDivision({idDivision:Number(idDivision)})

  const { mutateDeleteTeamDivision } = useTeamDivisionMutation()

  const onDelete = async(id:number)=>{ 
    mutateDeleteTeamDivision.mutate({idTeam:id, idDivision:Number(idDivision)})
  }

  if (teamsDivisionQuery.isLoading) {
    return <Loading />
  }

  

  return (
    <View className='flex-1'>
        <Pressable className='p-3 w-12 bg-light-primary rounded-full items-center absolute right-3 bottom-12 z-50' onPress={() => router.push(`/leagues/divisions/${idDivision}/readingQr`)}>
            <Icon name='camera' size={18} color="white" />
        </Pressable>

        <View className='w-[90%] mx-auto p-3  bg-slate-300 rounded-lg my-3'>
            <View className='flex-row items-center gap-3'>
              <Icon name='circle-info' size={35} color="white" />
              <Text className='text-pretty max-w-[85%]' numberOfLines={5}>
                Para agregar equipos a tu division, 
                haz click en el boton de camara y escanea el Qr del equipo
              </Text>
            </View>
        </View>

        <FlatList
          data={teamsDivisionQuery.data!.data}
          renderItem = {({item, index}) => {
            return <TeamItem id={item.id} nombre={item.nombre} usuario={item.usuario.nombre!} index={index} onDelete={onDelete} />
          }}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View className='flex-1 flex-row w-[90%] p-3 mx-auto'>
              <View className=' w-[10%]' >
                  <Text className='flex-shrink font-bold' numberOfLines={1} ellipsizeMode='tail'>
                      N°
                  </Text>
              </View>
              {/* Nombre a la izquierda */}
              <View className=' w-[35%]' >
                <Text className='flex-shrink font-bold' numberOfLines={1} ellipsizeMode='tail'>
                    Equipo
                  </Text>
              </View>

              {/* Espacio flexible en el medio para centrar el usuario */}
              <View className='flex-1 w-[35%] '>
                  <Text className='flex-shrink font-bold' numberOfLines={1}>
                  Usuario
                  </Text>
              </View>

              {/* Icono a la derecha */}
              <View className='w-[20%] items-center ' >
                <Text className='flex-shrink text-end font-bold' numberOfLines={1}>
                  Eliminar
                </Text>
              </View>
              
          </View>
          }
        >

        </FlatList>
    </View>

  )
}