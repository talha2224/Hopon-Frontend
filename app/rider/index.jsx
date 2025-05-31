import indexstyle from '../../style/rider/index'
import React, { useRef, useState } from 'react'
import { Image, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import mailImg from '../../assets/images/mail.png';
import googleImg from '../../assets/images/google.png';
import appleImg from '../../assets/images/apple.png';
import Logo from '../../assets/images/hop.png'
import config from '../../config'
import { router } from 'expo-router';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PhoneInput from "react-native-phone-number-input";
const RootLayout = () => {

  const [methods] = useState([{ name: "Continue with Email", img: mailImg }, { name: "Continue with Google", img: googleImg }, { name: "Continue with Apple", img: appleImg }])
  const [number, setNumber] = useState(null)
  const [autoHide, setAutoHide] = useState(false)
  const phoneInput = useRef(null);

  const getAccount = async () => {
    if (!number) {
      ToastAndroid.show('Please enter your mobile number', ToastAndroid.SHORT);
    }
    else {
      try {
        Toast.show({ type: 'success', text1: 'Finding Account...', text2: 'Please wait while we process your information.', autoHide: autoHide });
        const res = await axios.get(`${config.baseUrl}/rider/phone/${number}`);
        if (res.status === 201) {
          const riderId = res.data.data._id;
          await AsyncStorage.setItem('riderId', riderId);
          ToastAndroid.show('Account found and ID saved!', ToastAndroid.SHORT);
          setAutoHide(true)
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
          <Pressable onPress={() => router.push("/rider/name")} key={i.name} style={[indexstyle.methods, { width: "100%" }]}>
            <Image style={indexstyle.img} source={i.img} alt='img' />
            <Text style={indexstyle.methodsTxt}>{i.name}</Text>
          </Pressable>
        ))
      }

      <Text style={indexstyle.or}>Or</Text>
      <Text style={[indexstyle.numberTxt, { width: "100%" }]}>Enter your mobile number</Text>

      {/* <View style={[indexstyle.phoneContainer, { width: "100%" }]}>
        <View style={indexstyle.country}>
          <Text>US</Text>
        </View>
        <TextInput value={number} onChangeText={setNumber} keyboardType='phone-pad' style={[indexstyle.input, { flex: 1 }]} placeholder='+91 2335665456' />
      </View> */}

      <View style={{marginTop:10}}>
        <PhoneInput flagButtonStyle={{ borderRadius: 10}} textContainerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} textInputStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} codeTextStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} containerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10,width:"100%"  }} countryPickerButtonStyle={{ backgroundColor: "#f1f1f1" }} ref={phoneInput} defaultValue={number} defaultCode="US" layout="first" onChangeText={(text) => { setNumber(text); }} onChangeFormattedText={(text) => { setNumber(text); }} autoFocus />
      </View>


      <View style={[indexstyle.btn, { width: "100%" }]}>
        <Text onPress={getAccount} style={indexstyle.btnTxt}>Continue</Text>
      </View>

      <Toast />

    </View>
  )
}

export default RootLayout
