import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ligaInterface from "@/infraestructure/interfaces/ligas";
import Icon from "@expo/vector-icons/FontAwesome6";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import TeamInterface from "@/infraestructure/interfaces/teams";

const equipos: TeamInterface[] = [
  {
    name: "Cefort Neza",
    logo: "logo",
    id: 1,
    playes:10
  },
  {
    name: "Liga Elite",
    logo: "logo",
    id: 2,
    playes:8
  },
  {
    name: "Fútbol Express",
    logo: "logo",
    id: 3,
    playes:15
  },
];
export default function Index() {
  // 🔹 Creamos un array de sharedValues para cada tarjeta
  const animations = useRef(equipos.map(() => useSharedValue(0))).current;

  // 🔹 Mueve solo la tarjeta seleccionada
  const moveAnimation = (index: any) => {
    const translateX = animations[index];
    translateX.value =
      translateX.value === 170 ? withTiming(0) : withTiming(170);
  };

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
      {equipos.map((equipo, index) => {
        // 🔹 Animación específica para cada tarjeta
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateX: animations[index].value }],
        }));

        return (
          <View key={equipo.id} className="justify-between gap-4 w-[90%] mb-10">
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
            </View>

            {/* Contenido animado */}
            <Animated.View style={[animatedStyle]} className="bg-white rounded-xl p-5">
              <Pressable
                className="w-full p-3 rounded-xl h-full absolute z-50"
                onPress={() => moveAnimation(index)}
              />
              <View className="flex-row gap-3 items-center">
                <Image
                  source={require("@/assets/images/favoritos/NE.png")}
                  className="w-20 h-20 items-center rounded-lg"
                />
                <View>
                  <Text className="text-3xl font-bold">{equipo.name}</Text>
                  <View className="flex-row gap-1 pt-2 items-center">
                    <Icon name="users" size={16} />
                    <Text> Jugadores: {equipo.playes}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        );
      })}
      <Pressable className="bg-light-primary p-4 rounded-2xl w-[90%] self-center mx-auto">
        <Text className="text-center text-white text-xl">Agregar Equipo</Text>
      </Pressable>
    </ScrollView>
  );
}