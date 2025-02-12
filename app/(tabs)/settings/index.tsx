import { View, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Icon from "@expo/vector-icons/FontAwesome6";
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import { MenuOption } from '@/presentation/components/settings/menuOptions';



export default function Index() {
  const { logOut, user, status, checkStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === 'checking') {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  const options = [
    { icon: 'credit-card', label: 'Plan actual: Gratuito' },
    { icon: 'moon', label: 'Modo Oscuro' },
    { icon: 'shield-halved', label: 'Políticas de privacidad' },
    { icon: 'file-lines', label: 'Términos y condiciones' },
  ];

  return (
    <View className='flex-1'>
      <FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <MenuOption icon={item.icon} label={item.label} />}
        ListHeaderComponent={() => (
          status === 'unauthenticated' ? (
            <MenuOption icon='right-to-bracket' label='Iniciar Sesión' onPress={() => router.replace('/auth/login')} />
          ) : (
            <>
              <View className='flex-row w-[90%] items-center p-5 mx-auto bg-white mt-5 justify-between rounded-xl'>
                <View className='flex-row gap-3 items-center'>
                  <Icon name='id-card' size={18} color='black' />
                  <Text className='text-xl'>{user?.usu_name}</Text>
                </View>
              </View>
            </>
          )
        )}
        ListFooterComponent={() => (
          status !== 'unauthenticated' && (
            <>
              <MenuOption icon='right-from-bracket' label='Cerrar Sesión' onPress={logOut} />
              <MenuOption icon='trash' label='Eliminar Cuenta' />
            </>
          )
        )}
      />
    </View>
  );
}
