
import images from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

interface Props {
    text: string,
    image: string,
    rating?: number
}

const Sales = ({ text, image, rating } : Props) => {
    return (
        <View>
            <View className='flex-row relative mt-4'>
                <ImageBackground
                    src={image}
                    resizeMode="cover"
                    className='w-full h-36 flex-row rounded-lg justify-center items-center overflow-hidden'
                >
                    <View className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50' />
                    <View>
                        <Text className='font-obold text-white text-3xl font-bold z-10'>
                            {text}
                        </Text>
                        {
                            rating ? <Text className='font-obold text-white text-xl font-bold z-10'>
                                <Ionicons name="star" size={16} /> {rating}
                            </Text> : ""
                        }
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}


export default Sales;
