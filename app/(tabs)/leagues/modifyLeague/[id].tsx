import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { addLeagueSchema } from '@/infraestructure/schemas/addLeagueSchema';
import { pickImageAsync } from '@/helpers/images/pickImageAsync';
import { router, useLocalSearchParams } from 'expo-router';
import { uploadImage } from '@/helpers/images/uploadImage';
import { toast } from 'sonner-native';
import { useLeagueStore } from '@/presentation/store/league/useLeagueStore';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';

export default function ModifyLeague() {
    
  const {id} = useLocalSearchParams()

  const {user} = useAuthStore()
  const {leagues, updateLeague, deleteLeague} = useLeagueStore()

  const [league, setLeague] = useState<LeagueInterface>()

  useEffect(() => {
    setLeague(leagues.find(league => league.id == Number(id)))
  }, [id])
  
  const onDelete = async(idLiga:number, resetForm:any)=>{
    const res = await deleteLeague(idLiga)

    if (!res) {
        toast.error("ocurrio un error al borrar la liga")
        resetForm()
    }

    toast.success("Se borro la liga con exito")
    router.back()

  }

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={10} // Espacio adicional para evitar superposición
        enableOnAndroid={true} // Habilitar en Android
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='p-5 gap-5 mb-10'>
         <Formik
          initialValues={{
            nombre:league?.nombre,
            direccion: league?.direccion,
            descripcion:league?.descripcion,
            logo:league?.logo
          }}
          validationSchema={addLeagueSchema}
          enableReinitialize={true}
          onSubmit={async(values, actions)=>{

            const comparationImage = values.logo == league?.logo  

            try {
              let restStore
              if (!comparationImage) {
                const res = await uploadImage(values.logo!)
  
                if (!res.status) {
                    toast.error("Error al subir la imagen")
                    return
                }
  
                restStore = await updateLeague(values.nombre!, values.direccion!, values.descripcion!, res.url, user!.id!, id.toString())
              }else{
                restStore = await updateLeague(values.nombre!, values.direccion!, values.descripcion!,values.logo!, user!.id!, id.toString())
              }

                if (restStore.status) {
                  toast.success("Se actualizo con exito")
                  router.back()
                }else{
                  toast.error(restStore.message)
                }

            } catch (error) {
              toast.error("Ocurrio un problema inesperado")  
            }finally{
              actions.resetForm()
              actions.setSubmitting(false)
            }  
          }}  
         >

          {
            ({handleChange, submitForm, touched, errors, isSubmitting, setFieldValue, values, handleBlur, resetForm})=>(
              <>
                <View className='gap-4'>
                  <Text className='text-2xl'>Nombre de la liga</Text>
                  <ThemeInput className="px-2" placeholder='Nombre' onChangeText={handleChange('nombre')} onBlur={handleBlur("nombre")} value={values.nombre} />

                  {
                    errors.nombre && touched.nombre && (
                        <View>
                            <Text>{errors.nombre}</Text>
                        </View>
                    )
                  }

                </View>
                <View className='gap-4'>
                  <Text className='text-2xl'>Direccion</Text>
                  <ThemeInput className="px-2" placeholder='Direccion' onChangeText={handleChange('direccion')} onBlur={handleBlur("direccion")} value={values.direccion} />
                </View>

                {
                  errors.direccion && touched.direccion && (
                      <View>
                          <Text>{errors.direccion}</Text>
                      </View>
                  )
                }

                <View className='gap-4'>
                  <Text className='text-2xl'>Selecciona un logo</Text>
                    <TouchableOpacity className='py-4 px-2 rounded-2xl bg-gray-100' onPress={() => pickImageAsync(setFieldValue)}>
                        <Text>Seleccionar un logo</Text>
                    </TouchableOpacity>
                </View>

                {
                  errors.logo && touched.logo && (
                      <View>
                          <Text>{errors.logo}</Text>
                      </View>
                  )
                }

                {values.logo && (
                    <Image source={{ uri: values.logo }} style={{ width: 200, height: 200 }} />
                )}

                <View className='gap-4'>
                  <Text className='text-2xl'>Agrega una descripcion</Text>
                  <ThemeInput
                    className="px-2"
                    placeholder='Descripción de la liga'
                    multiline
                    numberOfLines={4}
                    onChangeText={handleChange('descripcion')} value={values.descripcion} onBlur={handleBlur("descripcion")}
                  />
                </View>

                {
                  errors.descripcion && touched.descripcion && (
                      <View>
                          <Text>{errors.descripcion}</Text>
                      </View>
                  )
                }

                <View className='flex-row items-center justify-between mt-2'>

                  <Pressable onPress={()=>onDelete(league!.id!, resetForm())} className='w-[48%] border-light-textRed border-2 rounded-3xl p-3'>
                      <Text className='text-center text-light-textRed text-xl'>Borrar</Text>
                  </Pressable>

                  <Pressable onPress={submitForm} disabled={isSubmitting} className='w-[48%] rounded-3xl bg-light-primary p-3'>
                      <Text className='text-center text-white text-xl'>Agregar</Text>
                  </Pressable>

                </View>
              </>
            )
          }

         </Formik>
        </View>
      </KeyboardAwareScrollView>
    );
  }