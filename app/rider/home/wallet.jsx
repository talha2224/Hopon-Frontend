import React from 'react'
import { Image, Pressable, ScrollView, StatusBar, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import cashImage from '../../../assets/images/cash.png';
import debitImage from '../../../assets/images/debit.png';
import carImage from '../../../assets/images/car3.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const wallet = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark:style.container}>
            <StatusBar hidden={true} />

            <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "#000", marginBottom: 20 }}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, marginBottom: 10 }}>Wallet</Text>
                <Text style={{ color: "#7b7c7e", fontSize: 16, marginBottom: 4 }}>Available balance</Text>
                <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20, marginBottom: 10 }}>USD 12,000.00</Text>
                <Pressable style={{ backgroundColor: "#fff", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 30 }}>
                    <Text>Fund wallet</Text>
                </Pressable>
            </View>

            <ScrollView style={{ paddingHorizontal: 20,backgroundColor:isDarkTheme&&"#292929" }}>


                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10,color:isDarkTheme&&"white",paddingTop:10 }}>Payment methods</Text>
                    <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                        <View style={{ flex: 1, marginRight: 10, backgroundColor: "#E8F0FF", height: 135, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                            <Image source={cashImage} />
                            <Text style={{ marginTop: 15 }}>Cash</Text>
                        </View>

                        <View style={{ flex: 1, backgroundColor: "#EAE5FF", height: 135, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                            <Image source={debitImage} />
                            <Text style={{ marginTop: 15 }}>Credit card</Text>
                        </View>

                    </View>
                </View>

                <Pressable onPress={()=>router.push("/rider/home/payment")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                    <Text style={{ color: "#fff" }}>Add payment method</Text>
                </Pressable>

                <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginVertical: 20 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>Recent transactions</Text>
                    <Text style={{ color: "#2666CF" }}>View all</Text>
                </View>

                <View style={{ marginBottom: 50 }}>
                    {
                        arr.map((i) => (
                            <View key={i} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme?"#2f2f2f":"#F6F6F6", padding: 10, borderRadius: 13 }}>
                                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <View style={{ backgroundColor: "#E2E7EC", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5, width: 32, height: 32, marginRight: 5 }}>
                                        <Image source={carImage} />
                                    </View>
                                    <View style={{ marginLeft: 3 }}>
                                        <Text style={{ color: isDarkTheme?"#fff":"#000", marginBottom: 2 }}>Airport to shop </Text>
                                        <Text style={{ color: "#aba8a8" }}>15-03-2023 08:48 am</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 3 }}>
                                    <Text style={{ color: isDarkTheme?"#fff":"#000", marginBottom: 2, fontSize: 16, fontWeight: 700 }}>$320</Text>
                                    <Text style={{ color: "#03AD33" }}>Completed</Text>
                                </View>

                            </View>
                        ))
                    }
                </View>

            </ScrollView>




            <View style={{ borderTopColor: "#313131", borderTopWidth: 1 }}>
                <BottomNav />
            </View>

        </View>
    )
}

export default wallet