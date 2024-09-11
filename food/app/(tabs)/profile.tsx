import Cards from '@/components/cards';
import CustomButton from '@/components/customButton';
import images from '@/constants/images';
import { useGlobalContext } from '@/provider/globalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { Button, FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {

    const { user, setUser, orders, logOutUser, getActiveOrders } = useGlobalContext();
    useEffect(() => {
        setUser()
        getActiveOrders();
    }, [])


    return (
        <SafeAreaView className="bg-secondary h-full">
            <View className='px-2'>
                <View className='pt-2 flex-row items-center gap-2'>
                    <Image
                        src={`${user?.customerData[0]?.pfp}`}
                        className='w-[75px] h-[75px] rounded'
                        resizeMode='contain'
                    />
                    <View>
                        <Text className='font-obold text-xl'>
                            {user?.userData.username}
                        </Text>
                    </View>
                </View>
                <View className='flex-column pt-16 gap-6'>
                    <TouchableOpacity className='flex-row items-center justify-between border-b-2 pb-2'>
                        <View>
                            <Text className='font-obold text-xl'>
                                {user?.customerData[0]?.phone_number}
                            </Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='font-obold text-xl'>0</Text>
                            <Ionicons name="chevron-forward-outline" size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between border-b-2 pb-2'>
                        <View>
                            <Text className='font-obold text-xl'>
                                {user?.userData?.username}
                            </Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Ionicons name="chevron-forward-outline" size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between border-b-2 pb-2'>
                        <View>
                            <Text className='font-obold text-xl'>
                                {user?.userData?.email ? user.userData?.email : "Добавить почту"}
                            </Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Ionicons name="chevron-forward-outline" size={20} />
                        </View>
                    </TouchableOpacity>
                    <View className='mt-20'>
                        {
                            orders ? <Cards text={`Активные заказы (${orders.length})`} data={orders} type="userOrders" /> : null
                        }
                    </View>
                </View>
                <View className='mt-16'>
                    <CustomButton disabled={user === null} handleSubmit={logOutUser} textColor='#fff' text="Выйти из профиля" color="#7469B6" exit={true} />
                </View>
            </View>

        </SafeAreaView>
    );
}


export default Profile;
