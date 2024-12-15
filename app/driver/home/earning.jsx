import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import clipboardImg from '../../../assets/images/clipboard.png'
import BottomNav2 from '../../../components/BottomNav2'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devConfig from '../../../config';
import axios from 'axios';

const Earning = () => {
    const router = useRouter()
    const barWidth = 30;
    const chartHeight = 200
    const { isDarkTheme } = useTheme();
    const [walletData, setWalletData] = useState([])
    useEffect(() => {
        const getWalletHistory = async () => {
            try {
                let driverId = await AsyncStorage.getItem('driverId');
                const res = await axios.get(`${devConfig.baseUrl}/wallet/history/driver/${driverId}`)
                setWalletData(res.data?.data);
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getWalletHistory()
    }, []);


    const sumTotal = (data) => { return data?.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2);};

    return (

        <View style={{ backgroundColor: isDarkTheme ? "#13182F" : "#fff", flex: 1 }}>

            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 37, paddingHorizontal: 20 }}>
                <View></View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: isDarkTheme && "white" }}>Wallet</Text>
                <Image source={clipboardImg} />
            </View>


            {
                walletData?.length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: !isDarkTheme && "#F9F9F9", paddingVertical: 20, paddingHorizontal: 10, margin: 20 }}>

                        <View style={{ height: 138, padding: 10, borderRadius: 5, backgroundColor: "#2463CC", marginBottom: 20 }}>
                            <Text style={{ color: "#abc9ff" }}>Total Earn</Text>
                            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 2, color: "white", marginBottom: 10 }}>USD {sumTotal(walletData)}</Text>
                            {/* <Pressable onPress={() => router.push("/driver/home/withdraw")} style={{ backgroundColor: "#fff", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 30 }}>
                                    <Text>Withdraw</Text>
                                </Pressable> 
                            */}
                        </View>


                        <View style={{ backgroundColor: isDarkTheme ? "#070D25" : "white", padding: 5, borderRadius: 6 }}>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingBottom: 10 }}>
                                <AntDesign name="left" size={20} color={isDarkTheme ? "white" : "black"} />
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 17, fontWeight: "500", color: isDarkTheme && "white" }}>USD {sumTotal(walletData)}</Text>
                                    <Text style={{ color: "#aeabab" }}>(All Time)</Text>
                                </View>
                                <AntDesign name="right" size={20} color={isDarkTheme ? "white" : "black"} />

                            </View>

                            <Svg height={chartHeight + 40} >
                                {walletData?.map((item, index) => {
                                    const x = index * (barWidth + 5) + 20;
                                    const filledHeight = (item?.amount / 100) * chartHeight;
                                    const emptyHeight = chartHeight - filledHeight;
                                    return (
                                        <React.Fragment key={index}>
                                            <Rect onPress={() => router.push("/driver/home/performance")} x={x} y={0} width={barWidth} height={chartHeight} fill="#DAEBF3" rx={5} />
                                            <Rect onPress={() => router.push("/driver/home/performance")} x={x} y={emptyHeight} width={barWidth} height={filledHeight} fill="#00AAFF" rx={5} />
                                            <SvgText x={x + barWidth / 2} y={emptyHeight - 10} fontSize="12" fill="black" textAnchor="middle"></SvgText>
                                            <SvgText x={x + barWidth / 2} y={chartHeight + 20} fontSize="12" fill={isDarkTheme ? "white":"black"} textAnchor="middle">{item?.amount?.toFixed(2)}</SvgText>
                                        </React.Fragment>
                                    );
                                })}
                            </Svg>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: isDarkTheme ? "#13182F" : "#F2F7FF" }}></View>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingHorizontal: 10, paddingBottom: 10 }}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#aeabab" }}>Total trips</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkTheme && "white" }}>{walletData?.length ? walletData?.length :0}</Text>
                                </View>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#aeabab" }}>Time online</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkTheme && "white" }}>6 Days 18h</Text>
                                </View>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#aeabab" }}>Total distance</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkTheme && "white" }}>120 Km</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: isDarkTheme ? "#070D25" : "white", padding: 5, borderRadius: 6, marginTop: 10, marginBottom: 60 }}>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingHorizontal: 10, paddingBottom: 10 }}>
                                <Text style={{ color: isDarkTheme && "white" }}>Your total Earnings</Text>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkTheme && "white" }}>${sumTotal(walletData)}</Text>
                            </View>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                                <Text style={{ color: "#aeabab" }}>Base fare</Text>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>${sumTotal(walletData)}</Text>
                            </View>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                                <Text style={{ color: "#aeabab" }}>Bonus</Text>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$0</Text>
                            </View>

                            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                                <Text style={{ color: "#aeabab" }}>Tip</Text>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$0</Text>
                            </View>

                        </View>



                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>No Data Found</Text>
                    </View>
            }






            <BottomNav2 />



        </View>

    )
}

export default Earning
