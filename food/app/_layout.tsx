import { getToken } from '@/api/token';
import GlobalProvider from '@/provider/globalProvider';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    obold: require('../assets/fonts/Oswald-Bold.ttf'),
    oextralight: require('../assets/fonts/Oswald-ExtraLight.ttf'),
    olight: require('../assets/fonts/Oswald-Light.ttf'),
    omedium: require('../assets/fonts/Oswald-Medium.ttf'),
    oregular: require('../assets/fonts/Oswald-Regular.ttf'),
    osemibold: require('../assets/fonts/Oswald-Bold.ttf'),
  });

  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        setIsAuth(!!token);
      } catch (error: any) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isAuth === null) {
    return null;
  }

  return (
    <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>

    </GlobalProvider>
  );
}
