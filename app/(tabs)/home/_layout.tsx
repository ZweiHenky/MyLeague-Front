import Header from '@/presentation/components/home/header';
import { Ionicons, Feather, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome6'
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputSearch from '@/presentation/components/home/inputSearch';

export default function _layout ()  {
    
  return (
  <>
    <LinearGradient
        colors={['#2DAFE5','#12203F']}
        style={{position:'absolute',height:'30%', right:-350 , width:'300%'}}
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        locations={[0,1]}
    >
    </LinearGradient>
    <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor='transparent'  style="light" />
        <Stack
            screenOptions={{
                
            }}
        >
            <Stack.Screen name='index' 
                options={
                    {
                        title:"Inicio",
                        header:() => {
                    
                            return (
                                <View >
                                <LinearGradient
                                    colors={['#2DAFE5','#12203F']}
                                    style={{position:'absolute',height:'100%', right:-350 , width:'300%'}}
                                    start={{x:0, y:0}}
                                    end={{x:1, y:0}}
                                    locations={[0,1]}
                                >
                                </LinearGradient>
        
                                    <View className='flex-row items-center px-5 py-4 gap-5 justify-between'>
                                        <Text className='text-white'>Lago Cuitzeo 107</Text>
        
                                        <Pressable onPress={()=> router.replace("../../auth/login")}>
                                            <View className="relative px-4 py-3 ">
                                                <SimpleLineIcons name="login" size={22} color="white" />
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View className="bg-[#F5F7F938] w-[95%] mx-auto rounded-[25px] px-5 py-[5px] mb-4 flex-row items-center gap-1 " >
                                        <Feather name='search' size={24} color="white" />
                                        
                                        <InputSearch />
                                    </View> 
                                </View>
                            
                            
                            )
                        },
                    }
                }
            />
            
        </Stack>

    </SafeAreaView>
  </>
    
  )
}
