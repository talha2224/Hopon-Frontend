import React, { useEffect, useState } from 'react'
import {ScrollView, Text, View } from 'react-native'
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import BottomNav2 from '../../../components/BottomNav2'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devConfig from '../../../config';
import axios from 'axios';

const Performance = () => {


    const router = useRouter()
    const data = [
        { label: 'Sun', value: 1500, maxValue: 2000 },
        { label: 'Mon', value: 900, maxValue: 1500 },
        { label: 'Tue', value: 1200, maxValue: 1600 },
        { label: 'Wed', value: 1100, maxValue: 1800 },
        { label: 'Thu', value: 1760, maxValue: 2000 },
        { label: 'Fri', value: 600, maxValue: 1000 },
        { label: 'Sat', value: 900, maxValue: 1400 },
    ];
    const barWidth = 30;
    const chartHeight = 200

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

        <View style={{ backgroundColor: "#fff", flex: 1 }}>

            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 27, paddingHorizontal: 20 }}>
                <AntDesign onPress={()=>router.push("/driver/home/earning")} name="left" size={20} color="black" />
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Performance</Text>
                <View></View>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#F9F9F9", paddingVertical: 20, paddingHorizontal: 10, margin: 20 }}>



                <View style={{ backgroundColor: "white", padding: 5, borderRadius: 6 }}>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingBottom: 10 }}>
                        <AntDesign name="left" size={20} color="black" />
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>USD {sumTotal(walletData)}</Text>
                            <Text style={{ color: "#aeabab" }}>(All Time)</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />

                    </View>

                    <Svg height={chartHeight + 40} >
                        {walletData.map((item, index) => {
                            const x = index * (barWidth + 5) + 20;
                            const filledHeight = (item?.amount / 200) * chartHeight;
                            const emptyHeight = chartHeight - filledHeight;
                            return (
                                <React.Fragment key={index}>
                                    <Rect x={x} y={0} width={barWidth} height={chartHeight} fill="#DAEBF3" rx={5} />
                                    <Rect x={x} y={emptyHeight} width={barWidth} height={filledHeight} fill="#00AAFF" rx={5} />
                                    <SvgText x={x + barWidth / 2} y={emptyHeight - 10} fontSize="12" fill="black" textAnchor="middle"></SvgText>
                                    <SvgText x={x + barWidth / 2} y={chartHeight + 20} fontSize="12" fill="black" textAnchor="middle">{item?.amount?.toFixed(2)}</SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </View>

                <View style={{ backgroundColor: "white", padding: 5, borderRadius: 6, marginTop: 10, marginBottom: 60 }}>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingHorizontal: 10, paddingBottom: 10 }}>
                        <Text style={{color:"#626262"}}>My statistics</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2,paddingHorizontal:10 }}>
                        <Text style={{ color: "#aeabab" }}>Total Trips</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>{walletData?.length}</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2,paddingHorizontal:10 }}>
                        <Text style={{ color: "#aeabab" }}>Total earnings</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>${sumTotal(walletData)}</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2,paddingHorizontal:10 }}>
                        <Text style={{ color: "#aeabab" }}>Total tips</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$0</Text>
                    </View>

                </View>



            </ScrollView>





            <BottomNav2 />



        </View>

    )
}

export default Performance
