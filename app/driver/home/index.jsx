import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, Pressable, ToastAndroid, Alert } from 'react-native';
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
import { AntDesign } from '@expo/vector-icons';
import BottomNav2 from '../../../components/BottomNav2';
import { useTheme } from '../../../hooks/themeContext';
import axios from 'axios';
import config from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import devConfig from '../../../config';
import { io } from 'socket.io-client';
import { useStripe } from '@stripe/stripe-react-native';

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
    const [loader, setloader] = useState(true)
    const router = useRouter()
    const [mapRegion, setMapRegion] = useState({ latitude: 0, longitude: 0, ride: false });
    const [drivers, setDrivers] = useState([]);
    const [activeStatus, setactiveStatus] = useState('off')
    const [accept, setAccept] = useState(null);
    const { isDarkTheme } = useTheme();
    const [bookingData, setBookingData] = useState(null)
    const [rides, setRides] = useState(null)
    const [showPayment, setShowPayment] = useState(false)
    const [amountDue, setAmountDue] = useState(0)
    const {initPaymentSheet,presentPaymentSheet} = useStripe()
    const [userName, setuserName] = useState("")

    



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

        const generatedDrivers = Array.from({ length: 5 }).map((_, Index) => ({
            id: Index,
            latitude: location?.coords?.latitude || 100.78825 + (Math.random() * 0.02 - 0.01),
            longitude: location?.coords?.longitude + (Math.random() * 0.02 - 0.01)
        }));

        setDrivers(generatedDrivers);
    };


    const updateLocation = async () => {
        const driverId = await AsyncStorage.getItem('driverId');
        setactiveStatus(activeStatus == "on" ? "off" : "on")
        const res = await axios.post(`${config.baseUrl}/driver/update/location`, {online:activeStatus == "on" ? "off" : "on",driverId, longitude: mapRegion.longitude, latitude: mapRegion.latitude });
    }

    const accpetBooking = async () => {
        try {
            const res = await axios.put(`${config.baseUrl}/ride/update/${rides._id}`);
            setBookingData(res.data.data)
            setactiveStatus("off");
            setBookingData(null);
            router.push("/driver/home/accepted")
        }
        catch (error) {
        }
    }

    const cancelRide = async () => {

        try {
            let driverId = await AsyncStorage.getItem('driverId');
            const res = await axios.get(`${devConfig.baseUrl}/ride/cancel/driver/${driverId}`);
            setactiveStatus("off");
            setBookingData(null);
            await userLocation()

        }
        catch (error) {
            console.log(error)
        }
    }

    const getPendingPayment = async ()=>{
        try {
            let driverId = await AsyncStorage.getItem('driverId');
            const res = await axios.get(`${config.baseUrl}/driver/info/${driverId}`);
            res?.data?.data?.pendingAmount > 0 ? setShowPayment(true) : setShowPayment(false)
            setuserName(res?.data?.data?.first_name + " " + res?.data?.data?.last_name)
            setAmountDue(parseFloat(res?.data?.data?.pendingAmount.toFixed(2)));
        } 
        catch (error) {
            console.log(error,'error in getting payment')
        }
    }

    const handleStripPayment =async()=>{
        try {
            let driverId = await AsyncStorage.getItem('driverId');
            let res = await axios.post(`${config.baseUrl}/payment/create`,{ amount:Math.floor(amountDue*100),id:driverId } )
            let secret = res?.data?.clientSecret
            const initResponse= await initPaymentSheet({merchantDisplayName:userName,paymentIntentClientSecret:secret})
            if(initResponse.error){
                Alert.alert(initResponse?.error?.message)
                return
            }
            else{
                const paymentResponse = await presentPaymentSheet()
                if(paymentResponse.error){
                    Alert.alert(paymentResponse?.error?.message)
                    return
                }
                else{ 
                    let updateBalance = await axios.put(`${config.baseUrl}/driver/update/balance/${driverId}`)
                    await getPendingPayment()
                }
            }
        } 
        catch (error) {
            console.log(error,'error in handling stripe payment')
        }
    }

    const fetchActiveRide = async () => {
        try {
            let driverId = await AsyncStorage.getItem('driverId');
            const ride = await axios.get(`${config.baseUrl}/ride/info/driver/${driverId}`);
            if(ride?.data?.data?._id){
                setactiveStatus("off");
                setBookingData(null);
                router.push("/driver/home/accepted")
            }
        }
        catch (error) {
            console.log(error, 'error in fetchActiveRide')
        }
    }


    useEffect(() => {
        const socket = io(`${config.socketUrl}`);

        const isMounted = { current: true };
        const initialize = async () => {
            if (isMounted.current) { await fetchActiveRide();await userLocation();await getPendingPayment(); }
        };
    
        initialize();

        const joinDriverRoom = async () => {
            const driverId = await AsyncStorage.getItem('driverId');
            if (driverId) {
                socket.emit('joinRoom', driverId);
            }
        };

        joinDriverRoom();

        socket.on('connect', () => { console.log('Socket connected:', socket.id); });
        socket.on('newRide', (ride) => {setRides(ride); setAccept(false); });
        socket.on('cancelRide', (ride) => {setRides(null);setAccept(null);setactiveStatus("off");});
        socket.on('disconnect', () => {console.log('Socket disconnected');});
        return () => {
            socket.off('connect');
            socket.off('newRide');
            socket.off('cancelRide');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, []);


    // LOADER 
    useEffect(() => {
        setTimeout(() => {
            setloader(false)
        }, 5000);
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
                            activeStatus == "off" ?

                                <MapView style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false} customMapStyle={isDarkTheme && darkMapStyle}>
                                    {drivers?.map(driver => (
                                        <Marker key={driver.id} coordinate={{ latitude: driver?.latitude, longitude: driver?.longitude }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                            </View>
                                        </Marker>
                                    ))}
                                </MapView> :

                                <MapView style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false} customMapStyle={isDarkTheme && darkMapStyle}>

                                    <Marker coordinate={{ latitude: drivers[0]?.latitude, longitude: drivers[0]?.longitude }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={CarImage} style={{ width: 40, height: 40 }} />
                                        </View>
                                    </Marker>

                                    <Polyline coordinates={[{ latitude: mapRegion?.latitude, longitude: mapRegion.longitude }, { latitude: drivers[0]?.latitude, longitude: drivers[0]?.longitude }]} strokeColor={isDarkTheme ? "white" : "black"} strokeWidth={1} />
                                </MapView>
                        }


                        {
                            showPayment && (
                                <View style={{ position: "absolute", top: 250, left: 0, height: 100, width: "93%", backgroundColor: "#2666CF", marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Important Note ⚠️</Text>
                                        <Text style={{ color: "#B5D1FF", marginTop: 2 }}>Please pay ${amountDue} otherwise </Text>
                                        <Text style={{ color: "#B5D1FF" }}>you will not recieve new rides</Text>
                                    </View>
                                    <Pressable onPress={handleStripPayment} style={{backgroundColor:"white",paddingHorizontal:10,paddingVertical:5,marginRight:10,borderRadius:5}}>
                                        <Text>Pay Now</Text>
                                    </Pressable>
                                </View>
                            )
                        }

                        {/* OBOARD  */}
                        {
                            activeStatus == "off" && (
                                <View style={{ position: "absolute", top: 130, left: 0, height: 100, width: "93%", backgroundColor: "#2666CF", marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Welcome Onboard</Text>
                                        <Text style={{ color: "#B5D1FF", marginTop: 2 }}>Demand in your area is high, turn on</Text>
                                        <Text style={{ color: "#B5D1FF" }}> the active toggle to start earning </Text>
                                    </View>
                                    <View>
                                        <Image source={OnboardImage} />
                                    </View>
                                </View>
                            )
                        }


                        {/* CARD  */}
                        {
                            (activeStatus == "on" && accept !== null) && (
                                <View style={{ width: "100%", position: "absolute", bottom: 150, left: 0, zIndex: 999, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <View style={[{ width: "90%", backgroundColor: isDarkTheme ? "#13182F" : "#fff", padding: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }]}>

                                        <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: !isDarkTheme && "#FAFAFA", padding: 10, width: "95%", marginVertical: 10 }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={UserImage} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: isDarkTheme && "white" }}>{rides?.rider?.first_name ? rides?.rider?.first_name : "-"}</Text>
                                                    <View style={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
                                                        <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                        <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                        <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#51D476" />
                                                        <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#E4E4E4" />
                                                        <AntDesign name="star" size={14} style={{ marginRight: 2 }} color="#E4E4E4" />
                                                    </View>
                                                </View>
                                            </View>

                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2, width: "100%" }}>
                                            <Text style={{ color: "#88898a" }}>Rider Name</Text>
                                            <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{bookingData?.rider?.first_name ? bookingData?.rider?.first_name :"-" }</Text>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5, width: "100%" }}>
                                            <Text style={{ color: "#88898a" }}>Fare estimate</Text>
                                            <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>${rides?.fare?rides?.fare:"-"}</Text>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2, width: "100%" }}>
                                            <Text style={{ color: "#88898a" }}>Pickup</Text>
                                            <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{rides?.pickUpAddress?.split(" ")[0] + " " + rides?.pickUpAddress?.split(" ")[1] + " " + rides?.pickUpAddress?.split(" ")[2] + " " + rides?.pickUpAddress?.split(" ")[3] + " " + rides?.pickUpAddress?.split(" ")[4]}</Text>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5, width: "100%" }}>
                                            <Text style={{ color: "#88898a" }}>DropOff</Text>
                                            <Text style={{ fontWeight: "600", color: isDarkTheme && "white" }}>{rides?.dropoffAddress?.split(" ")[0] + " " + rides?.dropoffAddress?.split(" ")[1] + " " + rides?.dropoffAddress?.split(" ")[2] + " " + rides?.dropoffAddress?.split(" ")[3]}</Text>
                                        </View>

                                        <View style={[{ width: "100%" }]}>
                                            <Pressable onPress={accpetBooking} style={[{ width: "100%", backgroundColor: "#2666CF", height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 5 }]}>
                                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 15 }}>Click to accept </Text>
                                            </Pressable>

                                            <Pressable onPress={cancelRide} style={[{ width: "100%", backgroundColor: "#2666CF", height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 5 }]}>
                                                <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 15 }}>Click to Cancel </Text>
                                            </Pressable>

                                        </View>



                                    </View>
                                </View>
                            )
                        }


                        {/* TOOGLE  */}
                        <View style={{ width: "100%", position: "absolute", bottom: 70, left: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Pressable disabled={showPayment} onPress={updateLocation}>
                                <Image source={activeStatus == "on" ? OnlineImage : OfflineImage} />
                            </Pressable>
                        </View>


                    </ScrollView> :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>Loading....</Text>
                    </View>
            }



            <BottomNav2 />




        </View>
    );
};

export default Index;
