import React from 'react'
import { Image, Text, View } from 'react-native'
import ConfirmImage from '../../../assets/images/confirm.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const canceled = () => {

    const router = useRouter()
    const { isDarkTheme } = useTheme();

    return (
        <View style={{ backgroundColor: isDarkTheme?"#000":"#fcfdff", flex: 1, position: "relative", justifyContent: "center", alignItems: "center" }}>
            <Image source={ConfirmImage} />
            <Text style={{ marginBottom: 10, fontSize: 17, fontWeight: "500", marginTop: -20 ,color:isDarkTheme&&"white"}}>Trip ended</Text>
            <Text style={{ color: "#a2a4ab" }}>Your trip has been cancelled</Text>

            <Text style={{ marginVertical: 20, fontSize: 17, fontWeight: "500" }}>Share the reason for cancelling the ride</Text>


            <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor:isDarkTheme?"#4F4F4F":"#F1F1F1" }}>
                <Text style={{ color: "#2666cf" }}>Can’t find driver</Text>
            </View>

            
            <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor:isDarkTheme?"#4F4F4F":"#F1F1F1" }}>
                <Text style={{ color: "#2666cf" }}>Rude driver</Text>
            </View>

            
            <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor:isDarkTheme?"#4F4F4F":"#F1F1F1" }}>
                <Text style={{ color: "#2666cf" }}>Too many driver</Text>
            </View>

            <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor:isDarkTheme?"#4F4F4F":"#F1F1F1" }}>
                <Text style={{ color: "#2666cf" }}>Nowhere to stop</Text>
            </View>


            <View style={{ backgroundColor: "#2666cf", width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginVertical: 10, borderRadius: 8 }}>
                <Text onPress={()=>router.push("/rider/home")} style={{ color: "#fff" }}>Submit Feedback</Text>
            </View>

        </View>
    )
}

export default canceled