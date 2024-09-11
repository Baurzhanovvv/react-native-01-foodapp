import { MenuItem, Restaurant } from '@/api/interfaces/interfaces';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

type itemProps = {
    image: string,
    title: string,
    rating: number,
    menu_items?: MenuItem[],
    restaurant?: Restaurant
}

type Props = {
    item: itemProps,
    styles?: string
}

const Card = ({ item, styles }: Props) => {
    let image;
    if (item?.menu_items) {
        image = item.menu_items[0].image;
    }
    return (
        <View>
            <View className='flex-column gap-2 px-2'>
                <View>
                    <Image
                        src={image || item.image}
                        resizeMode='cover'
                        className={`w-[250px] rounded overflow-hidden h-[150px] ${styles}`}
                    />
                </View>
                <View className='flex-row justify-between items-center'>
                    <Text className='font-omedium text-xl'>
                        {item?.restaurant?.title || item.title}
                    </Text>
                    <Text className='font-omedium text-xl'>
                        <Ionicons name="star" size={16} /> {item.restaurant?.rating || item.rating}
                    </Text>
                </View>
            </View>
        </View>
    );
}


export default Card;
