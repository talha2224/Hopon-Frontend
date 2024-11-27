import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import { AntDesign } from '@expo/vector-icons';
import automaticImage from '../../../assets/images/automatic.png';
import msgImage from '../../../assets/images/msg.png';
import paypalImage from '../../../assets/images/paypal.png';
import checkoffImage from '../../../assets/images/checkoff.png';
import { useTheme } from '../../../hooks/themeContext';
import { useRouter } from 'expo-router';

const withdraw = () => {
    const arr = [1]
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?style.containerDark2:style.container}>

            <View style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/earning")} name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                <Text style={{ fontSize: 16, fontWeight: 500,color:isDarkTheme&&"white" }}>Withdraw</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={[isDarkTheme?style.ScrollcontainerDark2:style.Scrollcontainer, { display: "flex", alignItems: "center", paddingHorizontal: 20 }]}>

                <Text style={{ color: "#aeabab", marginVertical: 20 }}>Amount to withdraw</Text>


                <View style={{ backgroundColor:isDarkTheme?"#070D25":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: "50%", height: 60 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>17,000.78</Text>
                </View>


                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 10, width: "95%", margin: 10 }}>
                    <View style={{ backgroundColor:isDarkTheme?"#070D25":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                        <Text style={{color:isDarkTheme&&"white"}}>$5</Text>
                    </View>
                    <View style={{ backgroundColor:isDarkTheme?"#070D25":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                        <Text style={{color:isDarkTheme&&"white"}}t>$10</Text>
                    </View>
                    <View style={{ backgroundColor:isDarkTheme?"#070D25":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                        <Text style={{color:isDarkTheme&&"white"}}>$15</Text>
                    </View>
                    <View style={{ backgroundColor:isDarkTheme?"#070D25":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                        <Text style={{color:isDarkTheme&&"white"}}>$20</Text>
                    </View>
                </View>

                <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1, width: "100%" }}>
                    <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#EAEDFF", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 2, width: 32, height: 32, marginRight: 5 }}>
                            <Image source={automaticImage} />
                        </View>
                        <View style={{ marginLeft: 3 }}>
                            <Text style={{ color:isDarkTheme?"white": "#454f69", marginBottom: 2 }}>Paypal</Text>
                        </View>
                    </View>

                    <Image source={checkoffImage} />

                </Pressable>

                <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1, width: "100%" }}>
                    <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#EAEDFF", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 2, width: 32, height: 32, marginRight: 5 }}>
                            <Image source={msgImage} />
                        </View>
                        <View style={{ marginLeft: 3 }}>
                            <Text style={{ color: isDarkTheme?"white":"#454f69", marginBottom: 2 }}>Payoneer</Text>
                        </View>
                    </View>

                    <Image source={checkoffImage} />


                </Pressable>


                <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1, width: "100%" }}>
                    <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#EAEDFF", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                            <Image source={paypalImage} />
                        </View>
                        <View style={{ marginLeft: 3 }}>
                            <Text style={{ color: isDarkTheme?"white":"#454f69", marginBottom: 2 }}>Local Bank</Text>
                        </View>

                    </View>

                    <Image source={checkoffImage} />


                </Pressable>

                <Pressable onPress={() => router.push("/driver/home/confirmation")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 40, marginTop: 12 }}>
                    <Text style={{ color: "#fff" }}>Continue</Text>
                </Pressable>

            </ScrollView>

        </View>
    )
}

export default withdraw