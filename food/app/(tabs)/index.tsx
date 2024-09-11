import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import images from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import Sales from '@/components/sales';
import Cards from '@/components/cards';
import SalesList from '@/components/salesList';
import { useEffect, useState } from 'react';
import { Redirect, router, useRouter } from 'expo-router';
import { useGlobalContext } from '@/provider/globalProvider';
import { getCart } from '@/api/token';

export default function HomeScreen() {

  const {
    getRestaurants,
    restaurants,
    getRestaurantsByRating,
    restaurantsByRating,
    user,
    getUserOrders,
    userOrders,
    setUser,
    setCartItem,
    cartItem
  } = useGlobalContext();

  useEffect(() => {

    const fetchCart = async () => {
      if (!cartItem || cartItem.length === 0) {
        const cart = await getCart();
        if (cart) {
          setCartItem(cart.flat(Infinity));
        }
      }
    };
    setUser()
    getRestaurants();
    getRestaurantsByRating();
    fetchCart();
  }, [])


  useEffect(() => {
    if (user?.userData.id) {
      getUserOrders(user?.userData.id);
    }
  }, [user?.userData?.id])

  const handleLink = () => {
    router.push("/login")
  }



  return (
    <SafeAreaView className='bg-secondary h-full'>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <View className='p-2 flex-row items-center gap-2'>
            <Image
              source={images.logo}
              className='w-[75px] h-[75px]'
              resizeMode='contain'
            />
            <View>
              <Text className='font-obold text-xl'>Delivery & GO</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            <View className='px-2'>
              <TouchableOpacity>
                <View className='bg-[#EB5B00] p-[30px] rounded-xl'>
                  <Text className='font-obold text-xl text-center text-white'>
                    СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className='mt-5 px-2'>
              <Text className='font-obold text-xl'>Лучшие предложения</Text>
              <Sales image={images.food1} text="Скидка 20%" />
            </View>
            <View className='mt-5'>
              <Cards
                text="Высокий рейтинг"
                data={restaurantsByRating}
                type="rating"
              />
            </View>
            {
              Array.isArray(userOrders) && userOrders.length > 0 ? (<View className='mt-5'>
                <Cards
                  text="Ранее заказывали"
                  type="userOrders"
                  data={userOrders}
                />
              </View>) : (<Text>У вас нету заказов</Text>)
            }
            <View className='mt-5 pb-5'>
              <SalesList text="Рестораны" data={restaurants} />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}
