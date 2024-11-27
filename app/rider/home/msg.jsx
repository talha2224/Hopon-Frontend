import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/msg';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import userImage from '../../../assets/images/user.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const msg = () => {
    const arr = [1, 2, 3]
    const router = useRouter()
    const { isDarkTheme } = useTheme();


    return (
        <View style={isDarkTheme?style.containerDark:style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={()=>router.push("/rider/home/profile")} name="arrowleft" size={24} color={isDarkTheme?"white":"black" }/>
                <Text style={{color:isDarkTheme&&"white"}}>Messages</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark:style.Scrollcontainer}>

                <Text style={{ color: "#828080", marginBottom: 10, marginLeft: 10 }}>This week</Text>

                <View style={{ backgroundColor:isDarkTheme?"#333333":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    {
                        arr.map((i) => (
                            <View key={i} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <Image source={userImage} />
                                    <View style={{ marginLeft: 3 }}>
                                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Gabriel Jons</Text>
                                        <Text style={{ color:isDarkTheme?"white":"#000000" }}>Kindly remember...</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#8D8C8C", marginBottom: 2 }}>Tuesday</Text>
                                    <View style={{ color: "#ffff", backgroundColor: "#2666CF", borderRadius: 100, width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#ffff" }}>3</Text></View>
                                </View>
                            </View>
                        ))
                    }

                </View>

                <Text style={{ color: "#828080", marginVertical: 10, marginLeft: 10 }}>This month</Text>

                <View style={{ backgroundColor:isDarkTheme?"#333333":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    {
                        arr.map((i) => (
                            <View key={i} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <Image source={userImage} />
                                    <View style={{ marginLeft: 3 }}>
                                        <Text style={{ color:isDarkTheme?"white":"#323232", marginBottom: 2 }}>Gabriel Jons</Text>
                                        <Text style={{ color:isDarkTheme?"white":"#000000" }}>Kindly remember...</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#8D8C8C", marginBottom: 2 }}>Tuesday</Text>
                                    <View style={{ color: "#ffff", backgroundColor: "#2666CF", borderRadius: 100, width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#ffff" }}>3</Text></View>
                                </View>
                            </View>
                        ))
                    }

                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default msg
