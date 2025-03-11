import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
        <ActivityIndicator />
    </View>
  )
}