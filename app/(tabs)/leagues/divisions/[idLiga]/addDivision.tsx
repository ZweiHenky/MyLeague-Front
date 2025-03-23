import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { addDivisionSchema } from '@/infraestructure/schemas/addDivisionSchema'
import { useDivisionMutation } from '@/hooks/divisions/useDivisionMutation'

const initialValues ={
    nombre:'',
    premio:'',
    arbitraje:'',
    descripcion:''
  }

export default function addDivision() {
    const {user} = useAuthStore()
    const { idLiga } = useLocalSearchParams()
     const { mutateNewDivision } = useDivisionMutation()
  
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
                validationSchema={addDivisionSchema}

                onSubmit={async(values, actions)=>{
                    
                    mutateNewDivision.mutate( {nombre:values.nombre, arbitraje:Number(values.arbitraje), premio:Number(values.premio), descripcion:values.descripcion, idLiga:Number(idLiga)} )

                    actions.setSubmitting(false)
                    
                }}  
            >

            {
                ({handleChange, submitForm, touched, errors, isSubmitting, values, handleBlur})=>(
                <>
                    <View className='gap-4'>
                        <Text className='text-2xl'>Nombre de la division</Text>
                        <ThemeInput className="px-2" placeholder='Nombre de la division' onChangeText={handleChange('nombre')} onBlur={handleBlur("nombre")} value={values.nombre} />

                        {
                            errors.nombre && touched.nombre && (
                                <View>
                                    <Text>{errors.nombre}</Text>
                                </View>
                            )
                        }

                    </View>
                    <View className='gap-4'>
                        <Text className='text-2xl'>Arbitraje por partido</Text>
                        <ThemeInput className="px-2" keyboardType="numeric" placeholder='250' onChangeText={handleChange('arbitraje')} onBlur={handleBlur("arbitraje")} value={values.arbitraje} />

                        {
                            errors.arbitraje && touched.arbitraje && (
                                <View>
                                    <Text>{errors.arbitraje}</Text>
                                </View>
                            )
                        }

                    </View>
                    <View className='gap-4'>
                        <Text className='text-2xl'>Premio al ganador</Text>
                        <ThemeInput className="px-2" keyboardType="numeric" placeholder='20000' onChangeText={handleChange('premio')} onBlur={handleBlur("premio")} value={values.premio} />

                        {
                            errors.premio && touched.premio && (
                                <View>
                                    <Text>{errors.premio}</Text>
                                </View>
                            )
                        }

                    </View>

                    <View className='gap-4'>
                        <Text className='text-2xl'>Agrega una descripcion</Text>
                        <ThemeInput
                            className="px-2"
                            placeholder='Descripción de la division'
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

                        <Pressable onPress={submitForm} disabled={mutateNewDivision.isPending} className='w-[48%] rounded-3xl bg-light-primary p-3'  style={{opacity: mutateNewDivision.isPending ? 0.5 : 1}}>
                            <Text className='text-center text-white text-xl'>Agregar</Text>
                        </Pressable>

                    </View>
                </>
                )
            }

            </Formik>
        </View>
    </KeyboardAwareScrollView>
    )
}