import React from 'react'
import style from '../../../style/rider/home/profile';
import { Image, Pressable, StatusBar, Text, View } from 'react-native'
import BottomNav from '../../../components/BottomNav2'
import { useRouter } from 'expo-router'
import userImage from '../../../assets/images/user.png';
import pushImage from '../../../assets/images/push.png';
import carImage from '../../../assets/images/car5.png';
import automaticImage from '../../../assets/images/automatic.png';
import documentImage from '../../../assets/images/document3.png';
import nearImage from '../../../assets/images/near.png';
import editImage from '../../../assets/images/edit.png';
import themeImage from '../../../assets/images/theme.png';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/themeContext';
import onImage from '../../../assets/images/on.png';
import offImage from '../../../assets/images/off.png';
const account = () => {
    const router = useRouter()
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <View style={isDarkTheme ? style.containerDark2 : style.container}>

            <StatusBar hidden={false} />

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, backgroundColor: "#2666CF", zIndex: -1, position: "relative" }}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, marginBottom: 10 }}>Account</Text>
                <View style={{ justifyContent: "space-between", alignItems: "center", marginTop: 5, flexDirection: "row" }}>
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <Image source={userImage} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Frank Edwards</Text>
                            <View style={{ alignItems: "center", flexDirection: "row", marginTop: 2 }}>
                                <Text style={{ color: "white", fontSize: 12, marginRight: 3 }}>4.8</Text>
                                <Entypo name="star" size={12} color="#51D476" />
                                <Text style={{ color: "white", fontSize: 12, marginLeft: 3 }}>(1209)</Text>
                            </View>
                        </View>
                    </View>
                    <AntDesign name="right" size={15} color="white" />

                </View>
                <View style={{ top: 130, left: 10, right: 10, zIndex: 2, elevation: 2, backgroundColor: isDarkTheme ? "#0B1333" : "#f9f9f9", position: "absolute", borderRadius: 5 }}>

                    <View style={{ backgroundColor: isDarkTheme ? "#0B1333" : "#fff", padding: 10, borderRadius: 10, }}>


                        <Pressable onPress={() => router.push("/driver/home/setting")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginVertical: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={automaticImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Settings</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/preference")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={pushImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Driver preferences</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/saved")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={nearImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Saved places</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/vehicle")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={carImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Vehicle information</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/document")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={documentImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Documents</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/payment")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={editImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Payment</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/driver/home/report")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={editImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Support</Text>
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

                                    <Pressable onPress={() => toggleTheme(false)}>
                                        <Image source={onImage} />
                                    </Pressable>
                                    :

                                    <Pressable onPress={() => toggleTheme(true)}>
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
            </View>


            <BottomNav />

        </View>
    )
}

export default account
