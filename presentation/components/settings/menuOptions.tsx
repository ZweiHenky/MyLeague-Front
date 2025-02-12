import { Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

export const MenuOption = ({ icon, label, onPress }:any) => (
  <Pressable onPress={onPress} className='flex-row w-full items-center p-5 bg-white justify-between rounded-xl'>
    <View className='flex-row gap-3 items-center'>
      <Icon name={icon} size={18} color='black' />
      <Text className='text-lg'>{label}</Text>
    </View>
    <Icon name='caret-right' size={20} color='black' />
  </Pressable>
);