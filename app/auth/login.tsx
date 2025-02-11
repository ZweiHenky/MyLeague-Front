import { View, Text, Image, Button, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import  Icon from '@expo/vector-icons/FontAwesome6'
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedFingerprint from '@/presentation/components/auth/fingerPrint';
import { Link, router } from 'expo-router';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';

export default function login() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [isPosting, setIsPosting] = useState(false)
    const [form, setForm] = useState({
      email:'',
      password:''
    })

    const { login } = useAuthStore()

    const onSubmit = async() =>{
      // router.replace("/(tabs)/home")

      const {email, password} = form

      if (email.length == 0 || password.length == 0) {
        return
      }

      setIsPosting(true)

      const wasSuccessful = await login(email, password)

      setIsPosting(false)

      if (wasSuccessful) {
        router.replace('/home')
        return
      }

      Alert.alert('Error:', 'Las credenciales no son correctas')

    }

  return (
    <View className='mt-20'>
      <View className='w-full items-center'>
        <Image className='w-[50%] h-[100]' resizeMode="contain" source={require("@/assets/images/logo.png")} />
        <Text className='text-xl'>Bienvenido a My League</Text>

        <Pressable className='rounded-full mt-10 '>
          <AnimatedFingerprint />
        </Pressable>
        
        <View className='w-[90%] gap-6 py-2 mt-7'>

            <Text className='text-4xl'>Inicio de Sesion</Text>

            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="envelope" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[90%]' value={form.email} placeholder='Ingrese su correo' onChangeText={(value)=> setForm({...form, email:value})} />
            </View>

            <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                <View className='pl-3 w-[10%]'>
                    <Icon name="lock" size={18} color={"#787878"} />
                </View>
                <ThemeInput className='w-[80%]' value={form.password} placeholder='Ingresa tu contraseña' secureTextEntry={true} onChangeText={(value)=> setForm({...form, password:value})} />
            </View>

            <Pressable onPress={onSubmit} disabled={isPosting}>
                <Text className='w-full bg-light-primary p-4 rounded-3xl text-center text-xl text-white'>Ingresar</Text>
            </Pressable>

            <Text className='text-center'><Link href={"/auth/register"}>No tienes cuenta?, Registrate</Link></Text>
        </View>

      </View>
    </View>
  )
}