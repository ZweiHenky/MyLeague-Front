import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import Icon from '@expo/vector-icons/FontAwesome6'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'

export default function _layout() {

  const {status, checkStatus} = useAuthStore()

  useEffect(() => {
    // checkStatus()
  }, [])
  

  return (
    <Stack
      screenOptions={{
        headerShadowVisible:false,
      }}
    >
        <Stack.Screen 
            name='index'
            options={{
                headerTitleAlign:"center",
                title:"Mis Ligas",
                headerRight: () => {
                    return(
                      <View className='p-3 w-12 bg-light-primary rounded-full items-center'>
                        <Icon name='plus' size={18} color="white" />
                      </View>
                    )
                },
            }}
        />
    </Stack>
  )
}