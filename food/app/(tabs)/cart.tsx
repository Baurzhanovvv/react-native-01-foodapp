import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import CartItem from '@/components/cartItem';
import { useGlobalContext } from '@/provider/globalProvider';
import { MenuItem } from '@/api/interfaces/interfaces';
import CustomButton from '@/components/customButton';

const Cart = () => {

    const { cartItem, order, user } = useGlobalContext();

    const [count, setCount] = useState<number>(1);

    let cart: MenuItem[] = [];

    if (cartItem && cartItem.length > 0 && cartItem[0]?.id) {
        cart = cartItem;
    } else if (cartItem && cartItem.length > 0) {
        cart = cartItem[0]
    }
    
    
    const handleSubmit = () => {
        const menuItems = cart.map(item => item.id);
        const restaurantId = cart[0].restaurant;
        order(user?.userData.id, restaurantId, menuItems);
    }

    return (
        <SafeAreaView className='bg-secondary h-full'>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <>
                        <View className='p-3'>
                            <Text className='font-obold text-center text-xl'>
                                Ваша корзина ({Array.isArray(cart) ? cart.length : 0})
                            </Text>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <>
                        <View className='px-2 pb-5'>
                            <View>
                                {
                                    cart[0]?.id ? <>
                                        <FlatList
                                            data={Array.isArray(cart) ? cart : []}
                                            renderItem={({ item }) => (
                                                <CartItem image={item.image} title={item.title} count={count} setCount={setCount} />
                                            )}
                                            keyExtractor={(item) => item.id.toString()}
                                        />
                                        <CustomButton handleSubmit={handleSubmit} text="Заказать" textColor='#fff' color='#7469B6' styles='mt-[50px]' />
                                    </> : <Text className='font-obold text-center text-base'>Ваша корзина пуста</Text>
                                }

                            </View>
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    );
}

export default Cart;
