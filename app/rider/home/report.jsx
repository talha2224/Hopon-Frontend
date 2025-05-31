import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import style from '../../../style/rider/home/report';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const translations = {
    French: {
        Submit: "Soumettre",
        Reportproblem: "Signaler un problème",
    },
    English: {
        Submit: "Submit",
        Reportproblem: "Report a problem",
    },
    Russian: {
        Submit: "Отправить",
        Reportproblem: "Сообщить о проблеме",
    },
    German: {
        Submit: "Einreichen",
        Reportproblem: "Problem melden",
    },
    Korean: {
        Submit: "제출",
        Reportproblem: "문제 신고",
    },
    Chinese: {
        Submit: "提交",
        Reportproblem: "报告问题",
    },
    Ukrainian: {
        Submit: "Надіслати",
        Reportproblem: "Повідомити про проблему",
    },
    Spanish: {
        Submit: "Enviar",
        Reportproblem: "Reportar un problema",
    },
    Arabic: {
        Submit: "إرسال",
        Reportproblem: "الإبلاغ عن مشكلة",
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

const Report = () => {
    const router = useRouter()
    const [words, setWords] = useState({ Reportproblem: "Report problem", Submit: "Submit"})
    useEffect(() => {
        const fetchTranslations = async () => {
            const translatedWords = await getTranslations();
            setWords(translatedWords);
        };
        fetchTranslations();
    }, []);
    return (
        <View style={style.container}>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/profile")} name="arrowleft" size={24} color="black" />
                <Text style={{ fontSize: 18 }}>{words?.ReportProblem}</Text>
                <Pressable ><EvilIcons name="search" size={24} color="black" /></Pressable>
            </View>

            <ScrollView contentContainerStyle={style.Scrollcontainer}>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TextInput placeholder='Write your complaint...' style={{ borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 5, width: "90%", height: 150, padding: 10 }} />
                    {/* <View style={{ backgroundColor: "#E1E1E1", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, width: "40%", height: 50 }}>
                        <AntDesign name="picture" size={24} color="black" />
                    </View> */}
                    <Pressable onPress={() => router.push("/rider/home/profile")} style={{ backgroundColor: "#2666CF", width: "90%", height: 50, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 15, borderRadius: 5 }}>
                        <Text style={{ color: "#fff" }}>{words?.Submit}</Text>
                    </Pressable>
                </View>

            </ScrollView>


            <BottomNav />

        </View>
    )
}

export default Report