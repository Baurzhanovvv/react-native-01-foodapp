
import { getToken } from '@/api/token';
import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import { useGlobalContext } from '@/provider/globalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, SafeAreaView, Text, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';

const Login = () => {

    const { logUser, loading, user } = useGlobalContext();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        logUser({ email, password })
    }

    const router = useRouter();

    useEffect(() => {
        if (user?.userData?.id) {
            router.push("/(tabs)/")
        }
    }, [user?.userData?.id])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className='bg-secondary h-full'>
                <View className='px-2'>
                    <Text className='text-black uppercase text-xl text-center mt-5 font-obold'>
                        Войти в аккаунт
                    </Text>
                    <FormField title="Почта" value={email} handleChange={setEmail} placeholder='Введите свое имя...' />
                    <FormField title="Пароль" value={password} handleChange={setPassword} placeholder='Введите свой пароль...' isPassword={true} />
                    <CustomButton disabled={loading} handleSubmit={handleSubmit} text="Войти" textColor='#fff' color="#7469B6" styles="mt-[50px]" />
                    <View className='mt-5'>
                        <Text className='font-obold text-center text-base'>
                            У вас еще нет <Link href="/register" className='text-[#FF8225]'>аккаунта</Link>? Создавайте скорее!!!
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default Login;
