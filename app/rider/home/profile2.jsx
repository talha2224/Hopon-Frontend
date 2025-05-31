import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Modal, TextInput, Button } from 'react-native';
import style from '../../../style/rider/home/profile';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImage from '../../../assets/images/user.png';  // Default user image
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import config from '../../../config';

const translations = {
    French: {
        Submit: "Soumettre",
        Reportproblem: "Signaler un problème",
        Notification: "Notification",
        RideArrival: "Arrivée du trajet",
        RideCompleted: "Trajet terminé",
        AppUpdates: "Mises à jour de l'application",
        PushNotification: "Notification push",
        Profile: "Profil",
        PersonalInformation: "Informations personnelles",
        FirstName: "Prénom",
        LastName: "Nom de famille",
        Language: "Langue",
        PhoneNumber: "Numéro de téléphone",
    },
    English: {
        Submit: "Submit",
        Reportproblem: "Report a problem",
        Notification: "Notification",
        RideArrival: "Ride Arrival",
        RideCompleted: "Ride Completed",
        AppUpdates: "App Updates",
        PushNotification: "Push Notification",
        Profile: "Profile",
        PersonalInformation: "Personal Information",
        FirstName: "First Name",
        LastName: "Last Name",
        Language: "Language",
        PhoneNumber: "Phone Number",
    },
    Russian: {
        Submit: "Отправить",
        Reportproblem: "Сообщить о проблеме",
        Notification: "Уведомление",
        RideArrival: "Прибытие поездки",
        RideCompleted: "Поездка завершена",
        AppUpdates: "Обновления приложения",
        PushNotification: "Push-уведомление",
        Profile: "Профиль",
        PersonalInformation: "Личная информация",
        FirstName: "Имя",
        LastName: "Фамилия",
        Language: "Язык",
        PhoneNumber: "Номер телефона",
    },
    German: {
        Submit: "Einreichen",
        Reportproblem: "Problem melden",
        Notification: "Benachrichtigung",
        RideArrival: "Fahrt angekommen",
        RideCompleted: "Fahrt abgeschlossen",
        AppUpdates: "App-Updates",
        PushNotification: "Push-Benachrichtigung",
        Profile: "Profil",
        PersonalInformation: "Persönliche Informationen",
        FirstName: "Vorname",
        LastName: "Nachname",
        Language: "Sprache",
        PhoneNumber: "Telefonnummer",
    },
    Korean: {
        Submit: "제출",
        Reportproblem: "문제 신고",
        Notification: "알림",
        RideArrival: "승차 도착",
        RideCompleted: "승차 완료",
        AppUpdates: "앱 업데이트",
        PushNotification: "푸시 알림",
        Profile: "프로필",
        PersonalInformation: "개인 정보",
        FirstName: "이름",
        LastName: "성",
        Language: "언어",
        PhoneNumber: "전화번호",
    },
    Chinese: {
        Submit: "提交",
        Reportproblem: "报告问题",
        Notification: "通知",
        RideArrival: "行程到达",
        RideCompleted: "行程完成",
        AppUpdates: "应用更新",
        PushNotification: "推送通知",
        Profile: "个人资料",
        PersonalInformation: "个人信息",
        FirstName: "名字",
        LastName: "姓氏",
        Language: "语言",
        PhoneNumber: "电话号码",
    },
    Ukrainian: {
        Submit: "Надіслати",
        Reportproblem: "Повідомити про проблему",
        Notification: "Сповіщення",
        RideArrival: "Прибуття поїздки",
        RideCompleted: "Поїздка завершена",
        AppUpdates: "Оновлення додатку",
        PushNotification: "Push-сповіщення",
        Profile: "Профіль",
        PersonalInformation: "Особиста інформація",
        FirstName: "Ім'я",
        LastName: "Прізвище",
        Language: "Мова",
        PhoneNumber: "Номер телефону",
    },
    Spanish: {
        Submit: "Enviar",
        Reportproblem: "Reportar un problema",
        Notification: "Notificación",
        RideArrival: "Llegada del viaje",
        RideCompleted: "Viaje completado",
        AppUpdates: "Actualizaciones de la aplicación",
        PushNotification: "Notificación push",
        Profile: "Perfil",
        PersonalInformation: "Información personal",
        FirstName: "Nombre",
        LastName: "Apellido",
        Language: "Idioma",
        PhoneNumber: "Número de teléfono",
    },
    Arabic: {
        Submit: "إرسال",
        Reportproblem: "الإبلاغ عن مشكلة",
        Notification: "إشعار",
        RideArrival: "وصول الرحلة",
        RideCompleted: "اكتملت الرحلة",
        AppUpdates: "تحديثات التطبيق",
        PushNotification: "إشعار الدفع",
        Profile: "الملف الشخصي",
        PersonalInformation: "المعلومات الشخصية",
        FirstName: "الاسم الأول",
        LastName: "اسم العائلة",
        Language: "اللغة",
        PhoneNumber: "رقم الهاتف",
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

const Profile2 = () => {
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    // Fetch profile data from API
    const fetchProfile = async () => {
        const riderId = await AsyncStorage.getItem('riderId');
        if (riderId) {
            try {
                const res = await axios.get(`${config.baseUrl}/rider/info/${riderId}`);
                setData(res.data.data);
            } catch (error) {
                console.log('Error fetching profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1, });
            if (!pickerResult.canceled) {
                console.log(pickerResult?.assets[0], 'pickerResult')
                setImageUri(pickerResult?.assets[0]);
            }
        }
    };

    // Handle image upload to server
    const uploadImage = async () => {
        const riderId = await AsyncStorage.getItem('riderId');
        console.log(imageUri, 'wow')
        if (riderId && imageUri) {
            const formData = new FormData();
            formData.append("image", { uri: imageUri.uri, name: `userPhoto.jpg`, type: "image/jpeg" })

            try {
                // const res = await axios.post(`${config.baseUrl}/rider/upload/${riderId}`,formData);
                const res = await fetch(`${config.baseUrl}/rider/upload/${riderId}`, { method: "PUT", body: formData, headers: { "Content-Type": "multipart/form-data", }, });
                setModalVisible(false);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const [words, setWords] = useState({ Profile: "Profile", PersonalInformation: "Personal Information", FirstName: "First Name", LastName: "Last Name", Language: "Language",PhoneNumber:"Phone Number"})
    useEffect(() => {
        const fetchTranslations = async () => {
            const translatedWords = await getTranslations();
            setWords(translatedWords);
        };
        fetchTranslations();
    }, []);
    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <View style={{ marginTop: 30, backgroundColor: '#2666CF', paddingHorizontal: 20, paddingVertical: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                <AntDesign onPress={() => router.push('/rider/home/profile')} name="arrowleft" size={24} color={isDarkTheme ? 'white' : 'black'} />
                <Text style={{ color: isDarkTheme ? 'white' : 'black' }}>{words?.Profile}</Text>
                <View></View>
            </View>

            <View style={{ alignItems: 'center', marginVertical: 50, marginHorizontal: 20, backgroundColor: isDarkTheme ? "#FFFFFF" : "#000", paddingBottom: 10, borderRadius: 10 }}>
                <Pressable onPress={() => setModalVisible(true)} style={{ marginTop: -30 }}>
                    <Image source={data?.profile ? { uri: data.profile } : UserImage} style={{ width: 70, height: 70, borderRadius: 50 }} />
                </Pressable>
                <Text style={{ fontSize: 20, marginTop: 10 }}>{data?.first_name} {data?.last_name}</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginTop: 2 }}>{data?.prefference}</Text>
            </View>

            <View style={{ paddingHorizontal: 20, backgroundColor: isDarkTheme ? "#FFFFFF" : "#000", marginHorizontal: 20, borderRadius: 10, padding: 10 }}>
                <Text style={{ fontSize: 20, marginBottom: 5, color: "#A8A8A8" }}>{words?.PersonalInformation}</Text>
                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.first_name}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>{words?.FirstName}</Text>
                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.last_name}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>{words?.LastName}</Text>

                <Text style={{ fontSize: 16, marginBottom: 2 }}>English</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>{words?.Language}</Text>

                <Text style={{ fontSize: 16, marginBottom: 2 }}>{data?.phone_number}</Text>
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>{words?.PhoneNumber}</Text>
            </View>

            {/* Image Upload Modal */}
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Upload Profile Image</Text>

                        <Pressable style={{ backgroundColor: '#2666CF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, marginBottom: 15, width: '100%', alignItems: 'center' }} onPress={handleImagePick}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Choose Image</Text>
                        </Pressable>

                        <Pressable style={{ backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, marginBottom: 15, width: '100%', alignItems: 'center' }} onPress={uploadImage} disabled={!imageUri}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Upload</Text>
                        </Pressable>

                        <Pressable style={{ backgroundColor: '#f44336', paddingVertical: 10, width: '100%', alignItems: 'center', borderRadius: 5, }} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Profile2;
