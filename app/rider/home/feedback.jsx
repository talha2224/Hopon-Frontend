import React, { useEffect, useState } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import GroupImage from '../../../assets/images/group.png';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../../config'

const Feedback = () => {
    const { isDarkTheme } = useTheme();
    const router = useRouter()
    const starData = [1, 2, 3, 4, 5]
    const [data, setData] = useState([])


    useEffect(() => {
        const getRideInfo = async () => {
            try {
                let rideId = await AsyncStorage.getItem('riderId')
                const res = await axios.get(`${config.baseUrl}/ride/id/${rideId}`);
                setData(res.data?.data);
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getRideInfo()
    }, []);


    console.log(data,'ridwweee')


    return (
        <View style={{ backgroundColor:isDarkTheme?"black":"#fcfdff", flex: 1, alignItems: "center" }}>

            <StatusBar hidden={true} />

            <View style={{ backgroundColor:isDarkTheme?"#2E2D2D": "black", width: "100%", paddingBottom: 10, }}>
                <Text style={{ textAlign: "center", color: "white", marginBottom: 10, fontWeight: "800", fontSize: 16, marginTop: 30 }}>Thanks for riding, {data?.rider?.first_name}</Text>
                <Text style={{ color: "#aeaeae", textAlign: "center" }}>We hope you enjoyed your trip</Text>
            </View>


            <View style={{ marginTop: 10, backgroundColor:isDarkTheme?"#292929":"#FAFAFA", padding: 10, width: "95%", margin: 10,borderRadius:isDarkTheme&&10 }}>

                <View style={{ alignItems: "center", flexDirection: "row", marginHorizontal: 20 }}>
                    <Image source={GroupImage} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ marginTop: 10,color:isDarkTheme&&'white' }}>Pickup</Text>
                        <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{data?.pickUpAddress?.split(" ")[0] + " " + data?.pickUpAddress?.split(" ")[1] + " " + data?.pickUpAddress?.split(" ")[2] + " " + data?.pickUpAddress?.split(" ")[3] + " " + data?.pickUpAddress?.split(" ")[4]}</Text>
                        <Text style={{ marginTop: 10,color:isDarkTheme&&'white' }}>Drop Off</Text>
                        <Text style={{ color: "#A0A1A3", marginTop: 5 }}>{data?.dropoffAddress?.split(" ")[0] + " " + data?.pickUpAddress?.split(" ")[1] + " " + data?.pickUpAddress?.split(" ")[2] + " " + data?.pickUpAddress?.split(" ")[3] + " " + data?.pickUpAddress?.split(" ")[4]}</Text>
                    </View>
                </View>

                <Text style={{ color: isDarkTheme?"white":"#2666cf", marginHorizontal: 20, marginTop: 10 }}>14th September, 2024</Text>



            </View>


            <Text style={{ textAlign: "center", color: "#727272", marginVertical: 10 }}>How would you rate the driver?</Text>
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:"center" }}>
                {
                    starData.map((i) => (
                        <AntDesign key={i} name="star" size={15} color={i < 4 ? "#51D476" : "#E4E4E4"} style={{ marginTop: 5, marginRight: 3 }} />
                    ))
                }
            </View>

            <Text style={{ textAlign: "center", color:isDarkTheme?"white":"#727272", marginVertical: 10 }}>Add a tip for {data?.driver?.first_name}</Text>


            

            <View style={{ marginTop: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 10, width: "95%", margin: 10 }}>
                <View style={{ backgroundColor:isDarkTheme?"#292929":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>$5</Text>
                </View>
                <View style={{ backgroundColor:isDarkTheme?"#292929":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>$10</Text>
                </View>
                <View style={{ backgroundColor:isDarkTheme?"#292929":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>$15</Text>
                </View>
                <View style={{ backgroundColor:isDarkTheme?"#292929":"#F1F1F1", padding: 10, marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", width: 70 }}>
                    <Text style={{color:isDarkTheme&&"white"}}>$20</Text>
                </View>
            </View>

            <View style={{ backgroundColor: "#2666cf", width: "95%", height: 40, justifyContent: "center", alignItems: "center", marginVertical: 13, borderRadius: 8 }}>
                <Text onPress={() => router.push("/rider/home")} style={{ color: "#fff" }}>Done</Text>
            </View>

        </View>
    )
}

export default Feedback