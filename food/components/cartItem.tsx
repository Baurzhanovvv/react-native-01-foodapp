import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Props {
    image: string,
    title: string,
    count: number,
    setCount: (count: number) => void
}


const CartItem = ({ image, title, count, setCount } : Props) => {
    return (
        <View>
            <View className='mt-5 flex-row justify-between items-center rounded-xl bg-white p-2 p-5'>
                <Image
                    src={image}
                    resizeMode='cover'
                    style={{ width: 100, height: 100 }}
                    className='rounded-xl'
                />
                <View className='ml-3'>
                    <Text className='font-obold'>
                        {title}
                    </Text>
                </View>
                <View className='flex-row justify-between items-center gap-2'>
                    <View>
                        <TouchableOpacity disabled={count <= 0} onPress={() => setCount(count - 1)}>
                            <Ionicons name="remove-outline" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View className='bg-blue p-2 px-4 rounded-full'>
                        <Text className='text-white font-obold text-base'>
                            {count}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setCount(count + 1)}>
                            <Ionicons name="add-outline" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default CartItem;
