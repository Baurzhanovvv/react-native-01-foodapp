import React from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import Card from './card';
import { Link } from 'expo-router';
import { Order, Restaurant } from '@/api/interfaces/interfaces';
import { useGlobalContext } from '@/provider/globalProvider';


type Props = {
    data: Restaurant[] | Order[],
    text: string,
    styles?: string,
    isHorizontal?: boolean,
    type?: string
}

const Cards = ({ data, text, styles, isHorizontal = true, type }: Props) => {
    const { getMenuItemById } = useGlobalContext();

    return (
        <View>
            <Text className='text-xl font-obold px-2'>
                {text}
            </Text>
            <View className='flex-row gap-2 mt-5 items-left justify-left'>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        type === "userOrders" ?
                            <Link onPress={() => getMenuItemById(item.restaurant.id)} href="/detail">
                                <Card item={item} styles={styles} />
                            </Link> : <Link onPress={() => getMenuItemById(item.id)} href="/detail">
                                <Card item={item} styles={styles} />
                            </Link>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={isHorizontal}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
}


export default Cards;
