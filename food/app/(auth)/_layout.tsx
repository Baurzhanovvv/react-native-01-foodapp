import BackBar from '@/components/backBar';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="login" options={{
                    headerStyle: {
                        backgroundColor: "#FF9100",
                    },
                    headerTitleStyle: {
                        fontFamily: "obold",
                    },
                    title: "ВОЙТИ"
                }} />
                <Stack.Screen name="register" options={{
                    headerStyle: {
                        backgroundColor: "#FF9100",
                    },
                    headerTitleStyle: {
                        fontFamily: "obold",
                    },
                    title: "Регистрация"
                }} />
            </Stack>
            <StatusBar barStyle="light-content" />
        </>
    );
}

export default AuthLayout;
