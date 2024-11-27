import React, { useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import nameStyle from '../../style/rider/prefernce'
import AntDesign from '@expo/vector-icons/AntDesign';
import config from '../../config'
import { router } from 'expo-router';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const prefernce = () => {

    const [state, setState] = useState(0)

    const createAccount = async () => {
        try {
            let body = {
                first_name: JSON.parse(await AsyncStorage.getItem("first_name")),
                last_name: JSON.parse(await AsyncStorage.getItem("last_name")),
                phone_number: JSON.parse(await AsyncStorage.getItem("phone_number")),
                prefference: state == 0 ? "Economy" : "Premium"
            }


            const res = await fetch(`${config.baseUrl}/rider/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(res,'res')
            if (res) {
                const responseBody = await res.json();
                ToastAndroid.show('Account Created', ToastAndroid.SHORT);
                await AsyncStorage.setItem("userInfo", JSON.stringify(responseBody.data))
                // await AsyncStorage.removeItem("first_name")
                // await AsyncStorage.removeItem("lastt_name")
                // await AsyncStorage.removeItem("phone_number")
                router.push("/rider")

            }
        }
        catch (error) {
            console.log(error)
            // ToastAndroid.show('Error: Account not found', ToastAndroid.SHORT);
        }
    }

    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("/rider/name")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("/rider/phone")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Confirm your information</Text>

            <Text style={{ color: "#979292" }}>Choose your preferred ride type</Text>

            <View style={nameStyle.btnContainer}>
                <View style={state == 0 ? nameStyle.btn1 : nameStyle.btn2}>
                    <Text onPress={() => setState(0)}>Economy</Text>
                </View>

                <View style={state == 1 ? nameStyle.btn1 : nameStyle.btn2}>
                    <Text onPress={() => setState(1)}>Premium</Text>
                </View>

            </View>


            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={createAccount} style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default prefernce

