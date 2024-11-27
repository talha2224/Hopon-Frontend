import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import clipboardImg from '../../../assets/images/clipboard.png'
import BottomNav2 from '../../../components/BottomNav2'
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const earning = () => {
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
    const { isDarkTheme } = useTheme();


    return (

        <View style={{ backgroundColor: isDarkTheme ? "#13182F" : "#fff", flex: 1 }}>

            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 27, paddingHorizontal: 20 }}>
                <View></View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: isDarkTheme && "white" }}>Wallet</Text>
                <Image source={clipboardImg} />
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: !isDarkTheme && "#F9F9F9", paddingVertical: 20, paddingHorizontal: 10, margin: 20 }}>

                <View style={{ height: 138, padding: 10, borderRadius: 5, backgroundColor: "#2463CC", marginBottom: 20 }}>
                    <Text style={{ color: "#abc9ff" }}>My balance</Text>
                    <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 2, color: "white", marginBottom: 10 }}>USD 30,000.00</Text>
                    <Pressable onPress={() => router.push("/driver/home/withdraw")} style={{ backgroundColor: "#fff", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 30 }}>
                        <Text>Withdraw</Text>
                    </Pressable>
                </View>


                <View style={{ backgroundColor: isDarkTheme ? "#070D25" : "white", padding: 5, borderRadius: 6 }}>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingBottom: 10 }}>
                        <AntDesign name="left" size={20} color={isDarkTheme?"white":"black"} />
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 17, fontWeight: "500", color: isDarkTheme && "white" }}>USD 170,000.00</Text>
                            <Text style={{ color: "#aeabab" }}>(Last 7 days)</Text>
                        </View>
                        <AntDesign name="right" size={20} color={isDarkTheme?"white":"black"} />

                    </View>

                    <Svg height={chartHeight + 40} >
                        {data.map((item, index) => {
                            const x = index * (barWidth + 5) + 20;
                            const filledHeight = (item.value / item.maxValue) * chartHeight;
                            const emptyHeight = chartHeight - filledHeight;
                            return (
                                <React.Fragment key={index}>
                                    <Rect onPress={() => router.push("/driver/home/performance")} x={x} y={0} width={barWidth} height={chartHeight} fill="#DAEBF3" rx={5} />
                                    <Rect onPress={() => router.push("/driver/home/performance")} x={x} y={emptyHeight} width={barWidth} height={filledHeight} fill="#00AAFF" rx={5} />
                                    <SvgText x={x + barWidth / 2} y={emptyHeight - 10} fontSize="12" fill="black" textAnchor="middle"></SvgText>
                                    <SvgText x={x + barWidth / 2} y={chartHeight + 20} fontSize="12" fill="black" textAnchor="middle">{item.label}</SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: isDarkTheme ? "#13182F" : "#F2F7FF" }}></View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F2F7FF", paddingHorizontal: 10, paddingBottom: 10 }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#aeabab" }}>Total trips</Text>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkTheme && "white" }}>193</Text>
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
                        <Text style={{color:isDarkTheme&&"white"}}>Your total Earnings</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500",color:isDarkTheme&&"white" }}>$170,000.00</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                        <Text style={{ color: "#aeabab" }}>Base fare</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$180,000.73</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                        <Text style={{ color: "#aeabab" }}>Bonus</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$210</Text>
                    </View>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginVertical: 2 }}>
                        <Text style={{ color: "#aeabab" }}>Tip</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#aeabab" }}>$210</Text>
                    </View>

                </View>



            </ScrollView>





            <BottomNav2 />



        </View>

    )
}

export default earning
