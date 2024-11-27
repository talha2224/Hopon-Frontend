import React, { useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import nameStyle from '../../style/rider/final'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import finalImg from '../../assets/images/final.png'
const final = () => {

    const [state, setState] = useState(0)
    return (
        <View style={nameStyle.container}>

            <Pressable onPress={() => router.push("/rider/name")} style={nameStyle.iconContainer}>
                <AntDesign onPress={() => router.push("/rider/prefernce")} name="arrowleft" size={24} color="black" />
            </Pressable>

            <View style={nameStyle.imgContainer}>
                <Image source={finalImg} />
            </View>


            <Text style={nameStyle.txt}>Review our Terms & Conditions</Text>

            <Text style={{ color: "#979292",textAlign:"center",marginTop:"10px" }}>By selecting  “I Agree” below. I  have reviewed and agreed to the Terms of Use and acknowledge the Privacy and I am 18 years of age</Text>
            <Text style={{ color: "#979292",textAlign:"center",marginTop:20 }}>I Agree to the above terms</Text>


            <View style={[nameStyle.btn, { width: "100%" }]}>
                <Text onPress={() => router.push("/rider/home")} style={nameStyle.btnTxt}>Continue</Text>
            </View>

        </View>
    )
}

export default final

