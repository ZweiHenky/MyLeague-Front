import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from '@expo/vector-icons/FontAwesome6'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import { router } from 'expo-router'

export default function index() {

  const {logOut, user, status, checkStatus} = useAuthStore()

  useEffect(() => {
    checkStatus()
  }, [])
  

  return (
    <View className='flex-1'>
      <ScrollView className='flex-1'>
      {
        status == "authenticated" && (
          <View className='flex-row w-[90%] items-center p-5 mx-auto bg-white mt-5 justify-between rounded-xl'>
            <View className='flex-row gap-3 items-center'>
              <Icon name='id-card' size={18} color='black' />
              <Text className='text-xl'>{user!.usu_name}</Text>
            </View>
            <Icon name='caret-right' size={20} color='black' />
          </View>
        )
      }


        <View className='bg-white w-[90%] gap-4 mx-auto mt-5 rounded-xl'>

          <Pressable className='flex-row w-full mt-5 items-center p-5 mx-auto bg-white justify-between rounded-xl'>
            <View className='flex-row gap-3 items-center'>
              <Icon name='credit-card' size={18} color='black' />
              <Text className='text-lg'>Plan actual: Gratuito</Text>
            </View>
            <Icon name='caret-right' size={20} color='black' />
          </Pressable>

          <View className='w-[90%] bg-light-primary h-[0.8px] mx-auto' />

          <Pressable className='flex-row w-full items-center p-5 mx-auto bg-white justify-between rounded-xl'>
            <View className='flex-row gap-3 items-center'>
              <Icon name='moon' size={18} color='black' />
              <Text className='text-lg'>Modo Oscuro</Text>
            </View>
            <Icon name='caret-right' size={20} color='black' />
          </Pressable>

          <View className='w-[90%] bg-light-primary h-[0.8px] mx-auto' />

          <Pressable className='flex-row w-full items-center p-5 mx-auto bg-white justify-between rounded-xl'>
            <View className='flex-row gap-3 items-center'>
              <Icon name='shield-halved' size={18} color='black' />
              <Text className='text-lg'>Politicas de privacidad</Text>
            </View>
            <Icon name='caret-right' size={20} color='black' />
          </Pressable>

          <View className='w-[90%] bg-light-primary h-[0.8px] mx-auto' />

          <Pressable className='flex-row w-full items-center p-5 mx-auto bg-white justify-between rounded-xl'>
            <View className='flex-row gap-3 items-center'>
              <Icon name='file-lines' size={18} color='black' />
              <Text className='text-lg'>Terminos y condiciones</Text>
            </View>
            <Icon name='caret-right' size={20} color='black' />
          </Pressable>

          <View className='w-[90%] bg-light-primary h-[0.8px] mx-auto' />

          {
            status == "authenticated" && (
              <>
                <Pressable onPress={logOut} className='flex-row w-full items-center p-5 mx-auto bg-white justify-between rounded-xl'>
                  <View className='flex-row gap-3 items-center'>
                    <Icon name='right-from-bracket' size={18} color='black' />
                    <Text className='text-lg'>Cerrar sesion</Text>
                  </View>
                  <Icon name='caret-right' size={20} color='black' />
                </Pressable>

                <View className='w-[90%] bg-light-primary h-[0.8px] mx-auto' />

                <Pressable className='flex-row w-full items-center mb-3 p-5 mx-auto bg-white justify-between rounded-xl'>
                  <View className='flex-row gap-3 items-center'>
                    <Icon name='trash' size={18} color='black' />
                    <Text className='text-lg'>Eliminar Cuenta</Text>
                  </View>
                  <Icon name='caret-right' size={20} color='black' />
                </Pressable>
              </>
            ) 
          }

          {
            status === "unauthenticated" &&
            <Pressable onPress={ () => router.replace("/auth/login")} className='flex-row w-full items-center mb-3 p-5 mx-auto bg-white justify-between rounded-xl'>
              <View className='flex-row gap-3 items-center'>
                <Icon name='right-to-bracket' size={18} color='black' />
                <Text className='text-lg'>Iniciar Sesion</Text>
              </View>
              <Icon name='caret-right' size={20} color='black' />
            </Pressable>
          }

        </View>
      </ScrollView>
    </View>
  )
}