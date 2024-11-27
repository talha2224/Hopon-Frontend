import indexstyle from '../../style/rider/index'
import React, { useState } from 'react'
import { Image, Text, TextInput, ToastAndroid, View } from 'react-native'
import mailImg from '../../assets/images/mail.png';
import googleImg from '../../assets/images/google.png';
import appleImg from '../../assets/images/apple.png';
import Logo from '../../assets/images/hop.png'
import config from '../../config'
import { router } from 'expo-router';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RootLayout = () => {

  const [methods] = useState([{ name: "Continue with Email", img: mailImg }, { name: "Continue with Google", img: googleImg }, { name: "Continue with Apple", img: appleImg }])
  const [number,setNumber] = useState(null)
  
  const getAccount = async () => {
    if (!number) {
      ToastAndroid.show('Please enter your mobile number', ToastAndroid.SHORT);
    } 
    else {
      try {
        console.log((`${config.baseUrl}/rider/phone/${number}`))
        const res = await axios.get(`${config.baseUrl}/rider/phone/${number}`);
        if (res.status === 201) {
          const riderId = res.data.data._id;
          await AsyncStorage.setItem('riderId', riderId);
          ToastAndroid.show('Account found and ID saved!', ToastAndroid.SHORT);
          router.push('/rider/home');
        }
      } 
      catch (error) {
        console.error('Error fetching account:', error);
        router.push("/rider/name");
      }
    }
  };
  

  return (
    <View style={indexstyle.container}>

      <Image source={Logo} style={indexstyle.logo} />
      <Text style={indexstyle.welcome}>Welcome back!! </Text>
      <View style={[indexstyle.btnContainer, { width: "100%" }]}>
        <View style={indexstyle.btn1}>
          <Text style={indexstyle.btn1Txt}>Rider</Text>
        </View>
        <View style={indexstyle.btn2}>
          <Text style={indexstyle.btn2Txt} onPress={() => router.push("/driver")}>Driver</Text>
        </View>
      </View>

      {
        methods.map((i, ind) => (
          <View key={i.name} style={[indexstyle.methods, { width: "100%" }]}>
            <Image style={indexstyle.img} source={i.img} alt='img' />
            <Text style={indexstyle.methodsTxt}>{i.name}</Text>
          </View>
        ))
      }

      <Text style={indexstyle.or}>Or</Text>
      <Text style={[indexstyle.numberTxt, { width: "100%" }]}>Enter your mobile number</Text>

      <View style={[indexstyle.phoneContainer, { width: "100%" }]}>
        <View style={indexstyle.country}>
          <Text>US</Text>
        </View>
        <TextInput value={number} onChangeText={setNumber} keyboardType='phone-pad' style={[indexstyle.input, { flex: 1 }]} placeholder='+91 2335665456' />
      </View>

      <View style={[indexstyle.btn, { width: "100%" }]}>
        <Text onPress={getAccount} style={indexstyle.btnTxt}>Continue</Text>
      </View>
      {/* onPress={() => router.push("/rider/name")} */}

    </View>
  )
}

export default RootLayout
