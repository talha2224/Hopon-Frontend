import { AntDesign, Feather, FontAwesome6, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react'
import {  View } from 'react-native'
import { useTheme } from '../hooks/themeContext';

const BottomNav2 = () => {
    const route = useRoute();
    const router = useRouter();
    const { isDarkTheme, toggleTheme } = useTheme();



    return (
        <View style={{ position: "absolute", bottom: 0, backgroundColor:isDarkTheme?"#000":"white", width: "100%", paddingVertical: 10, paddingHorizontal: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Feather onPress={()=>router.push("driver/home")} name="globe" size={24} color={route.name=="driver/home/index" ? "#2666CF":"#8D8C8C"} />
            <FontAwesome6 onPress={()=>router.push("driver/home/trip")} name="car-on" size={24} color={route.name=="driver/home/trip" ? "#2666CF":"#8D8C8C"} />
            <MaterialCommunityIcons onPress={()=>router.push("driver/home/earning")} name="wallet-outline" size={24} color={route.name=="driver/home/earning" ? "#2666CF":"#8D8C8C"} />
            <AntDesign onPress={()=>router.push("driver/home/account")} name="user" size={24} color={route.name=="driver/home/account" ? "#2666CF":"#8D8C8C"} />
            <Feather onPress={()=>router.push("driver/home/notification")} name="bell" size={24} color={route.name=="driver/home/notification" ? "#2666CF":"#8D8C8C"} />
        </View>
    )
}

export default BottomNav2