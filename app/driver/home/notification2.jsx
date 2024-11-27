import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/notification2';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import onImage from '../../../assets/images/on.png';
import offImage from '../../../assets/images/off.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const notification2 = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark2:style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/account")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{color:isDarkTheme&&"white"}}>Driver Prefference</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark2:style.Scrollcontainer}>


                <View style={{ backgroundColor:isDarkTheme?"":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Ride arrival</Text>
                        <Image source={onImage} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Ride ciompleted</Text>
                        <Image source={offImage} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>App updates</Text>
                        <Image source={offImage} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Push notification</Text>
                        <Image source={onImage} />
                    </View>

                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default notification2
