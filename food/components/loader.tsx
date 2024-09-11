import React from 'react';
import { Image, View } from 'react-native';
import loader from '../assets/loader/loader.gif';


const Loader = () => {
    return (
        <View className='flex-row justify-center items-center mt-5'>
            <Image
                source={loader}
                className='flex-row w-auto h-[100px]'
                resizeMode='contain'
            />
        </View>
    );
}


export default Loader;
