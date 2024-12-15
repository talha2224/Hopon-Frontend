import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import style from '../../../style/rider/home/home';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import UserImage from '../../../assets/images/user.png';
import CarImage from '../../../assets/images/car.png';
import LocationImage from '../../../assets/images/location.png';
import OnboardImage from '../../../assets/images/onboard.png';
import OfflineImage from '../../../assets/images/offline.png';
import OnlineImage from '../../../assets/images/online.png';
import { useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import GroupImage from '../../../assets/images/group.png';
import BottomNav2 from '../../../components/BottomNav2';
import { useTheme } from '../../../hooks/themeContext';
import axios from 'axios';
import config from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

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
    const [loader, setloader] = useState(true)
    const router = useRouter()
    const [mapRegion, setMapRegion] = useState({ latitude: 37.78825, longitude: -122.4325});
    const [rideDetails, setRideDetails] = useState(null)
    const [end, setEnd] = useState(false)
    const { isDarkTheme } = useTheme();
    const [mapType, setMapType] = useState("pickup")

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const zoomLevel = 10;
        const aspectRatio = 16 / 9;
        const latitudeDelta = 1 / zoomLevel;
        const longitudeDelta = latitudeDelta * aspectRatio;
        setMapRegion({ 
            latitude: location?.coords?.latitude ? location?.coords?.latitude : 0, 
            longitude: location?.coords?.longitude ?  location?.coords?.longitude : 0,
            latitudeDelta:latitudeDelta,
            longitudeDelta:longitudeDelta
        });
    }

    const changeMapType = async (type) => {
        setMapType(type)
    }

    const fetchActiveRide = async () => {
        try {
            let driverId = await AsyncStorage.getItem('driverId');
            const ride = await axios.get(`${config.baseUrl}/ride/info/driver/${driverId}`);
            setRideDetails(ride?.data?.data)
            let location = await Location.getCurrentPositionAsync({});
            setMapRegion({latitude: location?.coords?.latitude ? location?.coords?.latitude : 0, longitude: location?.coords?.longitude ?  location?.coords?.longitude : 0});
            const res = await axios.post(`${config.baseUrl}/driver/update/location`, { driverId, longitude: location?.coords?.longitude, latitude: location?.coords?.latitude });
        }
        catch (error) {
            console.log(error, 'error in fetchActiveRide')
        }
    }

    const completeRide = async () => {
        router.push("/driver/home")
        const res = await axios.post(`${config.baseUrl}/ride/end/${rideDetails?._id}`,)
    }

    useEffect(() => {
        const intervalId = setInterval(fetchActiveRide, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        userLocation();
        setTimeout(() => {
            setloader(false)
        }, 3000);
    }, [])



    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>



            {
                !loader ?

                    <ScrollView contentContainerStyle={style.Scrollcontainer}>

                        {/* TOPBAR  */}
                        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 20, paddingVertical: 20 }}>

                            <Image source={UserImage} />

                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: isDarkTheme ? "#333333" : "#F4F4F4", borderRadius: 20, height: 30, width: "auto" }}>
                                <View style={{ marginLeft: 10, marginRight: 10 }}>
                                    <Text style={isDarkTheme ? style.btn2TxtDark : style.btn2Txt}>Rider</Text>
                                </View>
                                <View style={{ backgroundColor: "#FFFF", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginRight: 10 }}>
                                    <Text>Driver</Text>
                                </View>
                            </View>

                            <Image source={LocationImage} style={{ marginRight: -25 }} />


                        </View>

                        {/* MAP */}


                        {
                            mapType==="pickup" ?
                                <MapView style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false} customMapStyle={isDarkTheme && darkMapStyle}>


                                    <Marker coordinate={{ latitude: rideDetails?.pickupLocation?.coordinates[1] ? rideDetails?.pickupLocation?.coordinates[1] : 0, longitude:rideDetails?.pickupLocation?.coordinates[0] ? rideDetails?.pickupLocation?.coordinates[0] : 0 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={UserImage} />
                                        </View>
                                    </Marker>

                                    <Marker coordinate={{ latitude:mapRegion?.latitude ? mapRegion?.latitude : 0, longitude:mapRegion?.longitude ? mapRegion?.longitude : 0 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                        </View>
                                    </Marker>

                                    <Polyline coordinates={[{ latitude: rideDetails?.pickupLocation?.coordinates[1] ? rideDetails?.pickupLocation?.coordinates[1] : 0, longitude:rideDetails?.pickupLocation?.coordinates[0] ? rideDetails?.pickupLocation?.coordinates[0] : 0 }, { latitude:mapRegion?.latitude ? mapRegion?.latitude : 0, longitude:mapRegion?.longitude ? mapRegion?.longitude : 0}]} strokeColor={isDarkTheme ? "white" : "black"} strokeWidth={1} />
                                </MapView>
                                :
                                <MapView style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false} customMapStyle={isDarkTheme && darkMapStyle}>

                                    <Marker coordinate={{ latitude: rideDetails?.dropoffLocation?.coordinates[1] ? rideDetails?.dropoffLocation?.coordinates[1] : 0, longitude:rideDetails?.dropoffLocation?.coordinates[0] ? rideDetails?.dropoffLocation?.coordinates[0] : 0 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={UserImage} />
                                        </View>
                                    </Marker>

                                    <Marker coordinate={{ latitude:mapRegion?.latitude ? mapRegion?.latitude : 0, longitude:mapRegion?.longitude ? mapRegion?.longitude : 0 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                        </View>
                                    </Marker>

                                    <Polyline coordinates={[{ latitude: rideDetails?.dropoffLocation?.coordinates[1] ? rideDetails?.dropoffLocation?.coordinates[1] : 0, longitude:rideDetails?.dropoffLocation?.coordinates[0] ? rideDetails?.dropoffLocation?.coordinates[0] : 0 }, { latitude:mapRegion?.latitude ? mapRegion?.latitude : 0, longitude:mapRegion?.longitude ? mapRegion?.longitude : 0}]} strokeColor={isDarkTheme ? "white" : "black"} strokeWidth={1} />
                                </MapView>

                        }



                        {/* CARD  */}
                        {
                            <View style={{ width: "100%", position: "absolute", bottom: 50, left: 0, zIndex: 999, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <View style={[{ width: "90%", backgroundColor: isDarkTheme ? "#13182F" : "#fff", padding: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }]}>

                                    <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "start", flexDirection: "row", backgroundColor: !isDarkTheme && "#FAFAFA", padding: 10, width: "95%", marginVertical: 10 }}>

                                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                                            <Image source={UserImage} />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ color: isDarkTheme && "white" }}>{rideDetails?.rider?.first_name ? rideDetails?.rider?.first_name : "loading"}</Text>
                                                <View style={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
                                                    <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                    <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                    <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                    <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#E4E4E4" />
                                                    <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#E4E4E4" />

                                                </View>
                                            </View>
                                        </View>

                                        <Text style={{ color: isDarkTheme && "white" }}>{rideDetails?.rider?.phone_number ? rideDetails?.rider?.phone_number : "loading"}</Text>



                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2, width: "100%" }}>
                                        <Text style={{ color: "#88898a" }}>Rider Phone Number</Text>
                                        <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{rideDetails?.rider?.phone_number ? rideDetails?.rider?.phone_number : "loading"}</Text>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5, width: "100%" }}>
                                        <Text style={{ color: "#88898a" }}>Fare estimate</Text>
                                        <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>${rideDetails?.fare ? rideDetails?.fare : "loading"}</Text>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2, width: "100%" }}>
                                        <Text style={{ color: "#88898a" }}>Pickup</Text>
                                        <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{rideDetails?.pickUpAddress?rideDetails?.pickUpAddress?.split(" ")[0] + " " + rideDetails?.pickUpAddress?.split(" ")[1] + " " + rideDetails?.pickUpAddress?.split(" ")[2] + " " + rideDetails?.pickUpAddress?.split(" ")[3] + " " + rideDetails?.pickUpAddress?.split(" ")[4]:"loading"}</Text>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5, width: "100%" }}>
                                        <Text style={{ color: "#88898a" }}>DropOff</Text>
                                        <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{rideDetails?.dropoffAddress ? rideDetails?.dropoffAddress?.split(" ")[0] + " " + rideDetails?.dropoffAddress?.split(" ")[1] + " " + rideDetails?.dropoffAddress?.split(" ")[2] + " " + rideDetails?.dropoffAddress?.split(" ")[3] : "loading"}</Text>
                                    </View>


                                    <Pressable onPress={completeRide} style={[{ width: "100%", backgroundColor: "#2666CF", height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 5 }]}>
                                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 15 }}>Complete Ride</Text>
                                    </Pressable>


                                    <Pressable onPress={()=>changeMapType(mapType==="pickup" ? "drop" : "pickup")} style={[{ width: "100%", backgroundColor: "#2666CF", height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 5 }]}>
                                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 15 }}>View {mapType==="pickup" ? "Drop Off" : "Pickup"} Map </Text>
                                    </Pressable>




                                </View>
                            </View>
                        }

                        {
                            end && (
                                <View style={[style.popupContainer, { width: "100%", height: "100%" }]}>
                                    <View style={[style.popuDark2, { width: "90%" }]}>

                                        <View style={{ backgroundColor: "#EBF9EF", display: "flex", justifyContent: "center", alignItems: "center", padding: 15, width: "100%" }}>

                                            <Text style={{ color: "#1b4949", fontSize: 16, fontWeight: "600" }}>Ride Completed</Text>

                                        </View>


                                        <View style={{ alignItems: "center", flexDirection: "row", width: "100%" }}>
                                            <Image source={GroupImage} />
                                            <View style={{ marginLeft: 20 }}>
                                                <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Cinema</Text>
                                                <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                                <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Jekad Store</Text>
                                                <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                            </View>
                                        </View>


                                        <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 5, flexDirection: "row", backgroundColor: "#F4F3F3", marginTop: 8, borderRadius: 5, width: "100%" }}>
                                            <Text style={{ color: "#2666cf", fontSize: 13 }}>14th September, 2024</Text>
                                            <Text style={{ color: "#2666cf", fontSize: 13 }}>7.7KM (1 Hour 30 mins)</Text>
                                        </View>

                                        <Text style={{ width: "100%", textAlign: "center", marginVertical: 10, color: isDarkTheme ? "white" : "#6B6C6D" }}>Leave a review</Text>

                                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center" }}>
                                            <AntDesign name="star" size={18} style={{ marginRight: 2 }} color="#51D476" />
                                            <AntDesign name="star" size={19} style={{ marginRight: 2 }} color="#51D476" />
                                            <AntDesign name="star" size={18} style={{ marginRight: 2 }} color="#51D476" />
                                            <AntDesign name="star" size={18} style={{ marginRight: 2 }} color="#E4E4E4" />
                                            <AntDesign name="star" size={18} style={{ marginRight: 2 }} color="#E4E4E4" />

                                        </View>

                                        <View style={[{ width: "100%", backgroundColor: "#2666CF", height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 5 }]}>
                                            <Text onPress={() => { setEnd(false); setactiveStatus("off") }} style={{ color: "#ffff", fontWeight: "bold", fontSize: 15 }}>Submit</Text>
                                        </View>


                                    </View>
                                </View>
                            )
                        }



                    </ScrollView>

                    :

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>Loading...</Text>
                    </View>



            }


            <BottomNav2 />




        </View>
    );
};

export default Accepted;
