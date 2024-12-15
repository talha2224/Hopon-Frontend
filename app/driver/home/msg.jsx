import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/msg';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import userImage from '../../../assets/images/user.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devConfig from '../../../config';
import axios from 'axios';
import BottomNav2 from '../../../components/BottomNav2';

const Msg = () => {
    const [data, setData] = useState([])
    const router = useRouter()
    const { isDarkTheme } = useTheme();


    const fetchChats = async () => {
        try {
            let riderId = await AsyncStorage.getItem('driverId');
            const res = await axios.get(`${devConfig.baseUrl}/chat/driver/all/${riderId}`)
            setData(res?.data?.data)

        }
        catch (error) {
            console.log(error, 'error in fetching chats')
        }
    }

    const getDayOfWeek = (isoDateString) => {
        const date = new Date(isoDateString);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getUTCDay()];
    }

    const truncateMessage = (message) => {
        if (message.length > 15) {
            return message.substring(0, 30) + "...";
        }
        return message;
    }

    const showMessages = async(chatId,driverName)=>{
        await AsyncStorage.setItem("chatId",chatId)
        await AsyncStorage.setItem("driverName",driverName)
        router.push("/driver/home/messages")
        // console.log(chat,'chat')
    }

    useEffect(() => {
        fetchChats()
    }, [])


    console.log(data,'data')


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/account")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                <Text style={{ color: isDarkTheme && "white" }}>Messages</Text>
                <View></View>
            </View>

            {
                data?.length > 0 ?
                    <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>

                        <View style={{ backgroundColor: isDarkTheme ? "#333333" : "#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                            {
                                data?.map((i) => (
                                    <Pressable onPress={()=>{showMessages(i?._id,i?.riderId?.first_name)}} key={i?._id} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                        <Pressable style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                            <Image source={userImage} />
                                            <Pressable onPress={() => showMessages(i?._id,i?.riderId?.first_name)} style={{ marginLeft: 8 }}>
                                                <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{i?.riderId?.first_name}</Text>
                                                <Text style={{ color: isDarkTheme ? "white" : "#000000" }}>{i?.latestMessage ? truncateMessage(i?.latestMessage?.message) : "No chat"}</Text>
                                            </Pressable>
                                        </Pressable>
                                        <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "#8D8C8C", marginBottom: 4 }}>{getDayOfWeek(i?.createdAt ? i?.createdAt : i?.riderId?.createdAt)}</Text>
                                        </Pressable>
                                    </Pressable>
                                ))
                            }

                        </View>

                    </ScrollView> :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>No Chat Found</Text>
                    </View>
            }


            <BottomNav2 />

        </View>
    )
}

export default Msg
