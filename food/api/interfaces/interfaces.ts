export interface user {
    email: string,
    password: string,
}

export interface IcreateUser extends user {
    username: string,
    re_password: string,
    first_name: string,
    last_name: string,
    pfp: string,
    phone: string,
}

export type User = {
    userData: {
        id: number,
        email: string,
        username: string,
    },
    customerData: [{
        address: string | null,
        id: number,
        pfp: string | null,
        phone_number: string | null,
        user: number,
    }]
}

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    restaurant: number;
    category: object;
}

export interface Restaurant {
    id: number;
    title: string;
    desc: string;
    address: number;
    image: string;
    opening_hours: string;
    phone_number: string;
    rating: number;
}

export interface Order {
    id: number;
    user: string;
    restaurant: Restaurant;
    menu_items: MenuItem[];
    status: string;
    total_amount: string;
    discount: number | null;
    created_at: string;
    updated_at: string;
}

export interface DetailRestaurant {
    restaurant: Restaurant
    menu: MenuItem[]
}

export interface IOrder {
    userId: number,
    restaurantId: number,
    items: number[],
}
