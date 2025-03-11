import { View, Text, ScrollView, Pressable} from "react-native";
import React, { useEffect,  } from "react";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useAuthStore } from "@/presentation/store/auth/useAuthStore";
import { router } from "expo-router";
import RequireAuthenticated from "@/presentation/components/auth/requireAuthenticated";
import Loading from "@/presentation/components/auth/loading";
import CardAnimation from "@/presentation/components/league/cardAnimation";
import { useLeagueStore } from "@/presentation/store/league/useLeagueStore";

export default function Index() {
  const { checkStatus, status, user } = useAuthStore();
  const { leagues, saveLeagues } = useLeagueStore()

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (user?.id) {
      saveLeagues(user.id)
    }
  }, [user])

  if (status === 'checking') {
    return <Loading />
  }

  if (status === 'unauthenticated') {
    return <RequireAuthenticated />
  }

  return (
    <>
      <Pressable className='p-3 w-12 bg-light-primary rounded-full items-center absolute right-3 bottom-3 z-50' onPress={() => router.push("/leagues/addLeague")}>
        <Icon name='plus' size={18} color="white" />
      </Pressable>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 50
        }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        

        {
          leagues.length > 0 
          ?
            leagues.map((league, index) => (
              <CardAnimation key={league.id} league={league} />
            ))
          :
            <View className={`justify-center h-[100%]`}>
              <Text className="text-2xl text-light-primary text-center">Todavia no hay ligas, haz click en el boton de mas para crear uno nuevo</Text>
            </View>
        }
      </ScrollView>
    </>
  );
}