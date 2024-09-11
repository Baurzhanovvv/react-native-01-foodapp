import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StatusBar } from 'react-native';

export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#FFD35A', paddingTop: 5 }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'HOME',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"#295F98"} />
            ),
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontFamily: 'omedium',
              fontSize: 14,
            },
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'CART',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={"#295F98"} />
            ),
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontFamily: 'omedium',
              fontSize: 14,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'PROFILE',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'body' : 'body-outline'} color={"#295F98"} />
            ),
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontFamily: 'omedium',
              fontSize: 14,
            },
          }}
        />
      </Tabs>
      <StatusBar backgroundColor='#161622' barStyle='dark-content' />
    </>
  );
}
