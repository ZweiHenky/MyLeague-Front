import React from 'react'
import { Tabs } from 'expo-router'
import Icon from '@expo/vector-icons/FontAwesome6'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function _layout() {
  return (
  <Tabs 
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "#ffffff",
        paddingTop:15,
        height: 60,
        borderTopStartRadius:15,
        borderTopEndRadius:15,
        borderCurve:"continuous",
        borderColor:"transparent"
      },
      tabBarActiveTintColor: "#0E7C7B", // Teal color for active tab
      tabBarInactiveTintColor: "#8E8E93",
      headerShown: false,
      tabBarShowLabel:false,
      animation:"shift",
      tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={1} />,
    }}
  >

    <Tabs.Screen name='home'  
      options={
        {
          title:"Inicio",
          tabBarIcon: ({color, size, focused})=>{

            if (!focused) {
              return <Icon name="house"size={20} color={color} />
            }

            return (
              <View style={styles.container}>
                <Icon name="house"size={18} color={color} />
                <Text style={styles.text}>Inicio</Text>
              </View>
            )
          },
        }
      }
    /> 
    <Tabs.Screen name='teams' 
      options={
        {
          title:"equipos",
          tabBarIcon: ({color, size, focused})=>{

            if (!focused) {
              return <Icon name="user-group"size={20} color={color} />
            }

            return (
              <View style={styles.container}>
                <Icon name="user-group"size={16} color={color} />
                <Text style={styles.text}>Equipos</Text>
              </View>
            )
          },
        }
      }
    /> 
    <Tabs.Screen name='leagues'
      options={
        {
          title:"Ligas",
          tabBarIcon: ({color, size, focused})=>{

            if (!focused) {
              return <Icon name="trophy"size={20} color={color} />
            }

            return (
              <View style={styles.container}>
                <Icon name="trophy" size={16} color={color} />
                <Text style={styles.text}>Ligas</Text>
              </View>
            )
          }
        }
      }
    /> 

    <Tabs.Screen name='settings' 
      options={
        {
          tabBarIcon: ({color, size, focused})=>{

            if (!focused) {
              return <Icon name="gear"size={20} color={color}  />
            }

            return (
              <View style={styles.container}>
                <Icon name="gear"size={16} color={color} />
                <Text style={styles.text}>Config</Text>
              </View>
            )
          },
        }
      }
    /> 

  </Tabs>
  )
}

const styles = StyleSheet.create({
  container:{
    height:48,
    width:90,
    backgroundColor:"#0E7C7B14",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    padding:10,
    flexDirection:"row",
    gap:4,
  },
  text:{
    color:"#0E7C7B"
  }
})