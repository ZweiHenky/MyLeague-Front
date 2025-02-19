import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import React from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddLeague() {
    return (
      <KeyboardAwareScrollView
        extraScrollHeight={10} // Espacio adicional para evitar superposición
        enableOnAndroid={false} // Habilitar en Android
        contentContainerStyle={{ flexGrow: 1, paddingBottom:10 }}
        enableAutomaticScroll={false}
      >
        <View className='p-5 gap-5'>
          <View className='gap-4'>
            <Text className='text-2xl'>Nombre de la liga</Text>
            <ThemeInput className="px-2" placeholder='Nombre' />
          </View>
          <View className='gap-4'>
            <Text className='text-2xl'>Direccion</Text>
            <ThemeInput className="px-2" placeholder='Direccion' />
          </View>
          <View className='gap-4'>
            <Text className='text-2xl'>Premio</Text>
            <ThemeInput className="px-2" placeholder='Cantidad del premio' />
          </View>
          <View className='gap-4'>
            <Text className='text-2xl'>Division</Text>
            <ThemeInput className="px-2" placeholder='Division de la liga' />
          </View>
          <View className='gap-4'>
            <Text className='text-2xl'>Selecciona un logo</Text>
            {/* Aquí puedes agregar un componente para seleccionar imágenes */}
          </View>
          <View className='gap-4'>
            <Text className='text-2xl'>Agrega una descripcion</Text>
            <ThemeInput
              className="px-2"
              placeholder='Descripción de la liga'
              multiline
              numberOfLines={4}
            />
          </View>

          <View className='flex-row items-center justify-between mt-2'>

            <Pressable className='w-[48%] border-light-textRed border-2 rounded-3xl p-3'>
                <Text className='text-center text-light-textRed text-xl'>Cancelar</Text>
            </Pressable>

            <Pressable className='w-[48%] rounded-3xl bg-light-primary p-3'>
                <Text className='text-center text-white text-xl'>Agregar</Text>
            </Pressable>

          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }