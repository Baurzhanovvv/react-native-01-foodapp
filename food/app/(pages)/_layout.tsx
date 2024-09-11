import BackBar from '@/components/backBar';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const PagesLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="detail" options={{
                headerStyle: {
                    backgroundColor: "#FF9100",
                },
                headerTitleStyle: {
                    fontFamily: "obold",
                },
                headerLeft: () => (
                    <BackBar text="Назад" />
                ),
                title: ""
            }} />
        </Stack>
    );
}


export default PagesLayout;
