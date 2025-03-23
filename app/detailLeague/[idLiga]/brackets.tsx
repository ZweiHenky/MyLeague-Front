import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Brackets() {
  return (
    <ScrollView className='flex-1 ' horizontal={true}>
      <View className='w-[500]'>
        <Text>Ronda 1</Text>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
      </View>
      <View className='w-[500] '>
        <Text>Ronda 2</Text>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
        <View>
          <Text>Equipo 1</Text>
          <Text>Equipo2 2</Text>
        </View>
      </View>
    </ScrollView>
  );
};
