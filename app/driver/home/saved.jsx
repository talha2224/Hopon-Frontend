import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Pressable, ScrollView, Text, View, Image } from 'react-native';
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import home2Image from '../../../assets/images/home2.png';
import office2Image from '../../../assets/images/office2.png';

const Saved = () => {
    const [places, setPlaces] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const fetchPlaces = async () => {
        let driverId = await AsyncStorage.getItem('driverId');
        if (driverId) {
            try {
                const res = await axios.get(`${config.baseUrl}/place/rider/${driverId}`);
                setPlaces(res.data.data);
            } catch (error) {
                console.log('Error fetching places:', error);
            }
        }
    };
    const createPlace = async () => {
        let driverId = await AsyncStorage.getItem('driverId');
        if (driverId && title && description) {
            try {
                const res = await axios.post(`${config.baseUrl}/place/create`, {title,description,riderId:driverId,});
                setPlaces([...places, res.data.data]);
                setOpenModel(false);
                setTitle('');
                setDescription('');
            } catch (error) {
                console.log('Error creating place:', error);
            }
        }
    };
    const truncateText = (message) => {
        if (message.length > 30) {
            return message.substring(0, 30) + "...";
        }
        return message;
    }

    useEffect(() => {
        fetchPlaces();
    }, []);


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <View style={{ marginTop: 30, paddingHorizontal: 20, paddingVertical: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <AntDesign onPress={() => router.push('/driver/home/account')} name="arrowleft" size={24} color={isDarkTheme ? 'white' : 'black'} />
                <Text style={{ color: isDarkTheme ? 'white' : 'black' }}>Saved places</Text>
                <Pressable onPress={() => setOpenModel(true)}>
                    <AntDesign name="plussquare" size={24} color={isDarkTheme ? 'white' : 'black'} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>
                <View style={{ backgroundColor: isDarkTheme ? '#333333' : '#fff', paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    {places?.map((place, index) => (
                        <View key={index} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                    <Image source={index % 2 == 0 ? home2Image : office2Image} />
                                </View>
                                <View style={{ marginLeft: 3 }}>
                                    <Text style={{ color: isDarkTheme ? "#fff" : "#323232", marginBottom: 2 }}>{place?.title}</Text>
                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000000" }}>{truncateText(place?.description)}</Text>
                                </View>
                            </View>
                            {/* <AntDesign name="edit" size={24} color={isDarkTheme ? "white" : "#747C88"} /> */}

                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={openModel} animationType="slide" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            style={{ marginBottom: 10, borderBottomWidth: 1, padding: 8 }}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={{ marginBottom: 20, borderBottomWidth: 1, padding: 8 }}
                        />
                        <Pressable onPress={createPlace} style={{ backgroundColor: '#1E90FF', padding: 12, alignItems: 'center', borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Save Place</Text>
                        </Pressable>
                        <Pressable onPress={() => setOpenModel(false)} style={{ marginTop: 10, alignItems: 'center' }}>
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <BottomNav />
        </View>
    );
};

export default Saved;
