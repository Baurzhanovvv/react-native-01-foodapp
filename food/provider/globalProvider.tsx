import { createOrder, createUser, getItems, getItemsById, getItemsByRating, getItemsByStatus, getPendingOrder, getUser, loginUser } from '@/api/api';
import { DetailRestaurant, IcreateUser, MenuItem, Order, Restaurant, user, User } from '@/api/interfaces/interfaces';
import { addToCart, deleteCart, deleteToken, getToken } from '@/api/token';
import { AxiosResponse } from 'axios';
import { Redirect, useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';


interface Context {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  registerUser: (user: IcreateUser) => void;
  setUser: () => void;
  logUser: (user: user) => void;
  logOutUser: () => void;
  getRestaurants: () => Promise<void>;
  restaurants: Restaurant | undefined;
  getUserOrders: (userId: number) => void;
  userOrders: Order | undefined,
  getRestaurantsByRating: () => Promise<void>;
  restaurantsByRating: Restaurant | undefined;
  detailRestaurant: DetailRestaurant | undefined;
  getMenuItemById: (id: number) => void,
  cartItem: MenuItem[],
  orders: Order[],
  getActiveOrders: () => void,
  setCartItem: (item: MenuItem | ((prevItems: MenuItem[]) => MenuItem[])) => void;
}


const GlobalContext = createContext<Context | undefined>(undefined);

export const useGlobalContext = (): Context => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('GlobalContext must be used within a GlobalProvider');
  }
  return context;
};

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant>();
  const [restaurantsByRating, setRestaurantByRating] = useState<Restaurant>();
  const [userOrders, setUserOrders] = useState<Restaurant>();
  const [detailRestaurant, setDetailRestaurant] = useState<DetailRestaurant>();
  const [cartItem, setCartItem] = useState<MenuItem[]>();
  const [orders, setOrders] = useState<Order>()

  const logUser = async ({ email, password }: user) => {
    try {
      setLoading(true)
      const response = await loginUser({ email, password });

      setUserState(response);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  const getActiveOrders = async () => {
    try {
      if (user?.userData.id) {
        return setOrders(await getPendingOrder(user.userData.id))
      }
    } catch (error: any) {
      throw new Error("Error", error.message)
    }
  }

  const addCartItem = (item: MenuItem) => {
    setCartItem((prevItems = []) => {
      const updatedCart = [...prevItems.flat(), item];
      addToCart(updatedCart);
      return updatedCart;
    });
  };



  const getUserOrders = async (userId: number) => {
    try {
      setLoading(true)
      const response = await getItemsByStatus(userId, "completed");

      setUserOrders(response)
    } catch (error: any) {
      throw new Error("Error", error.message);
    } finally {
      setLoading(false)
    }
  }

  const getMenuItemById = async (id: number) => {
    try {
      setLoading(true)
      const response = await getItemsById(id);

      setDetailRestaurant(response)
    } catch (error: any) {
      throw new Error("error", error.message);
    } finally {
      setLoading(false)
    }
  }

  const getRestaurants = async () => {
    try {
      setLoading(true)
      const response = await getItems();

      setRestaurants(response)
    } catch (error: any) {
      throw new Error("Error", error.message);
    } finally {
      setLoading(false)
    }
  }

  const getRestaurantsByRating = async () => {
    try {
      setLoading(true)

      const response = await getItemsByRating();

      setRestaurantByRating(response);
    } catch (error: any) {
      throw new Error("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  const order = async (
    userId: number,
    restaurantId: number,
    items: number[]
  ) => {
    try {
      const data = {
        userId: userId,
        restaurantId: restaurantId,
        items: items
      }
      const response = await createOrder(data);

      if (response.data) {
        setOrders(response.data)
        setCartItem([])
      }
    } catch (error: any) {
      throw new Error("Error", error.message)
    }
  }

  const logOutUser = async () => {
    try {
      setLoading(true)
      await deleteToken();
      await deleteCart();
      setCartItem([]);
      setUserOrders(null);

      setUserState(null)
    } catch (error: any) {
      Alert.alert("Alert", "Вы уже вышли")
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async (userData: IcreateUser) => {
    try {
      setLoading(true);
      const response: AxiosResponse<any> = await createUser(userData);
      if (response.data) {
        setUserState(response.data);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const setUser = async () => {
    try {
      setLoading(true)
      const response = await getUser();
      if (response) {
        setUserState(response);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch user');
    } finally {
      setLoading(false)
    }
  };


  const [isAuth, setIsAuth] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      setIsAuth(!!token);
    } catch (error: any) {
      setIsAuth(false);
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/(auth)/login')
    }
  }, [isAuth]);

  return (
    <GlobalContext.Provider value={{
      getMenuItemById,
      detailRestaurant,
      userOrders,
      setCartItem: addCartItem,
      cartItem,
      getUserOrders,
      getActiveOrders,
      orders,
      getRestaurants,
      restaurants,
      user,
      restaurantsByRating,
      getRestaurantsByRating,
      loading,
      setLoading,
      registerUser,
      setUser,
      logUser,
      order,
      logOutUser
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
