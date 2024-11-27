import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import home2Image from '../../../assets/images/Visa.png';
import office2Image from '../../../assets/images/Visa.png';
import automaticImage from '../../../assets/images/automatic.png';
import msgImage from '../../../assets/images/msg.png';
import paypalImage from '../../../assets/images/paypal.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const payment = () => {
    const arr = [1]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark:style.container}>

            <View style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/wallet")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{ fontSize: 16, fontWeight: 500,color:isDarkTheme&&"white" }}>Add payment method</Text>
                <Pressable><EvilIcons style={{ display: "none" }} name="search" size={24} color={isDarkTheme?"white":"black"} /></Pressable>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme?style.ScrollcontainerDark:style.Scrollcontainer}>

                <View style={{ backgroundColor: isDarkTheme?"#3F3E3E":"#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginHorizontal: 10, marginBottom: 20, fontWeight: 500,color:isDarkTheme&&"white" }}>Preferred payout method </Text>
                    {
                        arr.map((i) => (
                            <View key={i} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <Image source={i % 2 == 0 ? home2Image : office2Image} />
                                    <View style={{ marginLeft: 13 }}>
                                        <Text style={{ color:isDarkTheme?"white":"#454f60", marginBottom: 0 }}>**** 1234 *** ****</Text>
                                        <Text style={{ color:isDarkTheme?"white":"#a3a6a5" }}>Flora Omah</Text>
                                    </View>
                                </View>
                                <EvilIcons name="trash" size={24} color={isDarkTheme?"white":"black"} />
                            </View>
                        ))
                    }

                    <Text style={{ marginHorizontal: 10, marginBottom: 20, fontWeight: 500,color:isDarkTheme&&"white" }}>Add new payment method </Text>

                    <Pressable onPress={()=>router.push("/rider/home/card")} style={{marginVertical:10, paddingBottom:10, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row",borderBottomColor:"#F8F8F8",borderBottomWidth:isDarkTheme?0:1 }}>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={automaticImage} />
                            </View>
                            <View style={{ marginLeft: 3 }}>
                                <Text style={{ color:isDarkTheme?"white":"#454f69", marginBottom: 2 }}>Bank account </Text>
                            </View>
                        </View>

                    </Pressable>

                    <Pressable onPress={()=>router.push("/rider/home/card")} style={{marginVertical:10, paddingBottom:10, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row",borderBottomColor:"#F8F8F8",borderBottomWidth:isDarkTheme?0:1 }}>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={msgImage} />
                            </View>
                            <View style={{ marginLeft: 3 }}>
                                <Text style={{ color:isDarkTheme?"white":"#454f69", marginBottom: 2 }}>Credit card</Text>
                            </View>
                        </View>

                    </Pressable>


                    <Pressable onPress={()=>router.push("/rider/home/card")} style={{marginVertical:10, paddingBottom:10, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row",borderBottomColor:"#F8F8F8",borderBottomWidth:isDarkTheme?0:1 }}>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={paypalImage} />
                            </View>
                            <View style={{ marginLeft: 3 }}>
                                <Text style={{ color:isDarkTheme?"white":"#454f69", marginBottom: 2 }}>Paypal</Text>
                            </View>
                        </View>

                    </Pressable>




                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default payment