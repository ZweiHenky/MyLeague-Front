import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import  Icon from '@expo/vector-icons/FontAwesome6'
import { Link, router } from 'expo-router';
import { Formik, FormikProps } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerSchema } from '@/infraestructure/schemas/registerSchema';
import { toast } from 'sonner-native';
import { authRegister } from '@/core/actions/auth-actions';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';

// export type RegisterType = InferType<typeof userSchema>;

export default function Register(){

    const { login, register } = useAuthStore()

    const initialValues = {
        email:'',
        nombre:'',
        apellido:'',
        telefono:'',
        password:'',
        password2:''
    }
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={20} // Ajusta este valor según sea necesario
        enableOnAndroid={false}
        enableAutomaticScroll={false}
      >
        <View className='mt-20'>
          <View className='w-full items-center'>
            <Image className='w-[50%] h-[100]' resizeMode="contain" source={require("@/assets/images/logo.png")} />
            <Text className='text-xl'>Bienvenido a My League</Text>
            
            <View className='w-[90%] gap-6 py-2 mt-7'>
                <Text className='text-4xl'>Registro</Text>
    
                <Formik 
                    initialValues={
                        initialValues
                    }
                    validationSchema={registerSchema}
                    onSubmit={async(values, actions) => {

                        const {email, apellido, nombre, password, telefono} = values

                        const res = await register(nombre, apellido, email, telefono, password)
                        
                        if (!res.status) {
                            
                            toast.error(res.message)
                            return
                        }

                        toast.success(res.message)
                        // toast.success("iniciando sesion...")

                        
                        const wasSuccessful = await login(email, password)
                
                        if (wasSuccessful) {
                            router.replace('/home')
                            return
                        }

                        actions.setSubmitting(false)
                        
                    }}
                    validateOnBlur={true}
                >
                    {({handleBlur, handleChange, values, submitForm, errors, isSubmitting, touched })  =>(
                        <>
                            <View className='flex-row justify-between'>
                                <View className='flex-row bg-gray-100 rounded-2xl items-center w-[48%]'>
                                    <View className='pl-3 w-[20%]'>
                                        <Icon name="user" size={18} color={"#787878"} />
                                    </View>
                                    <ThemeInput className='w-[80%]' autoCapitalize="words" value={values.nombre} onChangeText={handleChange("nombre")} onBlur={handleBlur("nombre")} placeholder='Nombre' />
                                </View>
                                <View className='flex-row bg-gray-100 rounded-2xl items-center w-[48%]'>
                                    <View className='pl-3 w-[20%]'>
                                        <Icon name="user" size={18} color={"#787878"} />
                                    </View>
                                    <ThemeInput className='w-[80%]' autoCapitalize="words" value={values.apellido} onChangeText={handleChange("apellido")} onBlur={handleBlur("apellido")} placeholder='Apellidos' />
                                </View>
                            </View>
                            
                            {
                                errors.nombre && touched.nombre && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.nombre}</Text>
                                    </View>
                                )
                            }
                            {
                                errors.apellido && touched.apellido && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.apellido}</Text>
                                    </View>
                                )
                            }
                
                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="envelope" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[90%]' value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")} placeholder='Ingrese su correo' />
                            </View>

                            {
                                errors.email && touched.email && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.email}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="phone" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[90%]' value={values.telefono} onChangeText={handleChange("telefono")} onBlur={handleBlur("telefono")} placeholder='Ingresa tu telefono' />
                            </View>

                            {
                                errors.telefono && touched.telefono && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.telefono}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="lock" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[80%]' value={values.password} onChangeText={handleChange("password")} onBlur={handleBlur("password")} placeholder='Ingresa tu contraseña' secureTextEntry={!confirmPasswordVisible ? true : false} />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                                </TouchableOpacity>
                            </View>

                            {
                                errors.password && touched.password && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.password}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="lock" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[80%]' value={values.password2} onChangeText={handleChange("password2")} onBlur={handleBlur("password2")} placeholder='Confirmar contraseña' secureTextEntry={!confirmPasswordVisible ? true : false} />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                                </TouchableOpacity>
                            </View>

                            {
                                errors.password2 && touched.password2 &&  (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.password2}</Text>
                                    </View>
                                )
                            }

                            <Pressable onPress={submitForm} disabled={isSubmitting}>
                                <Text className='w-full bg-light-primary p-4 rounded-3xl text-center text-xl text-white'>Registrarse</Text>
                            </Pressable>
                
                            <Text className='text-center'>
                                <Link href={"/auth/login"}>¿Ya tienes una cuenta? Inicia sesión</Link>
                            </Text>
                        </>
                    )}
                </Formik>   
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };