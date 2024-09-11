import { MenuItem } from '@/api/interfaces/interfaces';
import CustomButton from '@/components/customButton';
import DetailItem from '@/components/detailItem';
import { useGlobalContext } from '@/provider/globalProvider';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const Detail = () => {
    const { detailRestaurant, setCartItem, cartItem } = useGlobalContext();
    let data = detailRestaurant?.menu.map(item => item.category) || [];

    const [activeItems, setActiveItems] = useState<number[]>([]);
    const [counter, setCounter] = useState<number>(0);

    const toggleActiveItem = (index: number) => {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter(item => item !== index));
        } else {
            setActiveItems([...activeItems, index]);
        }
    };

    let cart: MenuItem[] = [];

    if (cartItem && cartItem.length > 0 && cartItem[0]?.id) {
        cart = cartItem;
    } else if (cartItem && cartItem.length > 0) {
        cart = cartItem[0];
    }

    const isItemInCart = (item: any) => {
        if (!cart || !item) return false;
        return cart.some((cart: any) => cart?.id === item?.id);
    };

    return (
        <SafeAreaView className='bg-secondary h-full'>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <View className='px-2'>
                        <View className='mt-5'>
                            <Image
                                src={detailRestaurant?.restaurant?.image}
                                resizeMode='cover'
                                className='w-[100%] h-[250px] rounded-xl'
                            />
                        </View>
                        <View className='mt-5'>
                            <View>
                                <Text className='font-obold text-xl'>
                                    {detailRestaurant?.restaurant?.title}
                                </Text>
                            </View>
                            <View>
                                <Text className='pt-3 font-obold text-base'>
                                    {detailRestaurant?.restaurant?.desc}
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View className='px-2'>
                        <View className='mt-5'>
                            <FlatList
                                data={data}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => toggleActiveItem(index)}
                                        className={`border-2 border-black py-2 px-4 rounded-xl mr-3 ${activeItems.includes(index) ? 'bg-white border-white' : ''}`}>
                                        <Text className='font-obold text-base'>{item.title}</Text>
                                    </TouchableOpacity>
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View className='mt-5'>
                            <FlatList
                                data={detailRestaurant?.menu}
                                renderItem={({ item }) => (
                                    <DetailItem disabled={isItemInCart(item)} onPress={setCartItem} data={item} />
                                )}
                            />
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

export default Detail;
