import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import  Icon from '@expo/vector-icons/FontAwesome6'
import { Link } from 'expo-router';
import { Formik, FormikProps } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InferType } from 'yup';
import { registerSchema } from '@/infraestructure/schemas/registerSchema';
import { authRegister } from '@/core/actions/auth-actions';
import { toast } from 'sonner-native';

// export type RegisterType = InferType<typeof userSchema>;

export default function Register(){
    const initialValues = {
        usu_email:'',
        usu_name:'',
        usu_last:'',
        usu_tel:'',
        usu_pass:'',
        usu_pass2:''
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

                        // const {usu_email, usu_last, usu_name, usu_pass, usu_tel} = values

                        // await authRegister(usu_name, usu_last, usu_email, usu_tel, usu_pass)
                        toast.success("haciendo click")

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
                                    <ThemeInput className='w-[80%]' value={values.usu_name} onChangeText={handleChange("usu_name")} onBlur={handleBlur("usu_name")} placeholder='Nombre' />
                                </View>
                                <View className='flex-row bg-gray-100 rounded-2xl items-center w-[48%]'>
                                    <View className='pl-3 w-[20%]'>
                                        <Icon name="user" size={18} color={"#787878"} />
                                    </View>
                                    <ThemeInput className='w-[80%]' value={values.usu_last} onChangeText={handleChange("usu_last")} onBlur={handleBlur("usu_last")} placeholder='Apellidos' />
                                </View>
                            </View>
                            
                            {
                                errors.usu_name && touched.usu_name && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_name}</Text>
                                    </View>
                                )
                            }
                            {
                                errors.usu_last && touched.usu_last && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_last}</Text>
                                    </View>
                                )
                            }
                
                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="envelope" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[90%]' value={values.usu_email} onChangeText={handleChange("usu_email")} onBlur={handleBlur("usu_email")} placeholder='Ingrese su correo' />
                            </View>

                            {
                                errors.usu_email && touched.usu_email && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_email}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="phone" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[90%]' value={values.usu_tel} onChangeText={handleChange("usu_tel")} onBlur={handleBlur("usu_tel")} placeholder='Ingresa tu telefono' />
                            </View>

                            {
                                errors.usu_tel && touched.usu_tel && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_tel}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="lock" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[80%]' value={values.usu_pass} onChangeText={handleChange("usu_pass")} onBlur={handleBlur("usu_pass")} placeholder='Ingresa tu contraseña' secureTextEntry={!confirmPasswordVisible ? true : false} />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                                </TouchableOpacity>
                            </View>

                            {
                                errors.usu_pass && touched.usu_pass && (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_pass}</Text>
                                    </View>
                                )
                            }

                            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                                <View className='pl-3 w-[10%]'>
                                    <Icon name="lock" size={18} color={"#787878"} />
                                </View>
                                <ThemeInput className='w-[80%]' value={values.usu_pass2} onChangeText={handleChange("usu_pass2")} onBlur={handleBlur("usu_pass2")} placeholder='Confirmar contraseña' secureTextEntry={!confirmPasswordVisible ? true : false} />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                                </TouchableOpacity>
                            </View>

                            {
                                errors.usu_pass2 && touched.usu_pass2 &&  (
                                    <View>
                                        <Text className='text-light-textRed'>{errors.usu_pass2}</Text>
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