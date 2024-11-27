import React from 'react'
import { Image, Text, View } from 'react-native'
import confirmationImage from '../../../assets/images/confirmation.png'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '../../../hooks/themeContext';

const confirmation = () => {
    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor:isDarkTheme?"#13182F":"white" }}>
            <Image source={confirmationImage} />
            <Text style={{ marginTop: -30, fontSize: 17, fontWeight: 600,color:isDarkTheme&&"white" }}>Withdraw is successful</Text>
            <Text style={{ marginTop: 5, color: "#979292" }}>Your withdraw has been placed</Text>
            <Pressable onPress={() => router.push("/driver/home/earning")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "70%", height: 40, marginTop: 12 }}>
                <Text style={{ color: "#fff" }}>Okay</Text>
            </Pressable>
        </View>
    )
}

export default confirmation