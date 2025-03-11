import { View, Text, ScrollView, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import Icon from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useTeamStore } from "@/presentation/store/team/useTeamStore";
import { useAuthStore } from "@/presentation/store/auth/useAuthStore";
import Loading from "@/presentation/components/auth/loading";
import RequireAuthenticated from "@/presentation/components/auth/requireAuthenticated";
import CardAnimation from "@/presentation/components/team/cardAnimation";

export default function Index() {

  const {height} = useWindowDimensions()

  const { checkStatus, status,user } = useAuthStore()
  const { teams, saveTeams } = useTeamStore()

  useEffect(() => {
    checkStatus()
  }, [])

  useEffect(() => {
    if (user?.id) {
      saveTeams(user.id)
    }
  }, [user])


  if (status == "checking" ) {
    return <Loading />
  }

  if (status == "unauthenticated") {
    return <RequireAuthenticated />
  }

  return (
    <>
    <Pressable className='p-3 w-14 h-14 bg-light-primary rounded-full justify-center items-center absolute right-3 bottom-3 z-50' onPress={() => router.push("/teams/addTeam")}>
      <Icon name='plus' size={24} color="white" />
    </Pressable>
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 50,
      }}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >

      {
          teams.length > 0 
          ? 
            teams.map((team) => <CardAnimation key={team.id} team={team}/>)
          : 
            <View className={`justify-center h-[${height}]`}>
              <Text className="text-2xl text-light-primary text-center">Todavia no hay equipos, haz click en el boton de mas para crear uno nuevo</Text>
            </View>
      }
    </ScrollView>
    </>
  );
}