import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Formik } from 'formik'
import { toast } from 'sonner-native'
import { addTeamSchema } from '@/infraestructure/schemas/addTeamSchema'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { uploadImage } from '@/helpers/images/uploadImage'
import { pickImageAsync } from '@/helpers/images/pickImageAsync'
import { useTeamStore } from '@/presentation/store/team/useTeamStore'
import TeamInterface from '@/infraestructure/interfaces/teams.interface'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'

export default function ModifyTeam() {

  const { id } = useLocalSearchParams()

  const { teams, updateTeam, deleteTeam } = useTeamStore()
  const { user } = useAuthStore()

  const [team, setTeam] = useState<TeamInterface | null>(null)

  useEffect(() => {

    const team = teams.find(team => team.id == Number(id))

    setTeam(team || null)

  }, [teams])

  const onDelete = async(id:string) =>{
    const res = await deleteTeam(id)

    if (!res) {
      toast.error("Ocurrio un error al intentar eliminar el equipo")
    }

    toast.success("Se borro con exito")
    router.back()
  }
  

  return (
    <View className='p-5 gap-5 bg-white h-full'>
      <Formik 
          initialValues={{
            nombre:team?.nombre,
            logo:team?.logo
          }}
          validationSchema={addTeamSchema}
          enableReinitialize={true}
          onSubmit={async(values, actions)=>{   

            const comparationImage = values.logo == team?.logo  

            try {
              let restStore
              if (!comparationImage) {
                const res = await uploadImage(values.logo!)
  
                if (!res.status) {
                    toast.error("Error al subir la imagen")
                    return
                }
  
                restStore = await updateTeam(values.nombre!, res.url, user!.id!, id.toString())
              }else{
                restStore = await updateTeam(values.nombre!, values.logo!, user!.id!, id.toString())
              }

                if (restStore) {
                  toast.success("Se actualizo con exito")
                  router.back()
                }else{
                  toast.error("Ocurrio un problema al actualizar")  
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
              ({isSubmitting, values, errors, handleChange, submitForm, setFieldValue, touched}) =>(
                  <>
                      <View className='gap-4'>
                          <Text className='text-2xl'>Nombre de la liga</Text>
                          <ThemeInput className="px-2 w-full" placeholder='Introduzca el nombre del equipo...' autoCapitalize="words" onChangeText={handleChange("nombre")} value={values.nombre} />
                      </View>
                      {
                          errors.nombre && touched.logo && (
                              <View>
                                  <Text>{errors.nombre}</Text>
                              </View>
                          )
                      }
                      <View className='gap-4'>
                          <Text className='text-2xl'>Logo de la liga</Text>
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

                      <View className='flex-row items-center justify-between '>

                          <Pressable onPress={()=> onDelete(id.toString())} className='w-[48%] border-light-textRed border-2 rounded-3xl p-3 z-100'>
                              <Text className='text-center text-light-textRed text-xl'>Eliminar</Text>
                          </Pressable>

                          <Pressable onPress={submitForm} disabled={isSubmitting} className='w-[48%] rounded-3xl bg-light-primary p-3'>
                              <Text className='text-center text-white text-xl'>Actualizar</Text>
                          </Pressable>

                      </View>
                  </>
              )
          }
      </Formik>
    </View>
  )
}