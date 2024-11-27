import React, { useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import nameStyle from '../../style/rider/phone'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const phone = () => {
    const [number, setNumber] = useState(null)



    const onSave = async () => {
        if (!number) {
            ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
        }
        else {
            await AsyncStorage.setItem("phone_number", JSON.stringify(number))
            router.push("/driver/vehicle")
        }
    }
    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("/driver/name")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("/driver/name")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Confirm your information</Text>


            <View style={[nameStyle.phoneContainer, { width: "100%" }]}>
                <View style={nameStyle.country}>
                    <Text>US</Text>
                </View>
                <TextInput value={number} onChangeText={setNumber} keyboardType='phone-pad' style={[nameStyle.input, { flex: 1 }]} placeholder='+91 2335665456' />
            </View>


            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={onSave} style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default phone
