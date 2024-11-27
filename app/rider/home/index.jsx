import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, useColorScheme, View } from 'react-native';
import style from '../../../style/rider/home/home';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import UserImage from '../../../assets/images/user.png';
import CarImage from '../../../assets/images/car.png';
import LocationImage from '../../../assets/images/location.png';
import HomeImage from '../../../assets/images/home.png';
import OfficeImage from '../../../assets/images/office.png';
import OldImage from '../../../assets/images/old.png';
import DifferenceImage from '../../../assets/images/difference.png';
import RequestImage from '../../../assets/images/request.png';
import MapImage from '../../../assets/images/map.png';
import BottomNav from '../../../components/BottomNav';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const router = useRouter()
    const [mapRegion, setMapRegion] = useState({ latitude: 37.78825, longitude: -122.4325, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    const [drivers, setDrivers] = useState([]);
    const [showLocation, setShowLocation] = useState(false)

    const { isDarkTheme, toggleTheme } = useTheme();



    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({latitude: location.coords.latitude,longitude:location.coords.longitude,latitudeDelta: 0.0922,longitudeDelta: 0.0421});
        const generatedDrivers = Array.from({ length: 5 }).map((_, index) => ({
            id: index,
            latitude: location.coords.latitude + (Math.random() * 0.02 - 0.01),
            longitude: location.coords.longitude + (Math.random() * 0.02 - 0.01)
        }));

        setDrivers(generatedDrivers);
    };

    useEffect(() => {
        userLocation();
    }, []);

    const handlePlaceSelection = async(data, details) => {
        if (details) {
            const { lat, lng } = details.geometry.location;
            const reverseGeocode = await Location.reverseGeocodeAsync({latitude:mapRegion.latitude,longitude:mapRegion.longitude,});
            await AsyncStorage.setItem('dropoffLocation',JSON.stringify({pickupLocation: {type: "Point",coordinates: [lng,lat]},}))
            await AsyncStorage.setItem('pickupLocation',JSON.stringify({pickupLocation: {type: "Point",coordinates: [mapRegion.longitude,mapRegion.latitude]},}))
            await AsyncStorage.setItem('pickupLongitude', String(mapRegion.longitude));
            await AsyncStorage.setItem('pickupLatitude', String(mapRegion.latitude));

            await AsyncStorage.setItem('dropoffLongitude', String(lng));
            await AsyncStorage.setItem('dropoffLatitude', String(lat));
            await AsyncStorage.setItem('dropoffAddress',data.description)
            await AsyncStorage.setItem('pickupAddress',reverseGeocode[0].formattedAddress)



            router.push("/rider/home/location")
        }
        
    };

    

    return (
        <View style={style.container}>


            <View style={style.Scrollcontainer}>
                {/* <StatusBar hidden={true} /> */}

                {/* MAP */}
                <MapView style={style.map} region={mapRegion} showsUserLocation showsMyLocationButton={false} customMapStyle={isDarkTheme && darkMapStyle}>

                    <Marker coordinate={mapRegion}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={UserImage} />
                        </View>
                    </Marker>

                    {drivers.map(driver => (
                        <Marker key={driver.id} coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={CarImage} style={{ width: 40, height: 40 }} />
                            </View>
                        </Marker>
                    ))}
                </MapView>

                {/* TOPBAR  */}
                <View style={style.topBar}>

                    <Image source={UserImage} />

                    <View style={isDarkTheme ? style.btnContainerDark : style.btnContainer}>
                        <View style={style.btn1}>
                            <Text>Rider</Text>
                        </View>
                        <View>
                            <Text style={isDarkTheme ? style.btn2TxtDark : style.btn2Txt}>Driver</Text>
                        </View>
                    </View>

                    <Image source={LocationImage} style={{ marginRight: -25 }} />


                </View>

                {/* LOCATION  */}

                <View style={style.locationContainer}>
                    <View style={[isDarkTheme ? style.locationDark : style.location, { width: "90%" }]}>
                        <Text style={{ fontSize: 20, color: isDarkTheme && "#ffff" }}>Good Morning Flora</Text>
                    
                        <GooglePlacesAutocomplete
                            placeholder="Where To ?"
                            fetchDetails={true}
                            onPress={handlePlaceSelection}
                            query={{key: 'AIzaSyBQXmyICJtSYlLcdwURpxGyLMgIFbi4-hE',language: 'en',}}
                            styles={{textInputContainer: {borderRadius: 5,paddingHorizontal: 10,},textInput: {marginTop: 10,height: 40,color:isDarkTheme ? '#ffff':"#000",paddingHorizontal: 10, borderRadius: 10,backgroundColor:isDarkTheme ? "#333233" : "#FAFAFA"},predefinedPlacesDescription: {color: '#1faadb',},}}
                            debounce={300}
                        />
                        {/* <TextInput placeholderTextColor={isDarkTheme && "#C6C6C6"} placeholder='Where To ?' style={{ marginTop: 10, backgroundColor: isDarkTheme ? "#333233" : "#FAFAFA", height: 40, paddingHorizontal: 10, borderRadius: 10 }} /> */}
                        <View style={{ marginTop: 15 }}>
                            <View style={{ display: "flex", alignItems: "flex-start", flexDirection: "row" }}>
                                <Image source={HomeImage} />

                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: isDarkTheme && "#fff" }}>Home (20 min ago and 12Km Away)</Text>
                                    <Text style={{ color: "#71757b", marginTop: 5 }}>Studio 10 Joke Stream</Text>
                                </View>

                            </View>

                            <View style={{ display: "flex", alignItems: "flex-start", flexDirection: "row", marginTop: 10 }}>
                                <Image source={OfficeImage} />

                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: isDarkTheme && "#fff" }}>Office (20 min ago and 12Km Away)</Text>
                                    <Text style={{ color: "#71757b", marginTop: 5 }}>Studio 10 Joke Stream</Text>
                                </View>

                            </View>
                        </View>

                        <View style={{ backgroundColor: "#BDBDBE", width: "100%", height: 0.6, marginVertical: 15 }}></View>

                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <Image source={OldImage} />
                            <Text style={{ color: isDarkTheme ? "#fff" : "#71757b", marginLeft: 8 }}>Jekad Store</Text>
                        </View>

                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <Image source={OldImage} />
                            <Text style={{ color: isDarkTheme ? "#fff" : "#71757b", marginTop: 5, marginLeft: 8 }}>Cinema</Text>
                        </View>
                    </View>
                </View>

                {/* TIME  */}
                {/* <View style={style.timeContainer}>

                    <View style={[style.time, { width: "90%" }]}>
                        <Text style={{ color: "#9bc1ff" }}>Active Trip</Text>
                        <View style={{ backgroundColor: "#3E79DA", width: "100%", height: 0.6, marginVertical: 10 }}></View>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>30 Minutes</Text>
                        <Text style={{ color: "#9bc1ff", marginTop: 4 }}>Destination Time</Text>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                            <Image source={DifferenceImage} />
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#fff", marginLeft: 8, }}>Earthcare scapes church god</Text>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#fff", marginLeft: 8, marginTop: 4, }}>Home</Text>
                            </View>
                        </View>
                    </View>

                </View> */}

                {/* REQUEST  */}
                {/* <View style={style.requestContainer}>

                    <View style={[style.request, { width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }]}>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "500", }}>Request a ride for another user</Text>
                            <Text style={{ color: "#AAAAAB", marginTop: 4, }}>Book a ride for another user and pay</Text>
                            <Text style={{ color: "#2666C5", marginTop: 4, fontWeight: "800" }} onPress={() => setShowLocation(!showLocation)}>Start</Text>

                        </View>
                        <Image source={RequestImage} />

                    </View>

                </View> */}

                {/* BOTTOM NAV  */}


            </View>
            <BottomNav />

            {
                showLocation && (

                    <View style={[style.popupContainer, { width: "100%", height: "100%" }]}>
                        <View style={[isDarkTheme ? style.popuDark : style.popu, { width: "90%" }]}>
                            <Image source={MapImage} style={{ marginBottom: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: "700", color: isDarkTheme && "#fff" }}>Access your location</Text>
                            <Text style={{ color: "#979292" }}>Allow app to access your location </Text>
                            <View style={{ width: "100%", height: 40, justifyContent: "center", alignItems: "center", borderColor: "#F0F0F0", borderWidth: 1, marginTop: 10, borderRadius: 8 }}>
                                <Text onPress={() => router.push("/rider/home/location")} style={{ color: isDarkTheme ? "#fff" : "#2666cf" }}>Use current location</Text>
                            </View>
                            <View style={{ backgroundColor: "#2666cf", width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 8 }}>
                                <Text onPress={() => router.push("/rider/home/location")} style={{ color: "#fff" }}>Enter my new location</Text>
                            </View>
                        </View>
                    </View>
                )
            }





        </View>
    );
};

export default Index;
