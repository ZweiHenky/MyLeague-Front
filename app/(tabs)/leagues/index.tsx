import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ligaInterface from "@/infraestructure/interfaces/ligas";
import Icon from "@expo/vector-icons/FontAwesome6";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAuthStore } from "@/presentation/store/auth/useAuthStore";
import { Redirect, router } from "expo-router";

const ligas: ligaInterface[] = [
  {
    name: "Cefort Neza",
    division: "Masculino",
    descripcion: "Liga de fútbol 7",
    premio: "20000",
    logo: "logo",
    id: 1,
    direccion: "Bordo y Sor Juana",
  },
  {
    name: "Liga Elite",
    division: "Femenino",
    descripcion: "Liga de fútbol 11",
    premio: "15000",
    logo: "logo",
    id: 2,
    direccion: "Av. Central",
  },
  {
    name: "Fútbol Express",
    division: "Mixto",
    descripcion: "Liga de fútbol rápido",
    premio: "10000",
    logo: "logo",
    id: 3,
    direccion: "Zona Centro",
  },
];

export default function Index() {

  const {checkStatus, status} = useAuthStore()
    // 🔹 Creamos un array de sharedValues para cada tarjeta
  const animations = useRef(ligas.map(() => useSharedValue(0))).current;

  // 🔹 Mueve solo la tarjeta seleccionada
  const moveAnimation = (index: any) => {
    const translateX = animations[index];
    translateX.value = translateX.value === 250 ? withTiming(0) : withTiming(250);
  };

  useEffect(() => {
    
    checkStatus()

  }, [])

  if (status === 'checking') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    // Guardar la ruta del usuario
    return (
      <View className="flex-1 items-center justify-center h-full gap-5 p-2">
        <Text className="text-3xl text-center"> Para poder administrar una liga primero tienes que iniciar sesion </Text>
        <Pressable onPress={() => router.replace("/auth/login")} className="p-5 text-center rounded-xl bg-light-primary">
            <Text className="text-white text-xl">Iniciar Sesion</Text>
        </Pressable>
      </View>
    )
  }
  


return (
  <ScrollView
    contentContainerStyle={{
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 50,
    }}
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={false}
  >
    {ligas.map((liga, index) => {
      // 🔹 Animación específica para cada tarjeta
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: animations[index].value }],
      }));

      return (
        <View key={liga.id} className="justify-between gap-4 w-[90%] mb-10">
          {/* Botones de fondo */}
          <View className="absolute w-full bg-light-primary gap-5 h-full flex-row -z-10 rounded-xl items-center px-5">
            <View className="items-center gap-1">
              <Icon name="trash" color="white" size={18} />
              <Text className="text-white">Eliminar</Text>
            </View>
            <View className="w-[0.3%] h-[60%] bg-white" />
            <View className="items-center gap-1">
              <Icon name="pen-to-square" color="white" size={18} />
              <Text className="text-white">Editar</Text>
            </View>
            <View className="w-[0.3%] h-[60%] bg-white" />
            <View className="items-center gap-1">
              <Icon name="calendar-days" color="white" size={18} />
              <Text className="text-white">Jornadas</Text>
            </View>
          </View>

          {/* Contenido animado */}
          <Animated.View style={[animatedStyle]} className="bg-white rounded-xl p-5">
            <Pressable
              className="w-full p-3 rounded-xl h-full absolute z-50"
              onPress={() => moveAnimation(index)}
            />
            <View className="flex-row gap-3 items-center">
              <Image source={require("@/assets/images/favoritos/NE.png")} className="w-20 h-20 items-center rounded-lg" />
              <View>
                <Text className="text-3xl font-bold">{liga.name}</Text>
                <View className="flex-row gap-1 pt-2 items-center">
                  <Icon name="filter" size={16} />
                  <Text> Division: {liga.division}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      );
    })}
  </ScrollView>
);
}
