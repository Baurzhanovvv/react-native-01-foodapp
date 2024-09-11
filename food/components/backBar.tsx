import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


interface Props {
    text?: string
}

const BackBar = ({ text }: Props) => {
    return (
        <>
            <TouchableOpacity onPress={() => router.back()}>
                <View className='flex-row gap-2 items-center'>
                    <Ionicons name="chevron-back-outline" size={25} />
                    {
                        text ?
                            <Text className='font-obold text-xl'>{text}</Text>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        </>
    );
}



export default BackBar;
