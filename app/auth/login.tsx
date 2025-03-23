import { View, Text, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import ThemeInput from '@/presentation/shared/ThemedInput';
import Icon from '@expo/vector-icons/FontAwesome6';
import AnimatedFingerprint from '@/presentation/components/auth/fingerPrint';
import { Link, router } from 'expo-router';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import * as LocalAuthentication from 'expo-local-authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const { login, authenticateBiometrically } = useAuthStore();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onSubmit = async () => {
        const { email, password } = form;

        if (email.length == 0 || password.length == 0) {
            return;
        }

        setIsPosting(true);

        const wasSuccessful = await login(email, password);

        setIsPosting(false);

        if (wasSuccessful) {
            router.replace('/home');
            return;
        }

        Alert.alert('Error:', 'Las credenciales no son correctas');
    };

    const handleBiometricAuth = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isBiometricAvailable || !isEnrolled) {
            Alert.alert('Error', 'La autenticación biométrica no está disponible o no está configurada.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentícate para continuar',
            fallbackLabel: 'Usar contraseña', // Opcional
        });

        if (result.success) {
            // Si la autenticación biométrica es exitosa, puedes llamar a onSubmit o hacer algo más
            try {
                await authenticateBiometrically();
                router.replace('/home');
                return;
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert('Error', 'Autenticación biométrica fallida');
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={20}
        >
            <View className='mt-20'>
                <View className='w-full items-center'>
                    <Image className='w-[50%] h-[100]' resizeMode="contain" source={require("@/assets/images/logo.png")} />
                    <Text className='text-xl'>Bienvenido a My League</Text>

                    <Pressable className='rounded-full mt-10' onPress={handleBiometricAuth}>
                        <AnimatedFingerprint />
                    </Pressable>

                    <View className='w-[90%] gap-6 py-2 mt-7'>
                        <Text className='text-4xl'>Inicio de Sesion</Text>

                        <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                            <View className='pl-3 w-[10%]'>
                                <Icon name="envelope" size={18} color={"#787878"} />
                            </View>
                            <ThemeInput className='w-[90%]' value={form.email} placeholder='Ingrese su correo' onChangeText={(value) => setForm({ ...form, email: value })} />
                        </View>

                        <View className='flex-row bg-gray-100 rounded-2xl items-center'>
                            <View className='pl-3 w-[10%]'>
                                <Icon name="lock" size={18} color={"#787878"} />
                            </View>
                            <ThemeInput
                                className='w-[80%]'
                                value={form.password}
                                placeholder='Ingresa tu contraseña'
                                secureTextEntry={!passwordVisible}
                                onChangeText={(value) => setForm({ ...form, password: value })}
                            />
                            <TouchableOpacity
                                className='w-[10%] pr-3'
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={18} color={"#787878"} />
                            </TouchableOpacity>
                        </View>

                        <Pressable onPress={onSubmit} disabled={isPosting}>
                            <Text className='w-full bg-light-primary p-4 rounded-3xl text-center text-xl text-white'>Ingresar</Text>
                        </Pressable>

                        <Text className='text-center'><Link href={"/auth/register"}>No tienes cuenta?, Registrate</Link></Text>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}