import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const translations = {
    French: { 
        Profile: "Profil", 
        SavedPlaces: "Lieux enregistrés", 
        Support: "Support", 
        Messages: "Messages",
        Notifications: "Notifications",
        MyLocation: "Ma localisation",
        ReportProblem: "Signaler un problème",
        Language: "Langue",
        Languages: "Langues",
        DarkMode: "Mode sombre",
        Logout: "Déconnexion"
    },
    English: { 
        Profile: "Profile", 
        SavedPlaces: "Saved Places", 
        Support: "Support", 
        Messages: "Messages",
        Notifications: "Notifications",
        MyLocation: "My Location",
        ReportProblem: "Report a Problem",
        Language: "Language",
        Languages: "Languages",
        DarkMode: "Dark Mode",
        Logout: "Logout"
    },
    Russian: { 
        Profile: "Профиль", 
        SavedPlaces: "Сохраненные места", 
        Support: "Поддержка", 
        Messages: "Сообщения",
        Notifications: "Уведомления",
        MyLocation: "Мое местоположение",
        ReportProblem: "Сообщить о проблеме",
        Language: "Язык",
        Languages: "Языки",
        DarkMode: "Темный режим",
        Logout: "Выйти"
    },
    German: { 
        Profile: "Profil", 
        SavedPlaces: "Gespeicherte Orte", 
        Support: "Unterstützung", 
        Messages: "Nachrichten",
        Notifications: "Benachrichtigungen",
        MyLocation: "Mein Standort",
        ReportProblem: "Problem melden",
        Language: "Sprache",
        Languages: "Sprachen",
        DarkMode: "Dunkelmodus",
        Logout: "Abmelden"
    },
    Korean: { 
        Profile: "프로필", 
        SavedPlaces: "저장된 장소", 
        Support: "지원", 
        Messages: "메시지",
        Notifications: "알림",
        MyLocation: "내 위치",
        ReportProblem: "문제 신고",
        Language: "언어",
        Languages: "언어들",
        DarkMode: "다크 모드",
        Logout: "로그아웃"
    },
    Chinese: { 
        Profile: "个人资料", 
        SavedPlaces: "已保存的位置", 
        Support: "支持", 
        Messages: "消息",
        Notifications: "通知",
        MyLocation: "我的位置",
        ReportProblem: "报告问题",
        Language: "语言",
        Languages: "语言",
        DarkMode: "深色模式",
        Logout: "登出"
    },
    Ukrainian: { 
        Profile: "Профіль", 
        SavedPlaces: "Збережені місця", 
        Support: "Підтримка", 
        Messages: "Повідомлення",
        Notifications: "Сповіщення",
        MyLocation: "Моє місцезнаходження",
        ReportProblem: "Повідомити про проблему",
        Language: "Мова",
        Languages: "Мови",
        DarkMode: "Темний режим",
        Logout: "Вийти"
    },
    Spanish: { 
        Profile: "Perfil", 
        SavedPlaces: "Lugares guardados", 
        Support: "Soporte", 
        Messages: "Mensajes",
        Notifications: "Notificaciones",
        MyLocation: "Mi ubicación",
        ReportProblem: "Reportar un problema",
        Language: "Idioma",
        Languages: "Idiomas",
        DarkMode: "Modo oscuro",
        Logout: "Cerrar sesión"
    },
    Arabic: { 
        Profile: "الملف الشخصي", 
        SavedPlaces: "الأماكن المحفوظة", 
        Support: "الدعم", 
        Messages: "الرسائل",
        Notifications: "الإشعارات",
        MyLocation: "موقعي",
        ReportProblem: "الإبلاغ عن مشكلة",
        Language: "اللغة",
        Languages: "اللغات",
        DarkMode: "الوضع الداكن",
        Logout: "تسجيل الخروج"
    }
};


const getTranslations = async () => {
    try {
        let language = await AsyncStorage.getItem("language");

        if (translations[language]) {
            return translations[language];
        }
        return translations["English"];
    }
    catch (error) {
        console.error("Error fetching language:", error);
        return translations["English"];
    }
};

const Profile = () => {
    const router = useRouter()
    const { isDarkTheme, toggleTheme } = useTheme();
    const [words, setWords] = useState({ Profile: "Profile", SavedPlaces: "Saved places", Support: "Support",Messages:"Messages",Logout:"Logout",DarkMode:"Dark Mode",ReportProblem:"Report Problem",MyLocation:"My Location",Notifications:"Notifications",Languages:"Languages"})


    useEffect(() => {
        const fetchTranslations = async () => {
            const translatedWords = await getTranslations();
            setWords(translatedWords);
        };
        fetchTranslations();
    }, []);


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <Text style={{ marginTop: 40, textAlign: "center", fontSize: 20, marginBottom: 40, color: isDarkTheme ? "white" : "black" }}>Account</Text>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>
                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                    <Pressable onPress={() => { router.push("/rider/home/profile2") }} style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={accountImage} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>{words?.Profile}</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push("/rider/home/saved")} style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={location2Image} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>{words?.SavedPlaces}</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push("/rider/home/report")} style={{ width: 110, height: 80, backgroundColor: isDarkTheme ? "#333333" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Image source={supportImage} />
                        <Text style={{ color: isDarkTheme ? "white" : "#454F60", marginTop: 10 }}>{words?.Support}</Text>
                    </Pressable>
                </View>

                <View style={{ backgroundColor: isDarkTheme ? "#272727" : "#fff", marginTop: 10, borderRadius: 10, flex: 1 }}>


                    <View style={{ backgroundColor: isDarkTheme ? "#333333" : '#ffff', padding: isDarkTheme && 10, borderRadius: isDarkTheme ? 10 : 0 }}>
                        <Pressable onPress={() => router.push("/rider/home/profile2")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginVertical: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={automaticImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.Profile}</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/msg")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={msgImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.Messages}</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/notification2")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={nearImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.Notifications}</Text>

                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/saved")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={nearImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.MyLocation}</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/report")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={editImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.ReportProblem}</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider/home/lang")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <Image source={translationImage} />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.Languages}</Text>
                        </Pressable>

                        <Pressable onPress={() => router.push("/rider/home/terms")} style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>
                            <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                <MaterialIcons name="privacy-tip" size={20} color="black" />
                            </View>
                            <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>Terms & Conditions</Text>
                        </Pressable>

                        <Pressable style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginBottom: 10, paddingBottom: 10, borderBottomColor: "#F2F2F2", borderBottomWidth: isDarkTheme ? 0 : 1 }}>

                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ backgroundColor: "#F2F2F2", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 200, width: 32, height: 32, marginRight: 5 }}>
                                    <Image source={themeImage} />
                                </View>
                                <Text style={{ color: isDarkTheme ? "white" : "#454F60" }}>{words?.DarkMode}</Text>
                            </View>
                            {
                                isDarkTheme ?

                                    <Pressable onPress={() => toggleTheme(false)}><Image source={onImage} /></Pressable> : <Pressable onPress={() => toggleTheme(true)}><Image source={offImage} /></Pressable>
                            }
                        </Pressable>
                        <Pressable onPress={() => router.push("/rider")} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, backgroundColor: "#FEE9E5", width: 143, height: 48, borderRadius: 10 }}>
                                <Text style={{ color: "#FD3030" }}>{words?.Logout}</Text>
                            </View>
                        </Pressable>
                    </View>



                </View>

            </ScrollView>

            <BottomNav />

        </View>
    )
}

export default Profile
