import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const setting = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/profile")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{color: isDarkTheme && "white"}}>Settings</Text>
                <Pressable ><EvilIcons name="search" size={24} color={isDarkTheme?"white":"black"} /></Pressable>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark:style.Scrollcontainer}>

                <View style={{ backgroundColor:isDarkTheme?"#333333":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F9F9F9", borderBottomWidth:isDarkTheme?0:1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Notification settings</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black"} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F9F9F9", borderBottomWidth:isDarkTheme?0:1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Emergency contacts</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black"} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F9F9F9", borderBottomWidth:isDarkTheme?0:1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Change your pin</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black"} />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F9F9F9", borderBottomWidth:isDarkTheme?0:1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Languages</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black"} />
                    </View>

                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default setting
