import axios from 'axios';
import { IcreateUser, user, User, Order, IOrder } from './interfaces/interfaces';
import { Alert } from 'react-native';
import mime from 'mime';
import { deleteCart, deleteToken, getToken, storeToken } from './token';


const config = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const createUser = async ({ email, password, re_password, username, pfp, phone }: IcreateUser) => {
    try {
        const response = await config.post('auth/users/', {
            email: email,
            username: username,
            password: password,
            re_password: re_password
        });

        let customerData;
        let token;

        if (response.data) {
            const formData = new FormData();
            formData.append("pfp", {
                uri: pfp,
                type: mime.getType(pfp) || 'image/jpeg', // Default to 'image/jpeg' if type is null
                name: pfp.split('/').pop(),
            });
            formData.append("user", response.data.id)
            formData.append("phone_number", phone)

            token = await config.post('auth/token/', {
                username: username,
                password: password
            })

            if (token?.data.access) {
                customerData = await config.post('customer/', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                await storeToken(token.data.access);
            }
        }


        return customerData
    } catch (error: any) {
        Alert.alert('Error', error.response?.data?.detail || error.message);
        return null;
    }
}

export const getUser = async () => {
    try {
        const token = await getToken();

        if (!token) {
            throw new Error("No token found")
        }

        const response = await config.get('auth/users/me/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        let customerData;

        if (response.data.id) {
            customerData = await config.get(`customer/?user_id=${response.data.id}`);
        }

        const userData = {
            userData: response.data,
            customerData: customerData?.data
        }

        return userData

    } catch (error: any) {
        // Alert.alert('Error', error.message || 'Something went wrong')
        return null
    }
}

export const loginUser = async ({ email, password }: user) => {
    try {
        console.log(`email: ${email}, password: ${password}`);

        const response = await config.post("auth/token/", {
            username: email,
            password: password
        });

        storeToken(response.data.access);

        let userData;
        let customerData;

        if (response.data.access) {
            userData = await config.get('auth/users/me/', {
                headers: {
                    Authorization: `Bearer ${response.data.access}`
                }
            })

            if (userData.data.id) {
                customerData = await config.get(`customer/?user_id=${userData.data.id}`);
            }
        }

        const user = {
            userData: userData?.data,
            customerData: customerData?.data,
        }

        return user;

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getItems = async () => {
    try {
        const response = await config.get('restaurants/')

        return response.data;
    } catch (error: any) {
        throw new Error('Error', error.message);
    }
}

export const getItemsByRating = async () => {
    try {
        const response = await config.get('/restaurants/?ordering=-rating');

        return response.data;
    } catch (error: any) {
        throw new Error("Error", error.message);
    }
}

export const getItemsByStatus = async (userId: number, status: string) => {
    try {
        const response = await config.get(`orders/?user_id=${userId}&status=${status}`);

        return response.data;
    } catch (error: any) {
        throw new Error("Error", error.message);
    }
}

export const getItemsById = async (id: number) => {
    try {
        const restaurant = await config.get(`restaurants/?id=${id}`)
        const menu = await config.get(`/menu-items/?restaurant=${id}`)

        const itemDetail = {
            restaurant: restaurant.data[0],
            menu: menu.data
        }

        return itemDetail
    } catch (error: any) {
        throw new Error("Error", error.message);
    }
}


export const createOrder = async (data: IOrder) => {
    try {
        const response = await config.post('create/order/', {
            user: data.userId,
            restaurant: data.restaurantId,
            menu_items: data.items,
            discount: null
        })

        if (response.data) {
            deleteCart();
            
        }
    } catch (error: any) {
        throw new Error("Error", error.message)
    }
}

export const getPendingOrder = async (userId: number) => {
    try {
        const response = await config.get(`orders/?user_id=${userId}&status=pending`);

        return response.data
    } catch (error: any) {
        throw new Error("Error", error.message)
    }
}
