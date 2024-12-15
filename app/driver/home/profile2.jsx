import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Modal, TextInput, Button } from 'react-native';
import style from '../../../style/rider/home/profile';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImage from '../../../assets/images/user.png';  // Default user image
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import config from '../../../config';

const Profile2 = () => {
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    // Fetch profile data from API
    const fetchProfile = async () => {
        const riderId = await AsyncStorage.getItem('driverId');
        if (riderId) {
            try {
                const res = await axios.get(`${config.baseUrl}/driver/info/${riderId}`);
                setData(res.data.data);
            } catch (error) {
                console.log('Error fetching profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Handle image selection
    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,quality: 1,});
            if (!pickerResult.canceled) {
                console.log(pickerResult?.assets[0],'pickerResult')
                setImageUri(pickerResult?.assets[0]);
            }
        }
    };

    // Handle image upload to server
    const uploadImage = async () => {
        const riderId = await AsyncStorage.getItem('driverId');
        if (riderId && imageUri) {
            const formData = new FormData();
            formData.append("image", { uri: imageUri.uri, name: `userPhoto.jpg`, type: "image/jpeg" })

            try {
                await fetch(`${config.baseUrl}/driver/upload/${riderId}`, {method: "PUT",body: formData,headers: { "Content-Type": "multipart/form-data", },});
                setModalVisible(false);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <View style={{ marginTop: 30, backgroundColor: '#2666CF', paddingHorizontal: 20, paddingVertical: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                <AntDesign onPress={() => router.push('/driver/home/account')} name="arrowleft" size={24} color={isDarkTheme ? 'white' : 'black'} />
                <Text style={{ color: isDarkTheme ? 'white' : 'black' }}>Profile</Text>
                <View></View>
            </View>

            <View style={{ alignItems: 'center', marginVertical: 50, marginHorizontal: 20, backgroundColor: isDarkTheme ? "#FFFFFF" : "#000", paddingBottom: 10, borderRadius: 10 }}>
                <Pressable onPress={() => setModalVisible(true)} style={{ marginTop: -30 }}>
                    <Image source={data?.profile ? { uri: data.profile } : UserImage} style={{ width: 70, height: 70, borderRadius: 50 }} />
                </Pressable>
                <Text style={{ fontSize: 20, marginTop: 10 }}>{data?.first_name} {data?.last_name}</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginTop: 2 }}>Pending Amount: ${data?.pendingAmount.toFixed(2)}</Text>
            </View>

            <View style={{ paddingHorizontal: 20, backgroundColor: isDarkTheme ? "#FFFFFF" : "#000", marginHorizontal: 20, borderRadius: 10, padding: 10 }}>
                <Text style={{ fontSize: 20, marginBottom: 5, color: "#A8A8A8" }}>Personal Information</Text>
                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.first_name}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>First Name</Text>
                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.last_name}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>Last Name</Text>

                <Text style={{ fontSize: 16, marginBottom: 2 }}>English</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>Language</Text>

                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.phone_number}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>Phone Number</Text>
            </View>

            {/* Image Upload Modal */}
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide" transparent={true}>
                <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={{width: 300,padding: 20,backgroundColor: '#fff',borderRadius: 10,alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Upload Profile Image</Text>

                        <Pressable style={{backgroundColor: '#2666CF',paddingVertical: 12,paddingHorizontal: 30,borderRadius: 5,marginBottom: 15,width: '100%',alignItems: 'center'}} onPress={handleImagePick}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Choose Image</Text>
                        </Pressable>

                        <Pressable style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 30,borderRadius: 5,marginBottom: 15,width: '100%',alignItems: 'center'}} onPress={uploadImage} disabled={!imageUri}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Upload</Text>
                        </Pressable>

                        <Pressable style={{ backgroundColor: '#f44336', paddingVertical: 10, width: '100%', alignItems: 'center', borderRadius: 5,}} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Profile2;
