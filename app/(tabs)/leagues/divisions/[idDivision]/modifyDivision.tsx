import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { router, useLocalSearchParams } from 'expo-router'
import { addDivisionSchema } from '@/infraestructure/schemas/addDivisionSchema'
import { useDivisionStore } from '@/presentation/store/division/useDivisionStore'
import { DivisionInterface } from '@/infraestructure/interfaces/divisions.interface'
import { toast } from 'sonner-native'
import { useDivision } from '@/hooks/divisions/useDivision'
import { useDivisionMutation } from '@/hooks/divisions/useDivisionMutation'

export default function ModifyDivision() {

    const {idDivision} = useLocalSearchParams()

    const {divisionIdQuery} = useDivision({idDivision:Number(idDivision)})

    const { mutateUpdateDivision, mutateDeleteDivision } = useDivisionMutation()


    const onDelete = async() =>{
        mutateDeleteDivision.mutate({idDivision:Number(idDivision)})
    }


  return (
    <KeyboardAwareScrollView
            extraScrollHeight={10} // Espacio adicional para evitar superposición
            enableOnAndroid={true} // Habilitar en Android
            contentContainerStyle={{ flexGrow: 1, paddingBottom:5 }}
            showsVerticalScrollIndicator={false}
        >
            <View className='p-5 gap-5 mb-10'>
                <Formik
                    initialValues={{
                        nombre: divisionIdQuery.data?.data.nombre,
                        premio:String(divisionIdQuery.data?.data.premio),
                        descripcion:divisionIdQuery.data?.data.descripcion,
                        arbitraje:String(divisionIdQuery.data?.data.arbitraje)
                    }}
                    validationSchema={addDivisionSchema}
    
                    onSubmit={async(values, actions)=>{

                        mutateUpdateDivision.mutate({idDivision:Number(idDivision), nombre:values.nombre, premio:Number(values.premio), arbitraje:Number(values.arbitraje), descripcion:values.descripcion, idLiga:divisionIdQuery.data?.data.liga.id})

                        actions.resetForm()
                        actions.setSubmitting(false)
                    }}  
                    enableReinitialize={true}
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
    
                            <Pressable onPress={onDelete} disabled={mutateDeleteDivision.isPending} style={{opacity: mutateDeleteDivision.isPending ? 0.5 : 1}} className='w-[48%] border-light-textRed border-2 rounded-3xl p-3'>
                                <Text className='text-center text-light-textRed text-xl'>Eliminar</Text>
                            </Pressable>
    
                            <Pressable onPress={submitForm} disabled={mutateUpdateDivision.isPending} className='w-[48%] rounded-3xl bg-light-primary p-3' style={{opacity: mutateUpdateDivision.isPending ? 0.5 : 1}}>
                                <Text className='text-center text-white text-xl'>Actualizar</Text>
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