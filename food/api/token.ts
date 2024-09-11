import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuItem } from "./interfaces/interfaces";


export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
        console.log('Error storing the token:', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token !== null) {
            return token;
        }
    } catch (error) {
        console.log('Error retrieving the token:', error);
    }
};


export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('auth_token');
        console.log('Token deleted successfully');
    } catch (error) {
        console.log('Error deleting the token:', error);
    }
};


export const addToCart = async (cart: MenuItem[]) => {
    try {
        const cartString = JSON.stringify(cart);
        await AsyncStorage.setItem('cart', cartString)
    } catch (error: any) {
        throw new Error("Error", error.message)
    }
}

export const getCart = async () => {
    try {
        const cart = await AsyncStorage.getItem('cart');
        if (cart !== null) {
            return JSON.parse(cart);
        }
    } catch (error: any) {
        throw new Error("Error", error.message)
    }
}

export const deleteCart = async () => {
    try {
        await AsyncStorage.removeItem('cart');
        console.log('cart deleted successfully');
    } catch (error) {
        console.log('Error deleting the cart:', error);
    }
}
