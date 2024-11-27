import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import style from '../../../style/rider/home/trip';
import BottomNav from '../../../components/BottomNav2';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import UserImage from '../../../assets/images/user.png';
import GroupImage from '../../../assets/images/group.png';
import CompletedImage from '../../../assets/images/completed.png';
import CancelledImage from '../../../assets/images/cancelled.png';
import { useTheme } from '../../../hooks/themeContext';
import config from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Trip = () => {
    const router = useRouter();
    const [data, setData] = useState({ completed: [], ongoing: [], cancelled: [] })
    const { isDarkTheme } = useTheme();
    const [currentState, setcurrentState] = useState("upcoming")


    useEffect(() => {
        const getRides = async () => {
            try {
                let driverId = await AsyncStorage.getItem('driverId');
                const active = await axios.get(`${config.baseUrl}/ride/info/driver/${driverId}`);
                const completed = await axios.get(`${config.baseUrl}/ride/get/completed/driver/${driverId}`);
                const cancelled = await axios.get(`${config.baseUrl}/ride/get/cancel/driver/${driverId}`);
                setData({ completed: completed.data.data, ongoing: [active?.data?.data], cancelled: cancelled.data.data });
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getRides()
    }, []);



    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: "numeric", month: "long", day: "numeric" }; // Example: November 26, 2024
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <ScrollView contentContainerStyle={style.Scrollcontainer}>

                {/* TOP BAR  */}

                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 30, paddingHorizontal: 15 }}>

                    <Pressable onPress={() => router.push("/rider/home")} style={isDarkTheme ? style.iconContainerDark : style.iconContainer}>
                        <AntDesign onPress={() => router.push("/rider/home")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                    </Pressable>

                    <Text style={{ color: isDarkTheme ? "#fff" : "#828080" }}>Trip</Text>

                    <AntDesign name="heart" size={24} color={isDarkTheme ? "white" : "black"} />

                </View>

                {/* MAIN CONTENT  */}

                <View style={{ marginTop: 20, marginHorizontal: 15, paddingBottom: 100, backgroundColor: !isDarkTheme && "#F9F9F9", padding: 10, flex: 1 }}>

                    {/* BTN  */}
                    <View style={[isDarkTheme ? style.btnContainerDark : style.btnContainer, { width: "100%" }]}>
                        <View style={currentState == "upcoming" ? style.btn1 : style.btn2}>
                            <Text style={[currentState == "upcoming" ? style.btn1Txt : style.btn2Txt, { color: isDarkTheme && currentState !== "upcoming" ? "white" : "black" }]} onPress={() => setcurrentState("upcoming")}>Upcoming</Text>
                        </View>
                        <View style={currentState == "completed" ? style.btn1 : style.btn2}>
                            <Text style={[currentState == "completed" ? style.btn1Txt : style.btn2Txt, { color: (isDarkTheme && currentState !== "completed") ? "white" : "black" }]} onPress={() => setcurrentState("completed")}>Completed</Text>
                        </View>
                        <View style={currentState == "cancelled" ? style.btn1 : style.btn2}>
                            <Text style={[currentState == "cancelled" ? style.btn1Txt : style.btn2Txt, { color: (isDarkTheme && currentState !== "cancelled") ? "white" : "black" }]} onPress={() => setcurrentState("cancelled")}>Cancelled</Text>
                        </View>
                    </View>

                    {
                        currentState == "upcoming" && (

                            (data?.ongoing && data?.ongoing?.length > 0) && data?.ongoing?.map((i) => (
                                <View key={i._id} style={{ paddingVertical: 10 }}>

                                    {i?.createdAt && <Text style={{ color: "#828080", marginVertical: 10 }}>{formatDate(i?.createdAt)}</Text>}

                                    <View style={{ backgroundColor: isDarkTheme ? "#292929" : "#fff", padding: 10, borderRadius: 15 }}>

                                        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={UserImage} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: isDarkTheme && "white" }}>{i?.driver?.first_name}</Text>
                                                    <Text style={{ marginTop: 2, color: "#7c8088" }}>Toyota Venza</Text>
                                                </View>
                                            </View>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Text style={{ color: isDarkTheme && "white" }}>$400</Text>
                                            </View>

                                        </View>


                                        <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={GroupImage} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Cinema</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Jekad Store</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>


                                    <Text style={{ color: "#828080", marginVertical: 10 }}>23rd September, 2024</Text>
                                    <View style={{ backgroundColor: isDarkTheme ? "#292929" : "#fff", padding: 10, borderRadius: 15 }}>

                                        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={UserImage} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: isDarkTheme && "white" }}>Daniel Graver</Text>
                                                    <Text style={{ marginTop: 2, color: "#7c8088" }}>Toyota Venza</Text>
                                                </View>
                                            </View>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Text style={{ color: isDarkTheme && "white" }}>$400</Text>
                                                <Text style={{ marginLeft: 8, color: isDarkTheme && "white" }}>45 mins</Text>
                                            </View>

                                        </View>


                                        <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={GroupImage} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Cinema</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && "white" }}>Jekad Store</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>310, Jane Ave, Maryland</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>


                                </View>

                            ))


                        )
                    }



                    {
                        currentState == "completed" && (

                            data.completed && data?.completed?.map((i) => (
                                <View key={i._id} style={{ paddingVertical: 20 }}>

                                    {i?.createdAt && <Text style={{ color: "#828080", marginVertical: 10 }}>{formatDate(i?.createdAt)}</Text>}

                                    <View style={{ backgroundColor: isDarkTheme ? "#292929" : "#fff", padding: 10, borderRadius: 15 }}>
                                        <Image source={CompletedImage} style={{ overflow: "hidden", width: "100%" }} />


                                        <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={GroupImage} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && 'white' }}>Pickup</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{i?.pickUpAddress?.split(" ")[0] + " " + i?.pickUpAddress?.split(" ")[1] + " " + i?.pickUpAddress?.split(" ")[2] + " " + i?.pickUpAddress?.split(" ")[3] + " " + i?.pickUpAddress?.split(" ")[4]}</Text>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && 'white' }}>Drop Off</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{i?.dropoffAddress?.split(" ")[0] + " " + i?.pickUpAddress?.split(" ")[1] + " " + i?.pickUpAddress?.split(" ")[2] + " " + i?.pickUpAddress?.split(" ")[3] + " " + i?.pickUpAddress?.split(" ")[4]}</Text>
                                                    {/* <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2666CF", borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 }}>
                                                            <Text style={{ color: "#ffff" }}>Rebook</Text>
                                                        </Pressable> */}
                                                </View>
                                            </View>

                                        </View>
                                    </View>

                                </View>

                            ))


                        )
                    }



                    {
                        currentState == "cancelled" && (

                            data.cancelled && data?.cancelled?.map((i) => (
                                <View key={i._id} style={{ paddingVertical: 20 }}>

                                    {i?.createdAt && <Text style={{ color: "#828080", marginVertical: 10 }}>{formatDate(i?.createdAt)}</Text>}

                                    <View style={{ backgroundColor: isDarkTheme ? "#292929" : "#fff", padding: 10, borderRadius: 15 }}>
                                        <Image source={CancelledImage} style={{ overflow: "hidden", width: "100%" }} />


                                        <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>

                                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                <Image source={GroupImage} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && 'white' }}>Pickup</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{i?.pickUpAddress?.split(" ")[0] + " " + i?.pickUpAddress?.split(" ")[1] + " " + i?.pickUpAddress?.split(" ")[2] + " " + i?.pickUpAddress?.split(" ")[3] + " " + i?.pickUpAddress?.split(" ")[4]}</Text>
                                                    <Text style={{ marginTop: 10, color: isDarkTheme && 'white' }}>Drop Off</Text>
                                                    <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{i?.dropoffAddress?.split(" ")[0] + " " + i?.pickUpAddress?.split(" ")[1] + " " + i?.pickUpAddress?.split(" ")[2] + " " + i?.pickUpAddress?.split(" ")[3] + " " + i?.pickUpAddress?.split(" ")[4]}</Text>
                                                    {/* <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2666CF", borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 }}>
                                                            <Text style={{ color: "#ffff" }}>Rebook</Text>
                                                        </Pressable> */}
                                                </View>
                                            </View>

                                        </View>
                                    </View>

                                </View>

                            ))

                        )
                    }


                </View>



            </ScrollView>




            <BottomNav />
        </View>
    )
}

export default Trip
