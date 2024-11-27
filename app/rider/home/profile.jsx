import React from 'react'
import style from '../../../style/rider/home/profile';
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import BottomNav from '../../../components/BottomNav'
import { useRouter } from 'expo-router'
import supportImage from '../../../assets/images/support.png';
import accountImage from '../../../assets/images/account.png';
import location2Image from '../../../assets/images/location2.png';
import automaticImage from '../../../assets/images/automatic.png';
import msgImage from '../../../assets/images/msg.png';
import nearImage from '../../../assets/images/near.png';
import translationImage from '../../../assets/images/translation.png';
import editImage from '../../../assets/images/edit.png';
import themeImage from '../../../assets/images/theme.png';
import onImage from '../../../assets/images/on.png';
import offImage from '../../../assets/images/off.png';
import { useTheme } from '../../../hooks/themeContext';
const profile = () => {
    const router = useRouter()
    const { isDarkTheme ,toggleTheme} = useTheme();

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <Text style={{ marginTop: 40, textAlign: "center", fontSize: 20, marginBottom: 40, color: isDarkTheme?"white":"black" }}>Account</Text>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>
                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={accountImage} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>Profile</Text>
                    </View>
                    <View style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={location2Image} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>Saved places</Text>
                    </View>
                    <View style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={supportImage} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>Support</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: isDarkTheme ? "#272727" : "#fff", marginTop: 10, borderRadius: 10, flex: 1 }}>


                    <View style={{ backgroundColor: isDarkTheme? "#333333":'#ffff', padding: isDarkTheme && 10, borderRadius: isDarkTheme? 10:0 }}>
                        <Pressable onPress={() => router.push("/rider/home/setting")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginVertical: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={automaticImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Settings</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/msg")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={msgImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Messages</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/notification2")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={nearImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Notifications</Text>

                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/saved")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={nearImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>My Location</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/msg")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={editImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Report a problem</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/lang")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={translationImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Languages</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/msg")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>

                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                    <Image source={themeImage} />
                                </View>
                                <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Dark mode</Text>
                            </View>
                            {
                                isDarkTheme ? 

                                <Pressable onPress={()=>toggleTheme(false)}>
                                    <Image source={onImage} />
                                </Pressable>
                                 : 

                                <Pressable onPress={()=>toggleTheme(true)}> 
                                    <Image source={offImage} />
                                </Pressable>
                            }
                        </Pressable>
                        <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, backgroundColor: "#FEE9E5", width: 143, height: 48, borderRadius: 10 }}>
                                <Text style={{ color: "#FD3030" }}>Logout</Text>
                            </View>
                        </Pressable>
                    </View>



                </View>

            </ScrollView>

            <BottomNav />

        </View>
    )
}

export default profile
