import React from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import nameStyle from '../../../style/rider/phone'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Document from '../../../assets/images/document.png'
import L1 from '../../../assets/images/user.png'
import L2 from '../../../assets/images/user.png'
import L3 from '../../../assets/images/left.png'
import { useTheme } from '../../../hooks/themeContext';

const emergency = () => {
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?nameStyle.containerDark: nameStyle.container}>


            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <Pressable onPress={() => router.push("/driver/home/setting")} style={isDarkTheme?nameStyle.iconContainerDark:nameStyle.iconContainer}>
                    <AntDesign name="arrowleft" size={24} color={isDarkTheme?"white":"black"} />
                </Pressable>
                <Text style={{fontSize:16,fontWeight:"500",marginTop:-20,color:isDarkTheme&&"white"}}>Vehicle Information</Text>
                <View></View>
            </View>



            <View style={{ width: "100%", height: 84, borderRadius: 6, backgroundColor: "#F7F8F7", padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>Emergency contacts</Text>
                    <Text style={{ color: "#71757b", marginTop: 2 }}>Keep your friends and family informed </Text>
                </View>
                <View>
                    <Image source={Document} />
                </View>
            </View>

            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0B1333":"#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L1} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Charli Carter</Text>
                        <Text style={{ color: "#454f69", }}>+1 35484254875</Text>
                    </View>
                </View>

                <Image source={L3} />
            </Pressable>

            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0B1333":"#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Thomas</Text>
                        <Text style={{ color: "#454f69", }}>+1 35484254875</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>


            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor:isDarkTheme?"#0B1333":"#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Max</Text>
                        <Text style={{ color: "#454f69", }}>+1 35484254875</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>


        </View>
    )
}

export default emergency