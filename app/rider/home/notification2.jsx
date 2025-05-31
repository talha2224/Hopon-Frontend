import React, { useEffect, useState } from 'react'
import { ScrollView, Switch, Text, View } from 'react-native'
import style from '../../../style/rider/home/notification2';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const translations = {
    French: {
        Submit: "Soumettre",
        Reportproblem: "Signaler un problème",
        Notification: "Notification",
        RideArrival: "Arrivée du trajet",
        RideCompleted: "Trajet terminé",
        AppUpdates: "Mises à jour de l'application",
        PushNotification: "Notification push",
    },
    English: {
        Submit: "Submit",
        Reportproblem: "Report a problem",
        Notification: "Notification",
        RideArrival: "Ride Arrival",
        RideCompleted: "Ride Completed",
        AppUpdates: "App Updates",
        PushNotification: "Push Notification",
    },
    Russian: {
        Submit: "Отправить",
        Reportproblem: "Сообщить о проблеме",
        Notification: "Уведомление",
        RideArrival: "Прибытие поездки",
        RideCompleted: "Поездка завершена",
        AppUpdates: "Обновления приложения",
        PushNotification: "Push-уведомление",
    },
    German: {
        Submit: "Einreichen",
        Reportproblem: "Problem melden",
        Notification: "Benachrichtigung",
        RideArrival: "Fahrt angekommen",
        RideCompleted: "Fahrt abgeschlossen",
        AppUpdates: "App-Updates",
        PushNotification: "Push-Benachrichtigung",
    },
    Korean: {
        Submit: "제출",
        Reportproblem: "문제 신고",
        Notification: "알림",
        RideArrival: "승차 도착",
        RideCompleted: "승차 완료",
        AppUpdates: "앱 업데이트",
        PushNotification: "푸시 알림",
    },
    Chinese: {
        Submit: "提交",
        Reportproblem: "报告问题",
        Notification: "通知",
        RideArrival: "行程到达",
        RideCompleted: "行程完成",
        AppUpdates: "应用更新",
        PushNotification: "推送通知",
    },
    Ukrainian: {
        Submit: "Надіслати",
        Reportproblem: "Повідомити про проблему",
        Notification: "Сповіщення",
        RideArrival: "Прибуття поїздки",
        RideCompleted: "Поїздка завершена",
        AppUpdates: "Оновлення додатку",
        PushNotification: "Push-сповіщення",
    },
    Spanish: {
        Submit: "Enviar",
        Reportproblem: "Reportar un problema",
        Notification: "Notificación",
        RideArrival: "Llegada del viaje",
        RideCompleted: "Viaje completado",
        AppUpdates: "Actualizaciones de la aplicación",
        PushNotification: "Notificación push",
    },
    Arabic: {
        Submit: "إرسال",
        Reportproblem: "الإبلاغ عن مشكلة",
        Notification: "إشعار",
        RideArrival: "وصول الرحلة",
        RideCompleted: "اكتملت الرحلة",
        AppUpdates: "تحديثات التطبيق",
        PushNotification: "إشعار الدفع",
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

const Notification2 = () => {
    const [rideArrival, setRideArrival] = useState(true);
    const [rideCompleted, setRideCompleted] = useState(false);
    const [appUpdates, setAppUpdates] = useState(false);
    const [pushNotification, setPushNotification] = useState(true);

    const router = useRouter()
    const { isDarkTheme } = useTheme();

    const [words, setWords] = useState({ Notification: "Notification", RideArrival: "Ride Arrival",RideCompleted:"Ride Completed",AppUpdates:"App Updates",PushNotification:"Push Notification" })
    useEffect(() => {
        const fetchTranslations = async () => {
            const translatedWords = await getTranslations();
            setWords(translatedWords);
        };
        fetchTranslations();
    }, []);

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/profile")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                <Text style={{ color: isDarkTheme && "white" }}>{words?.Notification}</Text>
                <View></View>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>

                <View style={{ backgroundColor: isDarkTheme ? "#333333" : "#fff", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{words?.RideArrival}</Text>
                        <Switch
                            value={rideArrival}
                            onValueChange={() => setRideArrival(!rideArrival)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{words?.RideCompleted}</Text>
                        <Switch
                            value={rideCompleted}
                            onValueChange={() => setRideCompleted(!rideCompleted)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{words?.AppUpdates}</Text>
                        <Switch
                            value={appUpdates}
                            onValueChange={() => setAppUpdates(!appUpdates)}
                        />
                    </View>
                    <View style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{words?.PushNotification}</Text>
                        <Switch
                            value={pushNotification}
                            onValueChange={() => setPushNotification(!pushNotification)}
                        />
                    </View>
                </View>

            </ScrollView>

            <BottomNav />

        </View>
    )
}

export default Notification2
