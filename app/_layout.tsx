import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StripeProvider } from "@stripe/stripe-react-native"
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProviderContext } from '../hooks/themeContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProviderContext>
      <Toast />
      <StripeProvider publishableKey='pk_live_51QRjitJHV7mT4OHggH69uWhX6iPu36diHSmYdIcGRhngcHF1yUTg7WhyBtpwwzJ3GEf8genU5QVHsA0fDKzcXgaw00AokH7Bgp'>

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="rider/index" options={{ headerShown: false }} />
          <Stack.Screen name="rider/name" options={{ headerShown: false }} />
          <Stack.Screen name="rider/phone" options={{ headerShown: false }} />
          <Stack.Screen name="rider/prefernce" options={{ headerShown: false }} />
          <Stack.Screen name="rider/final" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/index" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/location" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/accepted" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/canceled" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/feedback" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/notification" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/trip" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/profile" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/profile2" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/msg" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/terms" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/messages" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/notification2" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/saved" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/lang" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/setting" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/report" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/wallet" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/payment" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/card" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/fund" options={{ headerShown: false }} />
          <Stack.Screen name="rider/home/confirmation" options={{ headerShown: false }} />

          <Stack.Screen name="driver/index" options={{ headerShown: false }} />
          <Stack.Screen name="driver/name" options={{ headerShown: false }} />
          <Stack.Screen name="driver/phone" options={{ headerShown: false }} />
          <Stack.Screen name="driver/vehicle" options={{ headerShown: false }} />
          <Stack.Screen name="driver/upload" options={{ headerShown: false }} />
          <Stack.Screen name="driver/insurance" options={{ headerShown: false }} />
          <Stack.Screen name="driver/inspection" options={{ headerShown: false }} />
          <Stack.Screen name="driver/car" options={{ headerShown: false }} />
          <Stack.Screen name="driver/review" options={{ headerShown: false }} />
          <Stack.Screen name="driver/success" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/index" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/accepted" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/notification" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/trip" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/profile2" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/earning" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/performance" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/withdraw" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/confirmation" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/account" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/document" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/vehicle" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/msg" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/messages" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/payment" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/saved" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/preference" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/setting" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/report" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/notification2" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/lang" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/emergency" options={{ headerShown: false }} />
          <Stack.Screen name="driver/home/terms" options={{ headerShown: false }} />
        </Stack>
        
      </StripeProvider>
    </ThemeProviderContext>


  );
}
