import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StatusBar, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import cashImage from '../../../assets/images/cash.png';
import debitImage from '../../../assets/images/debit.png';
import carImage from '../../../assets/images/car3.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import devConfig from '../../../config';

const Wallet = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();
    const [walletData, setWalletData] = useState([])
    const sumTotal = (data) => { return data?.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2); };

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    }

    useEffect(() => {
        const getWalletHistory = async () => {
            try {
                let riderId = await AsyncStorage.getItem('riderId');
                const res = await axios.get(`${devConfig.baseUrl}/wallet/history/rider/${riderId}`)
                setWalletData(res.data?.data);
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getWalletHistory()
    }, []);


    [{ "__v": 0, "_id": "6749fc789bfd0eec5cc24294", "amount": 45.32437033424997, "createdAt": "2024-11-29T17:40:08.073Z", "deposit": false, "driverId": null, "message": "Ride Payment Sent", "riderId": "673b56c41ff1631a0c9bc0e1", "updatedAt": "2024-11-29T17:40:08.073Z" }]


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <StatusBar hidden={true} />


            {

                walletData?.length > 0 ?

                    <View>

                        <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "#000", marginBottom: 20 }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, marginBottom: 10 }}>Wallet</Text>
                            <Text style={{ color: "#7b7c7e", fontSize: 16, marginBottom: 4 }}>Total Rides {walletData?.length}</Text>
                            <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20, marginBottom: 10 }}>USD {sumTotal(walletData)}</Text>
                            <Pressable style={{ backgroundColor: "#fff", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 30 }}>
                                <Text>Fund wallet</Text>
                            </Pressable>
                        </View>

                        <ScrollView style={{ paddingHorizontal: 20, backgroundColor: isDarkTheme && "#292929"}}>


                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: isDarkTheme && "white", paddingTop: 10 }}>Payment methods</Text>
                                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                                    <View style={{ flex: 1, marginRight: 10, backgroundColor: "#E8F0FF", height: 135, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                        <Image source={cashImage} />
                                        <Text style={{ marginTop: 15 }}>Cash</Text>
                                    </View>
                                </View>
                            </View>

                            {/* <Pressable onPress={() => router.push("/rider/home/payment")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                                <Text style={{ color: "#fff" }}>Add payment method</Text>
                            </Pressable> */}

                            <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginVertical: 20 }}>
                                <Text style={{ color: isDarkTheme && "white" }}>All transactions</Text>
                                <Text style={{ color: "#2666CF" }}>View all</Text>
                            </View>

                            <View style={{ marginBottom: 50}}>
                                {
                                    walletData?.map((i) => (
                                        <View key={i?._id} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme ? "#2f2f2f" : "#F6F6F6", padding: 10, borderRadius: 13 }}>
                                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                                <View style={{ backgroundColor: "#E2E7EC", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5, width: 32, height: 32, marginRight: 5 }}>
                                                    <Image source={carImage} />
                                                </View>
                                                <View style={{ marginLeft: 3 }}>
                                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000", marginBottom: 2 }}>{i?.message}</Text>
                                                    <Text style={{ color: "#aba8a8" }}>{formatDate(i?.createdAt)}</Text>
                                                </View>
                                            </View>

                                            <View style={{ marginLeft: 3 }}>
                                                <Text style={{ color: isDarkTheme ? "#fff" : "#000", marginBottom: 2, fontSize: 16, fontWeight: 700 }}>${i?.amount?.toFixed(2)}</Text>
                                                <Text style={{ color: "#03AD33" }}>Completed</Text>
                                            </View>

                                        </View>
                                    ))
                                }
                            </View>

                        </ScrollView>

                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>No Data Found</Text>
                    </View>
            }





            {/* <View style={{ borderTopColor: "#313131", borderTopWidth: 1 }}> */}
                <BottomNav />
            {/* </View> */}

        </View>
    )
}

export default Wallet