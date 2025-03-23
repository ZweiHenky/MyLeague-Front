import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import { useLeagueStore } from '@/presentation/store/league/useLeagueStore';
import Loading from '@/presentation/components/auth/loading';
import RequireAuthenticated from '@/presentation/components/auth/requireAuthenticated';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/FontAwesome6";
import CardAnimation from '@/presentation/components/divisions/cardAnimation';
import { router, useLocalSearchParams } from 'expo-router';
import { useDivisionStore } from '@/presentation/store/division/useDivisionStore';
import { useDivision } from '@/hooks/divisions/useDivision';

export default function index() {
    const { checkStatus, status, user } = useAuthStore();
    const { idLiga } = useLocalSearchParams()

    const { divisionQuery } = useDivision({ idLiga: Number(idLiga) })
  
    useEffect(() => {
      checkStatus();
    }, []);

    if (status === 'checking') {
      return <Loading />
    }
  
    if (status === 'unauthenticated') {
      return <RequireAuthenticated />
    }
      
    if (divisionQuery.isLoading) {
      return <Loading />
    }
  
  
    return (
      <>
        <Pressable className='p-3 w-12 bg-light-primary rounded-full items-center absolute right-3 bottom-12 z-50' onPress={() => router.push(`/leagues/divisions/${idLiga}/addDivision`)}>
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
              divisionQuery.data!.data!.length > 0 
              ?
              divisionQuery.data?.data!.map((division, index) => (
                  <CardAnimation key={division.id} division={division} />
                ))
              :
                <View className={`justify-center h-[100%]`}>
                  <Text className="text-2xl text-light-primary text-center">Todavia no hay Divisiones, haz click en el boton de mas para crear uno nuevo</Text>
                </View>
          }
        </ScrollView>
      </>
  )
}