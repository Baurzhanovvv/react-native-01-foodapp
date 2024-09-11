import React from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from './customButton';
import { MenuItem } from '@/api/interfaces/interfaces';
import { useGlobalContext } from '@/provider/globalProvider';

interface Props {
    data: MenuItem,
    onPress?: (item: MenuItem) => void,
    disabled: boolean
}

const DetailItem = ({ data, onPress, disabled }: Props) => {
    return (
        <View className='w-full'>
            <View className='bg-blue rounded-xl' style={{ width: '48%' }}>
                <View className='p-2'>
                    <Image
                        src={data.image}
                        resizeMode='cover'
                        style={{ width: '100%', height: 200 }}
                        className='rounded-xl -mt-1'
                    />
                </View>
                <View className='flex-row py-5 px-2 justify-between items-center gap-2'>
                    <Text className='text-white font-obold text-base'>
                        {data.title}
                    </Text>
                    <Text className='text-white font-obold underline text-base'>
                        {data.price}т.
                    </Text>
                </View>
                <View className='px-2 py-2'>
                    <CustomButton disabled={disabled} handleSubmit={() => { onPress ? onPress(data) : null }} text={disabled ? "Уже в корзине" : "Добавить корзину"} color="#fff" textColor="#000" styles='p-1' exit={false} />
                </View>
            </View>
        </View>
    );
}


export default DetailItem;
