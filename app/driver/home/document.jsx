import React from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import nameStyle from '../../../style/rider/phone'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useRouter } from 'expo-router';
import Document from '../../../assets/images/document.png'
import L1 from '../../../assets/images/license.png'
import L2 from '../../../assets/images/license2.png'
import L3 from '../../../assets/images/left.png'

import { useTheme } from '../../../hooks/themeContext';

const document = () => {
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme?nameStyle.containerDark:nameStyle.container}>

            <Pressable onPress={() => router.push("/driver/home/account")} style={nameStyle.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={[nameStyle.txt,{color:isDarkTheme&&"white"}]}>Vehicle Information</Text>


            <View style={{ width: "100%", height: 84, borderRadius: 6, backgroundColor: "#F7F8F7", padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>Upload Vehicle documents</Text>
                    <Text style={{ color: "#71757b", marginTop: 2 }}>Upload pictures </Text>
                </View>
                <View>
                    <Image source={Document} />
                </View>
            </View>

            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L1} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Driver’s License </Text>
                        <Text style={{ color: "#454f69", }}>Upload a driving license </Text>
                    </View>
                </View>

                <Image source={L3} />
            </Pressable>

            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{  fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Vehicle insurance policy</Text>
                        <Text style={{ color: "#454f69", }}>Upload an insurance policy</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>


            <Pressable style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth:isDarkTheme?0: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                    <Text style={{  fontSize: 16, fontWeight: "600", marginBottom: 2,color:isDarkTheme&&"white" }}>Vehicle inspection report</Text>
                    <Text style={{ color: "#454f69", }}>Upload a clear inspection report</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>

            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={() => router.push("/driver/upload")} style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default document