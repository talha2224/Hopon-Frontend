import React, { useState } from 'react'
import { Image, Switch, ScrollView, Text, View } from 'react-native'
import style from '../../../style/rider/home/notification2';
import BottomNav from '../../../components/BottomNav2';
import { AntDesign } from '@expo/vector-icons';
import onImage from '../../../assets/images/on.png';
import offImage from '../../../assets/images/off.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const Preference = () => {
    const [acceptCash, setAcceptCash] = useState(true);
    const [autoAcceptRide, setAutoAcceptRide] = useState(false);
    const [excludeLowRatedRider, setExcludeLowRatedRider] = useState(false);
    const [longDistanceTrip, setLongDistanceTrip] = useState(true);

    const router = useRouter();
    const { isDarkTheme } = useTheme();

    return (
        <View style={isDarkTheme ? style.containerDark2 : style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/driver/home/account")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                <Text style={{ color: isDarkTheme && "white" }}>Driver Preference</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark2 : style.Scrollcontainer}>

                <View style={{ backgroundColor: isDarkTheme ? "#070D25" : "#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "#fff" : "#323232", marginBottom: 2 }}>Accept Cash</Text>
                        <Switch
                            value={acceptCash}
                            onValueChange={() => setAcceptCash(!acceptCash)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "#fff" : "#323232", marginBottom: 2 }}>Auto Accept Ride</Text>
                        <Switch
                            value={autoAcceptRide}
                            onValueChange={() => setAutoAcceptRide(!autoAcceptRide)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "#fff" : "#323232", marginBottom: 2 }}>Exclude Low-Rated Rider</Text>
                        <Switch
                            value={excludeLowRatedRider}
                            onValueChange={() => setExcludeLowRatedRider(!excludeLowRatedRider)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "#fff" : "#323232", marginBottom: 2 }}>Long Distance Trip</Text>
                        <Switch
                            value={longDistanceTrip}
                            onValueChange={() => setLongDistanceTrip(!longDistanceTrip)}
                        />
                    </View>
                </View>

            </ScrollView>

            <BottomNav />

        </View>
    );
}

export default Preference;
