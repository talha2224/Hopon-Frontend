import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import style from '../../../style/rider/home/notification';
import BottomNav from '../../../components/BottomNav2';
import { useRouter } from 'expo-router';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/themeContext';
import config from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Notification = () => {
    const { isDarkTheme } = useTheme();
    const router = useRouter()
    const [data, setData] = useState([])

    useEffect(() => {
        const getNotifications = async () => {
            try {
                let driverId = await AsyncStorage.getItem('driverId');
                const res = await axios.get(`${config.baseUrl}/notifications/driver/${driverId}`);
                setData(res.data?.data);
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getNotifications()
    }, []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: "numeric", month: "long", day: "numeric" }; // Example: November 26, 2024
        return date.toLocaleDateString("en-US", options);
    };

    const truncateText = (message) => {
        if (message.length > 15) {
            return message.substring(0, 30) + "...";
        }
        return message;
    }

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <ScrollView contentContainerStyle={style.Scrollcontainer}>

                {/* TOP BAR  */}

                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 30, paddingHorizontal: 15 }}>

                    <Pressable onPress={() => router.push("/driver/home")} style={isDarkTheme ? style.iconContainerDark : style.iconContainer}>
                        <AntDesign onPress={() => router.push("/driver/home")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                    </Pressable>

                    <Text style={{ color: isDarkTheme ? "white" : "#828080" }}>Notification</Text>

                    <EvilIcons name="search" size={24} color="black" />

                </View>

                {/* MAIN CONTENT  */}

                {
                    data?.length > 0 ?
                        <ScrollView contentContainerStyle={{ marginTop: 20, marginHorizontal: 15, backgroundColor: !isDarkTheme && "#F9F9F9", padding: 10, paddingBottom: 80 }}>

                            {
                                data?.map((i) => (

                                    <View key={i?._id}>
                                        <Text style={{ color: "#828080", marginVertical: 10 }}>{formatDate(i?.createdAt)}</Text>
                                        <View style={{ backgroundColor: isDarkTheme ? "#292929" : "#ffff", borderRadius: 15, padding: 10, marginTop: 10, display: "flex", alignItems: "center", flexDirection: "row" }}>
                                            {
                                                i?.cancelled ?
                                                    <View style={{ backgroundColor: "#FD4747", display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 100, marginRight: 10 }}>
                                                        <Entypo name="cross" size={24} color="white" />
                                                    </View> :
                                                    <View style={{ backgroundColor: "#EFF3FA", display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 100, marginRight: 10 }}>
                                                        <FontAwesome name="picture-o" size={18} color="#292D32" />
                                                    </View>
                                            }
                                            <View>
                                                <Text style={{ color: isDarkTheme && "white" }}>{i?.title}</Text>
                                                <Text style={{ color: "#828080", marginTop: 3, flexWrap: "wrap", }} numberOfLines={2} ellipsizeMode="tail">{truncateText(i?.description)}</Text>
                                            </View>
                                        </View>

                                    </View>
                                ))
                            }



                        </ScrollView> :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>No Data Found</Text>
                        </View>
                }




            </ScrollView>




            <BottomNav />
        </View>
    )
}

export default Notification
