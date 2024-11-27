import React from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const card = () => {
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark:style.container}>

            <View style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/wallet")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{ fontSize: 16, fontWeight: 500,color:isDarkTheme&&"white" }}>Add payment method</Text>
                <Pressable><EvilIcons style={{ display: "none" }} name="search" size={24} color="black" /></Pressable>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark:style.Scrollcontainer}>

                <View style={{ backgroundColor: isDarkTheme?"#292929":"#fff", paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 10, fontWeight: 600, fontSize: 20,color:isDarkTheme&&"white" }}>Add new card</Text>
                    <Text style={{ color: "#5C5C5C", marginBottom: 12 }}>Name of the place</Text>
                    <TextInput placeholderTextColor={isDarkTheme&&"white"} placeholder='John' style={{ width: "100%", backgroundColor:isDarkTheme?"#3F3E3E":"#FAFAFA", color:isDarkTheme?"white":"#C5C5C5", height: 40, borderRadius: 5, paddingHorizontal: 10 }} />
                    <Text style={{ color: "#5C5C5C", marginVertical: 12 }}>Card Number</Text>
                    <TextInput placeholderTextColor={isDarkTheme&&"white"} placeholder='xxxxxxxxxxxxxxxx' style={{ width: "100%", backgroundColor:isDarkTheme?"#3F3E3E":"#FAFAFA", color:isDarkTheme?"white":"#C5C5C5", height: 40, borderRadius: 5, paddingHorizontal: 10 }} />
                    <Text style={{ color: "#5C5C5C", marginVertical: 12 }}>Expiry Date</Text>
                    <TextInput placeholderTextColor={isDarkTheme&&"white"} placeholder='11/11' style={{ width: "100%", backgroundColor:isDarkTheme?"#3F3E3E":"#FAFAFA", color:isDarkTheme?"white":"#C5C5C5", height: 40, borderRadius: 5, paddingHorizontal: 10 }} />
                    <Text style={{ color: "#5C5C5C", marginVertical: 12 }}>CVV</Text>
                    <TextInput placeholderTextColor={isDarkTheme&&"white"} placeholder='xxx' style={{ width: "100%", backgroundColor:isDarkTheme?"#3F3E3E":"#FAFAFA", color:isDarkTheme?"white":"#C5C5C5", height: 40, borderRadius: 5, paddingHorizontal: 10 }} />

                    <Pressable onPress={() => router.push("/rider/home/fund")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 40,marginTop:12 }}>
                        <Text style={{ color: "#fff" }}>Save card</Text>
                    </Pressable>
                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default card