import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Sales from './sales';
import { Link } from 'expo-router';
import { useGlobalContext } from '@/provider/globalProvider';


type itemProps = {
    id: number,
    image: string,
    title: string,
    rating: number
}

type Props = {
    data: itemProps[],
    text: string
}

const SalesList = ({ data, text }: Props) => {
    const { getMenuItemById } = useGlobalContext();

    return (
        <View className='px-2 mt-5'>
            <Text className='font-obold text-xl'>
                {text}
            </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Link  onPress={() => getMenuItemById(item.id)} href="/detail">
                        <Sales image={item.image} text={item.title} rating={item.rating} />
                    </Link>
                )}
                horizontal={false}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}


export default SalesList;
