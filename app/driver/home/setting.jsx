import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '../../../hooks/themeContext';

const setting = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark2:style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/account")} name="arrowleft" size={24} color={isDarkTheme?"white":"black" }/>
                <Text style={{color:isDarkTheme&&"white"}}>Settings</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={style.ScrollcontainerDark2}>

                <View style={{backgroundColor:!isDarkTheme&&"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <Pressable onPress={()=>router.push("/driver/home/notification2")} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0E142E":"#F9F9F9", borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Notification settings</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black" } />
                    </Pressable>
                    <Pressable onPress={()=>router.push("/driver/home/emergency")} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0E142E":"#F9F9F9", borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Emergency contacts</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black" } />
                    </Pressable>
                    <Pressable style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0E142E":"#F9F9F9", borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Change your pin</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black" } />
                    </Pressable>
                    <Pressable onPress={()=>router.push("/driver/home/lang")} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0E142E":"#F9F9F9", borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Languages</Text>
                        <Feather name="arrow-right" size={24} color={isDarkTheme?"white":"black" } />
                    </Pressable>

                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default setting
