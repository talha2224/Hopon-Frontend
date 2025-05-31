import React, { useRef, useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import nameStyle from '../../style/rider/phone'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from "react-native-phone-number-input";

const Phone = () => {
    const [number, setNumber] = useState(null)

    const phoneInput = useRef(null);


    const onSave = async () => {
        if (!number) {
            ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
        }
        else {
            await AsyncStorage.setItem("phone_number", JSON.stringify(number))
            router.push("/rider/prefernce")
        }
    }
    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("/rider/name")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("/rider/name")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Confirm your information</Text>


            {/* <View style={[nameStyle.phoneContainer, { width: "100%" }]}>
                <View style={nameStyle.country}>
                    <Text>US</Text>
                </View>
                <TextInput value={number} onChangeText={setNumber} keyboardType='phone-pad' style={[nameStyle.input, { flex: 1 }]} placeholder='+91 2335665456' />
            </View> */}

            <View style={{ marginTop: 10 }}>
                <PhoneInput flagButtonStyle={{ borderRadius: 10,}} textContainerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10, }} textInputStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} codeTextStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10}} containerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10,width:"100%" }} countryPickerButtonStyle={{ backgroundColor: "#f1f1f1" }} ref={phoneInput} defaultValue={number} defaultCode="US" layout="first" onChangeText={(text) => { setNumber(text); }} onChangeFormattedText={(text) => { setNumber(text); }} autoFocus />
            </View>


            <Pressable onPress={onSave} style={[nameStyle.btn, { width: "100%" }]}>
                <Text style={nameStyle.btnTxt}>Continue</Text>
            </Pressable>

        </View>
    )
}

export default Phone
