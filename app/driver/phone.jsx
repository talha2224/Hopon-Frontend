import React, { useState, useRef, useEffect } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View, StyleSheet, Platform } from 'react-native';
import nameStyle from '../../style/rider/phone';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config'
import PhoneInput from 'react-native-phone-number-input';

const Phone = () => {
    const [number, setNumber] = useState(null);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const [otpVerified, setotpVerified] = useState(false);
    const phoneInput = useRef(null);

    useEffect(() => {
        if (otp.every(digit => digit !== '')) {
            console.log("OTP Entered:", otp.join(''))
        }
    }, [otp]);


    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, '');
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
        else if (!value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleKeyPress = (index, { nativeEvent: { key } }) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const sendOTP = async () => {
        if (!number) {
            ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT);
            return;
        }
        else if (!number.includes("+")) {
            ToastAndroid.show('Number shoudl follow this format +923xxxxxxxxx', ToastAndroid.SHORT);
        }
        else {
            try {
                const res = await axios.post(`${config.baseUrl}/otp/send/${number}`);
                if (res.data) {
                    ToastAndroid.show('OTP SENT', ToastAndroid.SHORT);
                }
            }
            catch (error) {
                ToastAndroid.show('Invalid Number', ToastAndroid.SHORT);
            }
        }
    };


    const onSave = async () => {
        if (!number) {
            ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
            return;
        }

        if (!otp.every(digit => digit !== '')) {
            ToastAndroid.show('Please enter OTP', ToastAndroid.SHORT);
            return
        }
        try {
            const res = await axios.post(`${config.baseUrl}/otp/verify`, { number, otp: Number(otp.join('')) });
            if (res.data) {
                await AsyncStorage.setItem("phone_number", JSON.stringify(number));
                router.push("/driver/vehicle");
            }
        }
        catch (error) {
            ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={nameStyle.container}>
            <Pressable onPress={() => router.push("/driver/name")} style={nameStyle.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Confirm your information</Text>

            <View style={{ marginTop: 10 }}>
                <PhoneInput flagButtonStyle={{ borderRadius: 10 }} textContainerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} textInputStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} codeTextStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10 }} containerStyle={{ backgroundColor: "#f1f1f1", borderRadius: 10, width: "100%" }} countryPickerButtonStyle={{ backgroundColor: "#f1f1f1" }} ref={phoneInput} defaultValue={number} defaultCode="US" layout="first" onChangeText={(text) => { setNumber(text); }} onChangeFormattedText={(text) => { setNumber(text); }} autoFocus />
            </View>
            <Pressable onPress={sendOTP} style={[nameStyle.btn, { width: "100%", marginTop: 20, backgroundColor: "white" }]}>
                <Text style={[nameStyle.btnTxt, { color: "#2666CF" }]}>Send OTP</Text>
            </Pressable>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <View key={index} style={styles.otpBox}>
                        <TextInput key={index} style={styles.otpInput} keyboardType="numeric" maxLength={1} value={digit} onChangeText={(value) => handleInputChange(index, value)} onKeyPress={(e) => handleKeyPress(index, e)} ref={(ref) => (inputRefs.current[index] = ref)} autoFocus={index === 0} />
                        <View style={[styles.underline, index < otp.length - 1 && styles.activeUnderline]} />
                    </View>
                ))}
            </View>


            <Pressable onPress={onSave} style={[nameStyle.btn, { width: "100%", marginTop: 20, backgroundColor: "#2666CF" }]}>
                <Text style={nameStyle.btnTxt}>Continue</Text>
            </Pressable>

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, flexDirection: "row", gap: 5 }}>
                <Text style={{ fontSize: 15 }}>Didn’t receive any code?</Text>
                <Pressable onPress={sendOTP}><Text style={{ color: "#2666CF", fontSize: 15, fontWeight: "700" }}>Resend</Text></Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute space evenly
        marginTop: 20,
    },
    otpBox: {
        width: 40,
        alignItems: 'center',
    },
    otpInput: {
        fontSize: 20,
        textAlign: 'center',
        width: '100%',
        height: 40,
        marginBottom: 5,
    },
    underline: {
        width: '100%',
        height: 2,
        backgroundColor: '#ddd', // Light gray default color
    },
    activeUnderline: {
        backgroundColor: 'blue', // Blue underline for filled boxes
    },
});

export default Phone;