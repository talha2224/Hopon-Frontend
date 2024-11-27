import React from 'react'
import { Image, Text, View } from 'react-native'
import confirmationImage from '../../assets/images/confirmation.png'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'
const success = () => {
    const router = useRouter()
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "white" }}>
            <Image source={confirmationImage} style={{marginTop:-30}} />
            <Text style={{ marginTop: -30, fontSize: 17, fontWeight: 600 }}>Application successful</Text>
            <Text style={{ marginTop: 5, color: "#979292" }}>Your application is in review, we’ll notify you</Text>
            <Pressable onPress={() => router.push("/driver/home")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "70%", height: 40, marginTop: 12 }}>
                <Text style={{ color: "#fff" }}>Continue</Text>
            </Pressable>
        </View>
    )
}

export default success
