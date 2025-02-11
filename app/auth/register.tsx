import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import  Icon from '@expo/vector-icons/FontAwesome6'
import { Link } from 'expo-router';

export default function register() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View className='mt-20'>
      <View className='w-full items-center'>
        <Image className='w-[50%] h-[100]' resizeMode="contain" source={require("@/assets/images/logo.png")} />
        <Text className='text-xl'>Bienvenido a My League</Text>
        
        <View className='w-[90%] gap-6 py-2 mt-7'>

            <Text className='text-4xl'>Registro</Text>

            <View className=' flex-row justify-between'>
                <View className='flex-row bg-gray-100 rounded-2xl items-center w-[48%]'>
                    <View className='pl-3 w-[20%]'>
                        <Icon name="user" size={18} color={"#787878"} />
                    </View>
                    <ThemeInput className='w-[80%]' value='' placeholder='Nombre' />
                </View>
                <View className='flex-row bg-gray-100 rounded-2xl items-center w-[48%]'>
                    <View className='pl-3 w-[20%]'>
                        <Icon name="user" size={18} color={"#787878"} />
                    </View>
                    <ThemeInput className='w-[80%]' value='' placeholder='Apellidos' />
                </View>
            </View>

            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="envelope" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[90%]' value='' placeholder='Ingrese su correo' />
            </View>
            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="phone" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[90%]' value='' placeholder='Ingresa tu telefono' />
            </View>
            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="lock" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[80%]' value='' placeholder='Ingresa tu contraseña' secureTextEntry={true} />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                </TouchableOpacity>
            </View>
            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="lock" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[80%]' value='' placeholder='Confirmar contraseña' secureTextEntry={true} />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="w-[10%] pr-3">
                    <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={18} color={"#787878"} />
                </TouchableOpacity>
            </View>

            <Pressable>
                <Text className='w-full bg-light-primary p-4 rounded-3xl text-center text-xl text-white'>Regitrarse</Text>
            </Pressable>

             <Text className='text-center'><Link href={"/auth/login"}>No tienes cuenta?, Registrate</Link></Text>
        </View>

      </View>
    </View>
  )
}