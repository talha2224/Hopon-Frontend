import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import home2Image from '../../../assets/images/home2.png';
import office2Image from '../../../assets/images/office2.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const saved = () => {
    const arr = [1, 2, 3,4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark:style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/profile")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{color:isDarkTheme&&"white"}}>Saved places</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark:style.Scrollcontainer}>

                <View style={{ backgroundColor:isDarkTheme?"#333333":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    {
                        arr.map((i) => (
                            <View key={i} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                        <Image source={i%2==0 ? home2Image :office2Image} />
                                    </View>
                                    <View style={{ marginLeft: 3 }}>
                                        <Text style={{ color:isDarkTheme?"#fff":"#323232", marginBottom: 2 }}>{i%2==0 ? "Home" :"Office"}</Text>
                                        <Text style={{ color:isDarkTheme?"#fff":"#000000" }}>Studio 10 Joke Stream</Text>
                                    </View>
                                </View>
                                <AntDesign name="edit" size={24} color={isDarkTheme?"white":"#747C88"} />

                            </View>
                        ))
                    }

                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default saved
