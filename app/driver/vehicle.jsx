import React from 'react'
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native'
import nameStyle from '../../style/rider/phone'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Document from '../../assets/images/document.png'
import L1 from '../../assets/images/license.png'
import L2 from '../../assets/images/license2.png'
import L3 from '../../assets/images/left.png'
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const vehicle = () => {
    const checkFiles = async()=>{
        const savedFiles = await AsyncStorage.getItem("inspection");
        const insuranceFiles = await AsyncStorage.getItem("insurance");
        const licenseFiles = await AsyncStorage.getItem("license");
        if(JSON.parse(savedFiles).length==3 && JSON.parse(insuranceFiles).length==3 && JSON.parse(licenseFiles).length==3 ){
            router.push("/driver/car")
        }
        else{
            Alert.alert("Upload Required", "Please upload all vehicle photos before continuing.");
        }
    }
    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("/driver/phone")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("/driver/phone")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Vehicle Information</Text>


            <View style={{ width: "100%", height: 84, borderRadius: 6, backgroundColor: "#F7F8F7", padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>Upload Vehicle documents</Text>
                    <Text style={{ color: "#71757b", marginTop: 2 }}>Upload pictures </Text>
                </View>
                <View>
                    <Image source={Document} />
                </View>
            </View>

            <Pressable onPress={() => router.push("/driver/upload")} style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L1} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2 }}>Driver’s License </Text>
                        <Text style={{ color: "#454f69", }}>Upload a driving license </Text>
                    </View>
                </View>

                <Image source={L3} />
            </Pressable>

            <Pressable onPress={() => router.push("/driver/insurance")} style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2 }}>Vehicle insurance policy</Text>
                        <Text style={{ color: "#454f69", }}>Upload an insurance policy</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>


            <Pressable onPress={() => router.push("/driver/inspection")} style={{ marginVertical: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F8F8F8", borderBottomWidth: 1 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                        <Image source={L2} />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 2 }}>Vehicle inspection report</Text>
                    <Text style={{ color: "#454f69", }}>Upload a clear inspection report</Text>
                    </View>
                </View>
                <Image source={L3} />
            </Pressable>

            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={checkFiles}
                    // router.push("/driver/car")
                    // } 
                    style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default vehicle