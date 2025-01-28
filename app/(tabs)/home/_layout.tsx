import { Ionicons, Feather, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome6'
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _layout ()  {
  return (
  <>
    <LinearGradient
        colors={['#2DAFE5','#12203F']}
        style={{position:'absolute',height:'100%', right:-350 , width:'300%'}}
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        locations={[0,1]}
    >
    </LinearGradient>
    <SafeAreaView style={{flex:1}}>
    <StatusBar backgroundColor='transparent'  style="light" />
    <Stack
        screenOptions={{
            header(props) {
                
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

                        <View style={styles.containerLogo}>
                            <Image source={require("../../../assets/images/logo.png")} style={{width:44, height:44}} />
                            <Text style={styles.title}>Inicio</Text>
                            <View className='mr-3'>
                                <SimpleLineIcons className='' name='login' size={22} color="white" />
                            </View>
                        </View>
                        <View style={styles.inputSearch}>
                            <Feather name='search' size={24} color="white" />
                            <TextInput 
                                inputMode='search'
                                placeholder='Buscar ligas' 
                                placeholderTextColor="white"
                                autoFocus={false}
                                style={{color:"white", width:"95%"}}
                            />
                        </View> 
                    </View>
                
                
                )
            },
        }}
    >
        <Stack.Screen name='index' 
            options={
                {
                    title:"Inicio"
                }
            }
        />
    </Stack>
    </SafeAreaView>
  </>
    
  )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"#0E7C7B"
    },
    containerLogo:{
        flexDirection:"row",
        paddingHorizontal:10,
        paddingVertical:7,
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:10
    },
    icono:{
        backgroundColor:"#F5F7F938",
        borderRadius:25,
        padding:12,
    },
    title:{
      fontSize:20,
      color:"white" 
    },
    inputSearch:{
        backgroundColor:"#F5F7F938",
        width:"95%",
        marginHorizontal:"auto",
        borderRadius:25,
        paddingHorizontal:20,
        paddingVertical:3,
        marginBottom:15,
        flexDirection:"row",
        alignItems:"center",
        gap:5
    }
})