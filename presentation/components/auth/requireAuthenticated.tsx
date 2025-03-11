import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function RequireAuthenticated() {
  return (
    <View className="flex-1 items-center justify-center h-full gap-5 p-2">
      <Text className="text-3xl text-center">Para poder administrar una liga primero tienes que iniciar sesión</Text>
      <Pressable onPress={() => router.replace("/auth/login")} className="p-5 text-center rounded-xl bg-light-primary">
        <Text className="text-white text-xl">Iniciar Sesión</Text>
      </Pressable>
    </View>
  )
}