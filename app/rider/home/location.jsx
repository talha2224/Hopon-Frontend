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
import haversine from 'haversine';
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


const Index = () => {
    const socket = io(`${devConfig.socketUrl}`);
    const router = useRouter()
    const [mapRegion, setMapRegion] = useState({ latitude: 37.78825, longitude: -122.4325, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    const [drivers, setDrivers] = useState([]);
    const [showLocation] = useState(true)
    const [count, setCount] = useState(0)
    const data = [1, 2, 3, 4, 5]
    const [singleCar, setSingleCar] = useState(false)
    const [pay, setPay] = useState(false)
    const [detailView, setDetailView] = useState(false)
    const [end, setEnd] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const { isDarkTheme } = useTheme();
    const [selectedCar, setSelectedCar] = useState(null)
    const [rideDetails, setrideDetails] = useState(null)
    const [loading, setLoading] = useState(null);
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [pick, setpick] = useState('');
    const [price, setprice] = useState(0);
    const [autoHide, setAutoHide] = useState(false)
    const [hasRedirected, setHasRedirected] = useState(false);


    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });

        getDriver()
    };

    const getDriver = async () => {

        try {
            let pickupLongitude = await AsyncStorage.getItem('pickupLongitude');
            let pickupLatitude = await AsyncStorage.getItem('pickupLatitude');
            const res = await axios.post(`${devConfig.baseUrl}/driver/near-by`, { pickupLongitude: Number(pickupLongitude), pickupLatitude: Number(pickupLatitude) });
            const driversList = res.data.map((driver) => ({
                id: driver?._id,
                latitude: driver?.location?.coordinates[1] ? driver?.location?.coordinates[1] : 0,
                longitude: driver?.location?.coordinates[0] ? driver?.location?.coordinates[0] : 0,
                name: `${driver?.first_name} ${driver.last_name}`,
                phone: driver?.phone_number,
                carPhotos: driver?.carPhotos,
            }));
            setDrivers(driversList);
        }
        catch (error) {

        }
    }



    const calculatePrice = async () => {
        try {
            const dropoffLongitude = await AsyncStorage.getItem('dropoffLongitude');
            const dropoffLatitude = await AsyncStorage.getItem('dropoffLatitude');
            if (dropoffLongitude && dropoffLatitude && mapRegion?.longitude && mapRegion?.latitude) {
                const dropoffLocation = { latitude: parseFloat(dropoffLatitude), longitude: parseFloat(dropoffLongitude), };
                const pickupLocation = { latitude: mapRegion?.latitude, longitude: mapRegion?.longitude, };
                const distance = haversine(pickupLocation, dropoffLocation, { unit: 'km' });
                const pricePerKm = 5;
                const totalPrice = distance * pricePerKm;
                return setprice(totalPrice.toFixed(2))
            }
            else {
                console.error("Dropoff location not set in AsyncStorage");
            }
        }
        catch (error) { console.error("Error calculating price:", error); }
    };

    const confirmRide = async () => {

        try {
            setAutoHide(false)
            setLoading(false)
            Toast.show({type: 'success',text1: 'Creating Ride...',text2: 'Please wait while we process your information.',autoHide:true});
            const dropoffLongitude = await AsyncStorage.getItem('dropoffLongitude');
            const dropoffLatitude = await AsyncStorage.getItem('dropoffLatitude');
            const pickUpAddress = await AsyncStorage.getItem('pickupAddress');

            let riderId = await AsyncStorage.getItem('riderId');
            const res = await axios.post(`${devConfig.baseUrl}/ride/booking`, {
                riderId: riderId,
                driverId: selectedCar.id,
                pickupLocation: { type: "Point", coordinates: [mapRegion?.longitude, mapRegion?.latitude] },
                dropoffLocation: { type: "Point", coordinates: [Number(dropoffLongitude), Number(dropoffLatitude)] },
                dropoffAddress: dropoffAddress,
                pickUpAddress: pickUpAddress
            });
            setAutoHide(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    const cancelRide = async () => {

        try {
            setAutoHide(false)
            Toast.show({type: 'success',text1: 'Cancelling Ride...',text2: 'Please wait while we process your information.',autoHide:autoHide});
            let riderId = await AsyncStorage.getItem('riderId');
            const res = await axios.get(`${devConfig.baseUrl}/ride/cancel/rider/${riderId}`);
            setAutoHide(true)
            router.push("/rider/home/canceled")
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const calculateDistanceInKm = (driverLongitude = 0, driverLatitude = 0, pickupLongitude = mapRegion?.longitude, pickupLatitude = mapRegion?.latitude) => {
        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const earthRadiusKm = 6371;
        const deltaLat = toRadians(pickupLatitude - driverLatitude);
        const deltaLon = toRadians(pickupLongitude - driverLongitude);
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(toRadians(driverLatitude)) * Math.cos(toRadians(pickupLatitude)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseFloat(c.toFixed(2));

    };

    const estimateTimeToReach = (driverLongitude = 0, driverLatitude = 0, pickupLongitude = 0, pickupLatitude = 0, averageSpeedKmPerHour = 100) => {
        const distance = calculateDistanceInKm(driverLongitude, driverLatitude, pickupLongitude, pickupLatitude);
        const timeInHours = distance / averageSpeedKmPerHour;
        const timeInMinutes = timeInHours * 60;
        return parseFloat(timeInMinutes.toFixed(2));
    };

    
    const getActiveBooking = async () => {
        try {
            await AsyncStorage.setItem("booked","true")
            let riderId = await AsyncStorage.getItem('riderId');
            const bookingInfo = await axios.get(`${devConfig.baseUrl}/ride/info/rider/${riderId}`);
            
            if (bookingInfo?.data?.data?.driver?.location?.coordinates[0]) {
                setrideDetails(bookingInfo?.data?.data);
                
                setSelectedCar({
                    latitude: bookingInfo?.data?.data?.driver?.location?.coordinates[1] || 0,
                    longitude: bookingInfo?.data?.data?.driver?.location?.coordinates[0] || 0,
                });
                setLoading(true);
                setCount(10);
            }
        } 
        catch (error) {
            console.error('Error fetching active booking:', error);
        }
    };

    const RideExits = async()=>{
        let res = await AsyncStorage.getItem("booked")
        res=="true" && router.push("/rider/home/accepted")
    }

    useEffect(()=>{
        RideExits()
    },[])

    useEffect(() => {
        const intervalId = setInterval(getActiveBooking, 10000);
        return () => {clearInterval(intervalId);};
    }, []);

    useEffect(() => {
        const joinDriverRoom = async () => {
            const driverId = await AsyncStorage.getItem('riderId');
            if (driverId) { socket.emit('joinRoom', driverId) }
        };

        joinDriverRoom();

        socket.on('connect', () => { console.log('Socket connected:', socket.id); });

        socket.on('cancelRide', (ride) => {
            router.push("/rider/home/canceled")
        });

        return () => {
            socket.off('connect');
            socket.off('cancelRide');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        userLocation();
    }, []);

    useEffect(() => {
        const getStoredCoordinates = async () => {
            const dropAddress = await AsyncStorage.getItem('dropoffAddress');
            const pickUpAddress = await AsyncStorage.getItem('pickupAddress');
            setpick(pickUpAddress)
            setDropoffAddress(dropAddress)
        };

        getStoredCoordinates();
    }, []);



    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <StatusBar hidden />


            <ScrollView contentContainerStyle={style.Scrollcontainer}>

                {/* TOPBAR  */}

                {
                    (!showLocation && count == 1) && (
                        <View style={style.topBar}>

                            <AntDesign onPress={() => router.push("/rider/home")} name="arrowleft" size={24} color="black" />

                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", paddingVertical: 5, borderRadius: 20, paddingHorizontal: 10 }}>
                                <MaterialCommunityIcons name="target" size={24} color="black" />
                                <Text style={{ marginLeft: 10 }}>Location</Text>
                            </View>


                        </View>
                    )
                }

                {
                    showLocation && count == 0 && (
                        <View style={{ padding: 20, position: "relative", flex: 1 }}>
                            <AntDesign onPress={() => router.push("/rider/home")} name="arrowleft" size={24} color="black" />

                            <Text style={{ marginTop: 10, color: isDarkTheme ? "#fff" : "#A0A1A3" }}>Current Address</Text>
                            <TextInput editable={false} selection={{ start: 0, end: 0 }} value={pick} placeholder='' style={{ marginTop: 5, borderBottomWidth: 1, height: 40, borderBottomColor: "#A0A1A3", color: "#fff" }} />
                            <Text style={{ marginTop: 10, color: isDarkTheme ? "#fff" : "#A0A1A3" }}>Drop Off</Text>
                            <TextInput editable={false} selection={{ start: 0, end: 0 }} value={dropoffAddress} placeholder='' style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: "#A0A1A3", color: "#fff" }} />

                            <View style={{ backgroundColor: "#2666cf", width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, position: "absolute", bottom: 40, left: 20 }}>
                                <Text onPress={() => setCount(1)} style={{ color: "#fff" }}>Confirm location</Text>
                            </View>
                        </View>
                    )
                }

                {
                    (showLocation && count == 1 && !singleCar) && (
                        <View style={{ flex: 1, backgroundColor: isDarkTheme && "#000", marginTop: -20 }}>
                            <AntDesign style={{ paddingTop: 20, paddingHorizontal: 20 }} onPress={() => router.push("/rider/home")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />

                            <View style={{ alignItems: "center", flexDirection: "row", marginHorizontal: 20 }}>
                                <Image source={GroupImage} />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ marginTop: 10, color: isDarkTheme ? "#fff" : "#A0A1A3" }}>Current Address</Text>
                                    <TextInput editable={false} selection={{ start: 0, end: 0 }} value={pick} placeholderTextColor={isDarkTheme && "#fff"} placeholder='Earthcare scapes church god' style={{ marginTop: 5, borderBottomWidth: 1, height: 40, borderBottomColor: "#A0A1A3", color: isDarkTheme && "#fff" }} />
                                    <Text style={{ marginTop: 10, color: isDarkTheme ? "#fff" : "#A0A1A3" }}>Drop Off</Text>
                                    <TextInput editable={false} selection={{ start: 0, end: 0 }} value={dropoffAddress} placeholderTextColor={isDarkTheme && "#fff"} placeholder='Earthcare scapes church god' style={{ marginTop: 5, paddingBottom: 20, color: isDarkTheme && "#fff" }} />
                                </View>
                            </View>

                            <MapView customMapStyle={isDarkTheme && darkMapStyle} style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false}>

                                <Marker coordinate={mapRegion}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={UserImage} />
                                    </View>
                                </Marker>

                                {
                                    drivers?.map(driver => (
                                        <Marker key={driver.id} coordinate={{ latitude: driver?.latitude ? driver?.latitude : 0, longitude: driver?.longitude ? driver?.longitude : 0 }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                            </View>
                                        </Marker>
                                    ))
                                }
                            </MapView>

                            {/* CARS  */}

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[style.cards, { backgroundColor: isDarkTheme && "#000",flex:1 }]}>

                                {

                                    drivers?.length > 0 ?

                                        drivers?.map((i) => (

                                            <View key={i?._id} style={{ backgroundColor: isDarkTheme ? "#292929" : "white", padding: 10, marginRight: 20, width: 250, borderRadius: 8, borderWidth: !isDarkTheme ? 0.3 : 0, borderColor: "#A0A1A3" }}>

                                                <View style={{ flexDirection: "row" }}>
                                                    {/* backgroundColor: "#F1F1F1" */}
                                                    <View style={{ padding: 3, borderRadius: 10, marginRight: 20 }}>
                                                        <Image source={{ uri: i.carPhotos[0] }} style={{ width: 60, height: 60 }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontWeight: "bold", color: isDarkTheme && "#ffff" }}>Premium - Car</Text>
                                                        <Text style={{ marginTop: 5, color: "#6a6a6a" }}>Price:  $5/km</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            {
                                                                data.map((i) => (
                                                                    <AntDesign key={i} name="star" size={15} color={i < 4 ? "#51D476" : "#E4E4E4"} style={{ marginTop: 5, marginRight: 3 }} />
                                                                ))
                                                            }
                                                        </View>

                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                                    <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: isDarkTheme && "#fff" }} onPress={() => { setSingleCar(true); setSelectedCar(i); calculatePrice() }}>2 {estimateTimeToReach(i?.longitude, i?.i?.latitude, mapRegion.longitude, mapRegion.latitude)}</Text>
                                                    </View>
                                                    <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: isDarkTheme && "#fff" }} onPress={() => { setSingleCar(true); setSelectedCar(i); calculatePrice() }}>2 Gear</Text>
                                                    </View>
                                                    <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: isDarkTheme && "#fff" }} onPress={() => { setSingleCar(true); setSelectedCar(i); calculatePrice() }}>{calculateDistanceInKm(i?.longitude, i?.i?.latitude, mapRegion.longitude, mapRegion.latitude)}KM</Text>
                                                    </View>
                                                </View>


                                            </View>
                                        ))
                                        :
                                        <View style={{ justifyContent: "center", alignItems: "center", width: "100%"}}>
                                            <Text style={{ color: "white",fontSize:14 }}>Sorry No Active Riders Found!</Text>
                                        </View>
                                }


                            </ScrollView>

                        </View>
                    )
                }

                {
                    (showLocation && count == 1 && singleCar) && (
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

                                <Marker coordinate={{ latitude: selectedCar.latitude, longitude: selectedCar.longitude }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                    </View>
                                </Marker>

                                <Polyline coordinates={[{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }, { latitude: selectedCar.latitude, longitude: selectedCar.longitude }]} strokeColor={isDarkTheme ? "white" : "black"} strokeWidth={1} />
                            </MapView>

                            {/* CARS  */}

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={style.cards}>

                                {
                                    !pay ?
                                        <View style={{ backgroundColor: isDarkTheme ? "#292929" : "white", padding: 10, marginRight: 20, width: 320, borderRadius: 9, borderWidth: isDarkTheme ? 0 : 0.3, borderColor: "#A0A1A3" }}>

                                            <View style={{ flexDirection: "row" }}>

                                                <View style={{ padding: 3, borderRadius: 10, marginRight: 20 }}>
                                                    <Image source={{ uri: selectedCar?.carPhotos[0] }} style={{ width: 60, height: 60 }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontWeight: "bold", color: isDarkTheme && "white" }}>Premium - Car</Text>
                                                    <Text style={{ marginTop: 5, color: "#6a6a6a" }}>Price:  $5/km</Text>
                                                    <View style={{ flexDirection: "row" }}>
                                                        {
                                                            data.map((i) => (
                                                                <AntDesign key={i} name="star" size={15} color={i < 4 ? "#51D476" : "#E4E4E4"} style={{ marginTop: 5, marginRight: 3 }} />
                                                            ))
                                                        }
                                                    </View>

                                                </View>

                                            </View>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                                <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ color: isDarkTheme && "white" }} onPress={() => setSingleCar(true)}>2 min</Text>
                                                </View>
                                                <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ color: isDarkTheme && "white" }} onPress={() => setSingleCar(true)}>2 Gear</Text>
                                                </View>
                                                <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ color: isDarkTheme && "white" }} onPress={() => setSingleCar(true)}>2 KM</Text>
                                                </View>
                                            </View>


                                            <View style={{ backgroundColor: "#2666cf", width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 13, borderRadius: 8 }}>
                                                <Text onPress={() => setPay(true)} style={{ color: "#fff" }}>Book Ride {price}</Text>
                                            </View>


                                        </View> :
                                        <View style={{ backgroundColor: isDarkTheme ? "#292929" : "white", padding: 10, marginRight: 20, width: 320, borderRadius: 9, borderWidth: isDarkTheme ? 0 : 0.3, borderColor: "#A0A1A3" }}>

                                            <Text style={{ textAlign: "center", color: isDarkTheme ? "white" : "#767575", marginBottom: 10 }}>How would you like to pay?</Text>
                                            <Text style={{ textAlign: "center", fontWeight: "800", marginBottom: 10, color: isDarkTheme && "white" }}>${price}</Text>


                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={{ backgroundColor: isDarkTheme ? "#323232" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", flex: 1 }}>
                                                    <Text style={{ color: isDarkTheme && "white" }} onPress={() => setSingleCar(true)}>Cash</Text>
                                                </View>
                                            </View>


                                            <Pressable style={{ backgroundColor: "#2666cf", width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 13, borderRadius: 8 }}>
                                                <Text onPress={confirmRide} style={{ color: "#fff" }}>Confirm Ride</Text>
                                            </Pressable>


                                        </View>
                                }



                            </ScrollView>

                        </View>
                    )
                }


                {
                    detailView && (

                        <View style={[style.popupContainer, { width: "100%", height: "100%" }]}>
                            <View style={[isDarkTheme ? style.popuDark : style.popu, { width: "90%" }]}>
                                <View style={{ backgroundColor: isDarkTheme ? "#2E2D2D" : "black", width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingBottom: 10 }}>
                                    <Text style={{ textAlign: "center", color: "white", marginVertical: 10, fontWeight: "800", fontSize: 16 }}>Meet Daniel Graver at the pickup point</Text>
                                    <Text style={{ color: "#aeaeae", textAlign: "center" }}>Your ride is arriving in 5 mins</Text>
                                </View>

                                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: "#FAFAFA", padding: 10, width: "95%", margin: 10, borderRadius: isDarkTheme ? 10 : 0 }}>

                                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                                        <Image source={UserImage} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text>Daniel Graver</Text>
                                            <Text style={{ marginTop: 2, color: "#7c8088" }}>Toyota Venza</Text>
                                        </View>
                                    </View>

                                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                                        <AntDesign name="message1" size={20} color="black" style={{ marginRight: 10 }} />
                                        <Feather name="phone-call" size={20} color="black" />
                                    </View>

                                </View>


                                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme ? "#292929" : "#FAFAFA", padding: 10, width: "95%", margin: 10, borderRadius: isDarkTheme ? 8 : 0 }}>

                                    <View style={{ alignItems: "center", flexDirection: "row", marginHorizontal: 20 }}>
                                        <Image source={GroupImage} />
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Cinema</Text>
                                            <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                            <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Jekad Store</Text>
                                            <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme ? "#292929" : "#FAFAFA", padding: 10, width: "95%", margin: 10, borderRadius: isDarkTheme ? 8 : 0 }}>
                                    <Text style={{ color: isDarkTheme && "white" }}>Payment</Text>
                                    <Text style={{ color: isDarkTheme && "white" }}>$100</Text>
                                </View>

                                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme ? "#292929" : "#FAFAFA", padding: 10, width: "95%", margin: 10, borderRadius: isDarkTheme ? 8 : 0 }}>
                                    <View style={{ backgroundColor: isDarkTheme ? "#494949" : "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                                        <Text onPress={() => setSingleCar(true)} style={{ color: isDarkTheme && "white" }}>Cash </Text>
                                    </View>
                                </View>

                                <View style={{ backgroundColor: "#2666cf", width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginVertical: 13, borderRadius: 8 }}>
                                    <Text onPress={() => { setDetailView(false); setEnd(true) }} style={{ color: "#fff" }}>View trip</Text>
                                </View>
                            </View>
                        </View>
                    )
                }

                {
                    end && (

                        <View style={[style.popupContainer, { width: "100%", height: "100%" }]}>
                            <View style={[isDarkTheme ? style.popuDark : style.popu, { width: "90%" }]}>

                                <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: !isDarkTheme && "#FAFAFA", padding: 10, width: "95%", margin: 10 }}>

                                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                                        <Image source={UserImage} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ color: isDarkTheme && "white" }}>Daniel Graver</Text>
                                            <Text style={{ marginTop: 2, color: "#7c8088" }}>256 Completed ride</Text>
                                        </View>
                                    </View>

                                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                                        <AntDesign name="message1" size={20} color="black" style={{ marginRight: 10 }} />
                                        <Feather name="phone-call" size={20} color="black" />
                                    </View>

                                </View>


                                <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginVertical: 0, borderRadius: 8, borderWidth: 1, borderColor: !isDarkTheme ? "#F1F1F1" : "#4F4F4F", }}>
                                    <Text onPress={() => { setConfirm(true); setEnd(false) }} style={{ color: "#FF2929" }}>Cancel trip</Text>
                                </View>


                                <View style={{ width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor: !isDarkTheme ? "#F1F1F1" : "#4F4F4F", }}>
                                    <Text onPress={() => { setConfirm(true); setEnd(false) }} style={{ color: "#2666cf" }}>Add stop</Text>
                                </View>


                                <View style={{ backgroundColor: "#2666cf", width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginVertical: 10, borderRadius: 8 }}>
                                    <Text onPress={() => { setConfirm(true); setEnd(false) }} style={{ color: "#fff" }}>End trip</Text>
                                </View>
                            </View>
                        </View>
                    )
                }


                {
                    confirm && (

                        <View style={[style.popupContainer, { width: "100%", height: "100%" }]}>
                            <View style={[isDarkTheme ? style.popuDark : style.popu, { width: "90%" }]}>

                                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center", flexDirection: "row", margin: 10 }}>
                                    <Image source={AlertImage} />
                                </View>

                                <Text style={{ marginVertical: 10, fontSize: 17, fontWeight: "500", color: isDarkTheme && "white" }}>Do you want to cancel the ride? </Text>
                                <Text style={{ color: "#a2a4ab" }}>Once cancelled can’t be reversed</Text>


                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20, marginLeft: 10 }}>
                                    <View style={{ backgroundColor: "#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", flex: 1 }}>
                                        <Text onPress={() => setConfirm(false)}>No </Text>
                                    </View>
                                    <View style={{ backgroundColor: "#FF2929", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", flex: 1 }}>
                                        <Text style={{ color: "white" }} onPress={() => { setConfirm(false); router.push("/rider/home/canceled") }}>Yes, cancel</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )
                }


            </ScrollView>

            <Toast/>


            {
                loading === false && (
                    <View style={{ position: "absolute", top: 230, left: 0, width: "93%", backgroundColor: "#2666CF", marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <View>
                            <Text style={{ color: "#ffff", marginTop: 10, paddingLeft: 20, fontSize: 17 }}>Request has been sent to the driver</Text>
                            <Text style={{ color: "#ffff", marginTop: 5, paddingLeft: 20 }}>Wait for the driver to respond</Text>
                            <Pressable style={{ backgroundColor: "#fff", width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 13, borderRadius: 8, marginLeft: 20, marginBottom: 10 }}>
                                <Text onPress={cancelRide} style={{ color: "#2666cf" }}>Cancel Ride</Text>
                            </Pressable>
                        </View>
                    </View>
                )
            }








        </View>
    );
};

export default Index;
