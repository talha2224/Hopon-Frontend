import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import style from '../../../style/rider/home/report';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '../../../hooks/themeContext';

const report = () => {
    const router = useRouter()
    const { isDarkTheme } = useTheme();
    return (
        <View style={isDarkTheme?style.containerDark2: style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/account")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{ fontSize: 18,color:isDarkTheme&&"white" }}>Report problem</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark2: style.Scrollcontainer}>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TextInput placeholderTextColor={isDarkTheme&&"white"} placeholder='Write your complaint...' style={{ borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 5, width: "80%", height: 50, padding: 10 }} />
                    <View style={{ backgroundColor: "#E1E1E1", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, width: "40%", height: 50 }}>
                        <AntDesign name="picture" size={24} color="black" />
                    </View>
                    <View style={{ backgroundColor: "#2666CF", width: "80%", height: 50, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, borderRadius: 5 }}>
                        <Text style={{ color: "#fff" }}>Start Now</Text>
                    </View>
                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default report