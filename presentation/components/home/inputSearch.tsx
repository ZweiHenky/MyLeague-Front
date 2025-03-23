import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, FlatList, Pressable } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import LeagueInterface from '@/infraestructure/interfaces/leagues.interface';
import { useLeague } from '@/hooks/leagues/useLeague';
import { useDebounce } from 'use-debounce';
import { router } from 'expo-router';

const InputSearch = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500); // 500ms de debounce
    const { queryLeagueByName } = useLeague({ nombre: debouncedQuery });

    const placeholder = queryLeagueByName.isLoading 
        ? 'Loading data...' 
        : queryLeagueByName.isError 
        ? 'Failed to load data' 
        : 'Enter league name';

    const filteredLeagues = queryLeagueByName.data || [];

    return (
        <View className='w-full relative z-50'>
            {/* Input de búsqueda */}
            <TextInput
                inputMode='search'
                placeholder={placeholder}
                placeholderTextColor="white"
                className='active:opacity-20'
                onChangeText={setQuery}
                autoFocus={false}
                style={{ color: "white", width: "95%" }}
                accessible={true}
                accessibilityLabel="Campo de búsqueda"
            />

            {/* Lista de ligas filtradas usando FlatList */}
            <FlatList
                data={filteredLeagues}
                keyExtractor={(league: LeagueInterface) => league.id.toString()}
                renderItem={({ item }) => (
                <Pressable className='p-4 h-20 justify-center active:bg-[#00000030]' onPress={() => router.push(`/home/${item.id}`) }>
                    <Text className='text-xl'>{item.nombre}</Text>
                </Pressable>
                )}
                keyboardShouldPersistTaps="always"
                className='absolute z-50 top-full right-5 mt-2 w-full bg-white rounded-xl'
            />
        </View>
    );
};

export default React.memo(InputSearch); // Evita re-renderizados innecesarios