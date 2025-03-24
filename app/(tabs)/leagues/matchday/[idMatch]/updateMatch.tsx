import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useMatchday } from '@/hooks/matchDay/useMatchday'
import { useLocalSearchParams } from 'expo-router'
import Loading from '@/presentation/components/auth/loading'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { Formik } from 'formik'
import { useMatchMutation } from '@/hooks/matchDay/useMatchMutation'


export default function UpdateMatch() {

  const {idMatch} = useLocalSearchParams()

  const {queryMacth} = useMatchday({idMatch:Number(idMatch)})
  const {queryMatchMutation} = useMatchMutation()

  const {data:result} = queryMacth

  const {data} = result || {}

  if (queryMacth.isLoading && !data) {
    return <Loading/>
  }
  

  return (
      <View className='w-full rounded-xl  items-center  p-2 mt-6' >
  
        <Formik 
          initialValues={
            {
              id:data?.id,
              fecha:data?.fecha,
              horaInicio:data?.horaInicio,
              horaFin:data?.horaFin,
              golesLocal:data?.golesLocal.toString() || "0",
              golesVisitante:data?.golesVisitante.toString() || "0",
              equipoLocal:{
                id:data?.equipoLocal.id
              },
              equipoVisitante:{
                id:data?.equipoVisitante.id
              }
            }
          }
          onSubmit={(values, actions)=>{

            queryMatchMutation.mutate(values)
            
          }}
          enableReinitialize={true}
        >

        {({values, handleChange, submitForm})=>(
          <View className='w-full'>
            <View className='flex-row bg-white p-2 justify-center items-center'>
              <Text className='w-[30%] text-center' numberOfLines={1} lineBreakMode='tail'>{data?.equipoLocal.nombre}</Text>
              
              <ThemeInput  className='p-4 w-[15%] text-center bg-white text-xl' value={values.golesLocal} onChangeText={handleChange("golesLocal")} />
              
              <Text className='w-[10%] text-center'>VS</Text>

              <ThemeInput  className='p-4 w-[15%] text-center bg-white  text-xl' value={values.golesVisitante} onChangeText={handleChange("golesVisitante")} />

              <Text className='w-[30%] text-center' numberOfLines={1} lineBreakMode='tail'>{data?.equipoVisitante.nombre}</Text>
            </View>

            <Pressable className='bg-light-primary w-full p-4 mt-10 rounded-xl' onPress={submitForm}>
              <Text className='text-white text-center text-xl'>Agregar Resultado</Text>
            </Pressable>
          </View>
        )}

        </Formik>
        
      </View>
  )
}