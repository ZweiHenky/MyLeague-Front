import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { addLeagueSchema } from '@/infraestructure/schemas/addLeagueSchema';
import { pickImageAsync } from '@/helpers/images/pickImageAsync';
import { router } from 'expo-router';
import { uploadImage } from '@/helpers/images/uploadImage';
import { toast } from 'sonner-native';
import { useLeagueStore } from '@/presentation/store/league/useLeagueStore';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import { GooglePlacesInput } from '@/presentation/components/league/googlePlaceInput';

const initialValues ={
  nombre:'',
  direccion:'',
  logo:'',
  descripcion:''
}

export default function AddLeague() {

  const {user} = useAuthStore()
  const {newLeague} = useLeagueStore()

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={10} // Espacio adicional para evitar superposición
        enableOnAndroid={true} // Habilitar en Android
        contentContainerStyle={{ flexGrow: 1, paddingBottom:5 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='p-5 gap-5 mb-10'>
         <Formik
          initialValues={initialValues}
          validationSchema={addLeagueSchema}

          onSubmit={async(values, actions)=>{

            const res = await uploadImage(values.logo)

            if (!res.status) {
                toast.error("Error al subir la imagen")
                return
            }

            const resStore = await newLeague(values.nombre, values.direccion, values.descripcion, res.url, user!.id!)

            if (!resStore.status) {
              toast.error("ocurrio un error al crear la liga")
              return
            }

            toast.success("La liga se creo con exito")

            router.back()
            
            actions.setSubmitting(false)
          }}  
         >

          {
            ({handleChange, submitForm, touched, errors, isSubmitting, setFieldValue, values, handleBlur})=>(
              <>
                <View className='gap-4'>
                  <Text className='text-2xl'>Nombre de la liga</Text>
                  <ThemeInput className="px-2 bg-white" placeholder='Nombre' onChangeText={handleChange('nombre')} onBlur={handleBlur("nombre")} value={values.nombre} />

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
                  <GooglePlacesInput 
                    onPlaceSelected={(data, details) => {
                      // Actualiza el valor del campo "direccion" en Formik con la dirección seleccionada
                      setFieldValue('direccion', data.description);
                    }}
                  />
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
                    <TouchableOpacity className='py-4 px-2 rounded-2xl bg-white' onPress={() => pickImageAsync(setFieldValue)}>
                        <Text>Haz click para seleccionar un logo</Text>
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
                    className="px-2 bg-white"
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

                  <Pressable onPress={()=> router.back()} className='w-[48%] border-light-textRed border-2 rounded-3xl p-3'>
                      <Text className='text-center text-light-textRed text-xl'>Cancelar</Text>
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