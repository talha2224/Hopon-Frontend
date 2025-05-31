import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import style from '../../../style/rider/home/location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import UserImage from '../../../assets/images/user.png';
import CarImage from '../../../assets/images/car.png';
import OldImage from '../../../assets/images/old.png';
import GroupImage from '../../../assets/images/group.png';
import AlertImage from '../../../assets/images/alert.png';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devConfig from '../../../config';
import axios from 'axios';
import { io } from 'socket.io-client';
import Toast from 'react-native-toast-message';


const darkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#212121' }],
    },
    {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#212121' }],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#757575' }],
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#2c2c2c' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8a8a8a' }],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#373737' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212121' }],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#4e4e4e' }],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#3d3d3d' }],
    },
];
const Accepted = () => {
    const router = useRouter()
    const { isDarkTheme } = useTheme();
    const [mapRegion, setMapRegion] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    const [rideDetails, setrideDetails] = useState(null)
    const [selectedCar, setSelectedCar] = useState(null)
    const [autoHide, setAutoHide] = useState(false)
    const [loader, setLoader] = useState(true)




    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
            latitude: location?.coords?.latitude ? location?.coords?.latitude : 0,
            longitude: location?.coords?.longitude ? location?.coords?.longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };
    const getActiveBooking = async () => {
        try {
            let riderId = await AsyncStorage.getItem('riderId');
            const bookingInfo = await axios.get(`${devConfig.baseUrl}/ride/info/rider/${riderId}`);
            if (bookingInfo?.data?.data?.driver?.location?.coordinates[0]) {
                setrideDetails(bookingInfo.data.data);
                setSelectedCar({ latitude: bookingInfo?.data?.data?.driver?.location?.coordinates[1] ? bookingInfo?.data?.data?.driver?.location?.coordinates[1] : 0, longitude: bookingInfo?.data?.data?.driver?.location?.coordinates[0] ? bookingInfo?.data?.data?.driver?.location?.coordinates[0] : 0, });
            }
        } catch (error) {
            console.error('Error fetching active booking:', error);
        }
    };
    const completeRide = async () => {
        Toast.show({ type: 'success', text1: 'Compeleting Ride...', text2: 'Please wait while we process your information.', autoHide: autoHide });
        try {
            const res = await axios.post(`${devConfig.baseUrl}/ride/end/${rideDetails._id}`,)
            console.log(res.data,'res.data of complete ride')
            if(res.data){
                setAutoHide(true)
                await AsyncStorage.removeItem("booked")
                router.push("/rider/home/feedback")
            }
            
        } 
        catch (error) {
            await AsyncStorage.removeItem("booked")
        }
    }

    const createChat = async ()=>{
        try {
            let driverId = rideDetails?.driver?._id
            let riderId = await AsyncStorage.getItem('riderId');
            const res = await axios.post(`${devConfig.baseUrl}/chat/create`,{driverId,riderId})
            console.log(rideDetails?.driver?.first_name,'res of create chat')
            await AsyncStorage.setItem("chatId",res?.data?.data?._id)
            await AsyncStorage.setItem("driverName",rideDetails?.driver?.first_name)
            router.push("/rider/home/messages")
        } 
        catch (error) {
            console.log(error)
        }
    }

    // GET ACTIVE BOOKING 
    useEffect(() => {
        const intervalId = setInterval(getActiveBooking, 10000);
        return () => { clearInterval(intervalId); };
    }, []);
    // GET USER LOCATION 
    useEffect(() => {
        userLocation()
        setTimeout(() => {
            setLoader(false)
        }, 5000);
    }, [])


    // console.log(rideDetails,'rideDetails')


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <StatusBar hidden />

            {
                !loader ?

                    <View style={{ flex: 1 }}>

                        <View style={style.topBar}>

                            <AntDesign onPress={() => router.push("/rider/home")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />

                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: isDarkTheme ? "black" : "white", paddingVertical: 5, borderRadius: 20, paddingHorizontal: 10 }}>
                                <MaterialCommunityIcons name="target" size={24} color={isDarkTheme ? "white" : "black"} />
                                <Text style={{ marginLeft: 10, color: isDarkTheme && "white" }}>Location</Text>
                            </View>


                        </View>

                        <MapView customMapStyle={isDarkTheme && darkMapStyle} style={style.map2} region={mapRegion} showsUserLocation showsMyLocationButton={false}>

                            <Marker coordinate={mapRegion}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={UserImage} />
                                </View>
                            </Marker>

                            <Marker coordinate={{ latitude: selectedCar?.latitude ? selectedCar?.latitude : 0, longitude: selectedCar?.longitude ? selectedCar?.longitude : 0 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                </View>
                            </Marker>

                            <Polyline coordinates={[{ latitude: mapRegion?.latitude ? mapRegion?.latitude : 0, longitude: mapRegion.longitude ? mapRegion.longitude : 0 }, { latitude: selectedCar?.latitude ? selectedCar?.latitude : 0, longitude: selectedCar?.longitude ? selectedCar.longitude : 0 }]} strokeColor={isDarkTheme ? "white" : "black"} strokeWidth={1} />
                        </MapView>

                        {/* CARS  */}

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={style.cards}>
                            <View style={{ backgroundColor: isDarkTheme ? "#292929" : "white", padding: 10, marginRight: 20, width: 320, borderRadius: 9, borderWidth: isDarkTheme ? 0 : 0.3, borderColor: "#A0A1A3" }}>

                                <Text style={{ textAlign: "center", color: isDarkTheme ? "white" : "#767575", marginBottom: 10 }}>Your ride has started</Text>
                                <Text style={{ textAlign: "center", fontWeight: "800", marginBottom: 10, color: isDarkTheme && "white" }}>${rideDetails?.fare?.toFixed(2)}</Text>
                                <Pressable onPress={completeRide} style={{ backgroundColor: "#2666cf", width: "100%", height: 35, justifyContent: "center", alignItems: "center", marginTop: 13, borderRadius: 8 }}>
                                    <Text style={{ color: "#fff" }}>End Ride</Text>
                                </Pressable>
                                <Pressable onPress={createChat} style={{ backgroundColor: "#2666cf", width: "100%", height: 35, justifyContent: "center", alignItems: "center", marginTop: 13, borderRadius: 8 }}>
                                    <Text style={{ color: "#fff" }}>Chat With Driver</Text>
                                </Pressable>

                            </View>
                        </ScrollView>

                    </View>
                    :

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>Loading...</Text>
                    </View>
            }
            <Toast />
        </View>
    )
}

export default Accepted