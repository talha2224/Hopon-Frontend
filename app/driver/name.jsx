import React, { useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import nameStyle from '../../style/rider/name'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const name = () => {
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")


    const onSave = async () => {
        if (firstName.length == 0 || lastName.length === 0) {
            ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
        }
        else {
            await AsyncStorage.setItem("first_name", JSON.stringify(firstName))
            await AsyncStorage.setItem("last_name", JSON.stringify(lastName))
            router.push("/driver/phone")
        }
    }

    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("driver")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("driver")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.label}>First Name</Text>
            <TextInput value={firstName} onChangeText={setFirstname} style={[nameStyle.input, { width: "100%" }]} placeholder='John' />

            <Text style={[nameStyle.label2]}>Last Name</Text>
            <TextInput value={lastName} onChangeText={setLastName} style={[nameStyle.input, { width: "100%" }]} placeholder='Doe' />

            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={onSave} style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default name
