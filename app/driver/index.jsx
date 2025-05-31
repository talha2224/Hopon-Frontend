import indexstyle from '../../style/driver/index'
import React, { useRef, useState } from 'react'
import { Image, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import mailImg from '../../assets/images/mail.png';
import googleImg from '../../assets/images/google.png';
import appleImg from '../../assets/images/apple.png';
import config from '../../config'
import { router } from 'expo-router';
import axios from 'axios'
import Logo from '../../assets/images/hop.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PhoneInput from 'react-native-phone-number-input';

const RootLayout = () => {
  const phoneInput = useRef(null);

  const [methods] = useState([{ name: "Continue with Email", img: mailImg }, { name: "Continue with Google", img: googleImg }, { name: "Continue with Apple", img: appleImg }])
  const [number, setNumber] = useState(null)
  const [autoHide, setAutoHide] = useState(false)
  const getAccount = async () => {
    if (!number) {
      ToastAndroid.show('Please enter your mobile number', ToastAndroid.SHORT);
    }
    else {
      Toast.show({type: 'success',text1: 'Finding Account...',text2: 'Please wait while we process your information.',autoHide:autoHide});
      try {
        const res = await axios.get(`${config.baseUrl}/driver/phone/${number}`);
        if (res.status === 201) {
          const driverId = res.data.data._id;
          await AsyncStorage.setItem('driverId', driverId);
          ToastAndroid.show('Account found! Redirecting...', ToastAndroid.SHORT);
          setAutoHide(true)
          router.push('/driver/home');
        }
      }
      catch (error) {
        router.push("/driver/name")
      }
    }
  }

  return (
    <View style={indexstyle.container}>

      <Image source={Logo} style={indexstyle.logo} />
      <Text style={indexstyle.welcome}>Welcome back!! </Text>
      <View style={[indexstyle.btnContainer, { width: "100%" }]}>
        <Pressable onPress={() => { router.push("/rider") }} style={indexstyle.btn1}>
          <Text style={indexstyle.btn1Txt}>Rider</Text>
        </Pressable>
        <View style={indexstyle.btn2}>
          <Text style={indexstyle.btn2Txt}>Driver</Text>
        </View>
      </View>

      {
        methods.map((i, ind) => (
          <Pressable onPress={()=>router.push("/driver/name")} key={i.name} style={[indexstyle.methods, { width: "100%" }]}>
            <Image style={indexstyle.img} source={i.img} alt='img' />
            <Text style={indexstyle.methodsTxt}>{i.name}</Text>
          </Pressable>
        ))
      }

      <Text style={indexstyle.or}>Or</Text>
      <Text style={[indexstyle.numberTxt, { width: "100%" }]}>Enter your mobile number</Text>

      <View style={{marginTop:10}}>
        <PhoneInput flagButtonStyle={{ borderRadius: 10}} textContainerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} textInputStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} codeTextStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} containerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10,width:"100%"  }} countryPickerButtonStyle={{ backgroundColor: "#f1f1f1" }} ref={phoneInput} defaultValue={number} defaultCode="US" layout="first" onChangeText={(text) => { setNumber(text); }} onChangeFormattedText={(text) => { setNumber(text); }} autoFocus />
      </View>


      <Pressable onPress={getAccount} style={[indexstyle.btn, { width: "100%" }]}>
        <Text  style={indexstyle.btnTxt}>Continue</Text>
      </Pressable>

      <Toast />


    </View>
  )
}

export default RootLayout
