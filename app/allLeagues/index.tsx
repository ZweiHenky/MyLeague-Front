import { View, Text } from 'react-native'
import React from 'react'
import { FlatList, Pressable } from 'react-native-gesture-handler'
import { useLeague } from '@/hooks/leagues/useLeague'
import { ActivityIndicator } from 'react-native-paper'
import LeagueItemInfinity from '@/presentation/components/home/leagueItemInfinity'
import Loading from '@/presentation/components/auth/loading'

export default function index() {

    const {queryInfinityLeague} = useLeague({nombre : ""})

  return (
    <Pressable className='flex-1'>
      <FlatList 
        data={queryInfinityLeague.data?.pages.flat()}
        renderItem={({ item }) => <LeagueItemInfinity liga={item} />}
        onEndReached={() => {
            if (queryInfinityLeague.hasNextPage && !queryInfinityLeague.isFetchingNextPage) {
            queryInfinityLeague.fetchNextPage();
            }
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => {
            if (queryInfinityLeague.isFetchingNextPage) {
                return <View className='p-5'>
                            <Loading />
                        </View>
            }
            return null;

        }}
        keyExtractor={(item, index) => index.toString()} // Asegura que cada item tenga una clave única
        />
    </Pressable>
  )
}