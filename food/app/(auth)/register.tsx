import CustomButton from '@/components/customButton';
import FormField from '@/components/formField';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaskInput from 'react-native-mask-input';
import { useGlobalContext } from '@/provider/globalProvider';

const Register = () => {

    const { registerUser, user } = useGlobalContext();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [re_password, setre_Password] = useState<string>("");
    const [phone, setPhone] = useState<string>();
    const [profileImage, setProfileImage] = useState<string | null>(null);


    const router = useRouter();

    useEffect(() => {
        if (user?.userData?.id) {
            router.push("/(tabs)/")
        }
    }, [user?.userData?.id])

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (re_password === password) {
            registerUser({
                email: email,
                password: password,
                re_password: re_password,
                first_name: name,
                username: username,
                pfp: profileImage,
                phone: phone,
            })
        } else {
            Alert.alert("Пароль не совпадают")
        }

    }

    return (
        <SafeAreaView className='bg-secondary h-full'>
            <ScrollView className='px-2'>
                <Text className='text-black uppercase text-xl text-center mt-5 font-obold'>
                    Создайте аккаунт
                </Text>

                <View className='items-center mt-5'>
                    <TouchableOpacity onPress={pickImage} className='w-32 h-32 bg-gray-200 rounded-full items-center justify-center'>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                className='w-full h-full rounded-full'
                                resizeMode='cover'
                            />
                        ) : (
                            <Text className='font-obold text-gray-500'>Добавить фото</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField title="Имя" value={name} handleChange={setName} placeholder='Введите свое имя...' />
                <FormField title="Юзернейм" value={username} handleChange={setUsername} placeholder='Введите свое имя...' />
                <FormField title="Почта" value={email} handleChange={setEmail} placeholder='Введите свою почту...' />
                <View className='mt-5 px-2'>
                <Text className='font-obold text-base'>
                    Номер телефона
                </Text>
                </View>
                <View className='mt-5 p-2 h-[75px] flex-row items-center w-full bg-[#C63C51] rounded-xl'>
                    <MaskInput
                        value={phone}
                        placeholderTextColor="#fff"
                        className='text-white placeholder:text-white font-obold'
                        placeholder='Введите свой номер телефона...'
                        onChangeText={(masked, unmasked) => {
                            setPhone(masked);
                        }}
                        mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    />
                </View>
                <FormField type="Пароль" title="Пароль" value={password} handleChange={setPassword} placeholder='Введите свой пароль...' isPassword={true} />
                <FormField type="Пароль" title="Повторите пароль" value={re_password} handleChange={setre_Password} placeholder='Введите свой пароль повторно...' isPassword={true} />

                <CustomButton handleSubmit={handleSubmit} text="Зарегистрироваться" textColor='#fff' color="#7469B6" styles="mt-[50px]" />

                <View className='mt-5'>
                    <Text className='font-obold text-center text-base'>
                        У вас уже есть <Link href="/login" className='text-[#FF8225]'>аккаунт</Link>? Войдите в него скорее!!!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Register;
