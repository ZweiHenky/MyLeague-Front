import Header from '@/presentation/components/home/header';
import { Ionicons, Feather, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome6'
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

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
            <Stack.Screen name='[idLiga]' 
                options={
                    {
                        title:"Inicio",
                        header:() => {
                    
                            return (
                                <Header>
                                    <Pressable className='flex-row items-center gap-2 p-3' onPress={()=>router.replace("/(tabs)/home")}>
                                        <Icon name='arrow-left' size={28} color="white" />
                                    </Pressable>
    
                                    <View className='flex-row items-center gap-2'>
                                        <Image 
                                            source={{uri:'https://res.cloudinary.com/duyh7uidy/image/upload/v1741102480/e11oimpnz5hawd6zxc8l.jpg'}} 
                                            width={40}
                                            height={40}
                                            className='rounded-full'
                                        />
                                        <Text className='text-white text-2xl font-bold'>Liga de Futbol</Text>
                                    </View>
    
                                    <View className='flex-row items-center gap-2 mt-4'>
                                        <Text className='text-white text-xl'>Division:</Text>
                                        <View className='bg-[#F5F7F938] rounded-[25px] h-10 justify-center'>
                                            <Picker
                                                style={{width:120, color:'white'}}
                                                selectedValue={1}
                                                onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
                                            >
                                                <Picker.Item style={{fontSize:14}} label="Opcion 1" value="1" />
                                                <Picker.Item label="Opcion 2" value="2" />
                                                <Picker.Item label="Opcion 3" value="3" />
                                            </Picker>
                                        </View>
                                    </View>
                                </Header>
                            
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
