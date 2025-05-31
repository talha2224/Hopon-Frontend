import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StatusBar, Text, View } from 'react-native'
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import cashImage from '../../../assets/images/cash.png';
import debitImage from '../../../assets/images/debit.png';
import carImage from '../../../assets/images/car3.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import devConfig from '../../../config';

const translations = {
    French: {
        Trip: "Voyage",
        Upcoming: "À venir",
        Completed: "Terminé",
        Cancelled: "Annulé",
        Wallet: "Portefeuille",
        TotalRides: "Total des trajets",
        Fundwallet: "Alimenter le portefeuille",
        Paymentmethods: "Moyens de paiement",
        Cash: "Espèces",
        Alltransactions: "Toutes les transactions",
        Viewall: "Voir tout",
        NoDataFound: "Aucune donnée trouvée"
    },
    English: {
        Trip: "Trip",
        Upcoming: "Upcoming",
        Completed: "Completed",
        Cancelled: "Cancelled",
        Wallet: "Wallet",
        TotalRides: "Total Rides",
        Fundwallet: "Fund wallet",
        Paymentmethods: "Payment methods",
        Cash: "Cash",
        Alltransactions: "All transactions",
        Viewall: "View all",
        NoDataFound: "No Data Found"
    },
    Russian: {
        Trip: "Путешествие",
        Upcoming: "Предстоящие",
        Completed: "Завершено",
        Cancelled: "Отменено",
        Wallet: "Кошелек",
        TotalRides: "Всего поездок",
        Fundwallet: "Пополнить кошелек",
        Paymentmethods: "Способы оплаты",
        Cash: "Наличные",
        Alltransactions: "Все транзакции",
        Viewall: "Посмотреть все",
        NoDataFound: "Данные не найдены"
    },
    German: {
        Trip: "Reise",
        Upcoming: "Bevorstehend",
        Completed: "Abgeschlossen",
        Cancelled: "Storniert",
        Wallet: "Brieftasche",
        TotalRides: "Gesamtfahrten",
        Fundwallet: "Brieftasche aufladen",
        Paymentmethods: "Zahlungsmethoden",
        Cash: "Bargeld",
        Alltransactions: "Alle Transaktionen",
        Viewall: "Alle ansehen",
        NoDataFound: "Keine Daten gefunden"
    },
    Korean: {
        Trip: "여행",
        Upcoming: "예정된",
        Completed: "완료됨",
        Cancelled: "취소됨",
        Wallet: "지갑",
        TotalRides: "총 탑승 횟수",
        Fundwallet: "지갑 충전",
        Paymentmethods: "결제 방법",
        Cash: "현금",
        Alltransactions: "모든 거래",
        Viewall: "모두 보기",
        NoDataFound: "데이터를 찾을 수 없음"
    },
    Chinese: {
        Trip: "旅行",
        Upcoming: "即将到来",
        Completed: "已完成",
        Cancelled: "已取消",
        Wallet: "钱包",
        TotalRides: "总乘车次数",
        Fundwallet: "充值钱包",
        Paymentmethods: "支付方式",
        Cash: "现金",
        Alltransactions: "所有交易",
        Viewall: "查看全部",
        NoDataFound: "未找到数据"
    },
    Ukrainian: {
        Trip: "Подорож",
        Upcoming: "Майбутні",
        Completed: "Завершено",
        Cancelled: "Скасовано",
        Wallet: "Гаманець",
        TotalRides: "Загальна кількість поїздок",
        Fundwallet: "Поповнити гаманець",
        Paymentmethods: "Методи оплати",
        Cash: "Готівка",
        Alltransactions: "Усі транзакції",
        Viewall: "Переглянути все",
        NoDataFound: "Дані не знайдено"
    },
    Spanish: {
        Trip: "Viaje",
        Upcoming: "Próximos",
        Completed: "Completado",
        Cancelled: "Cancelado",
        Wallet: "Cartera",
        TotalRides: "Total de viajes",
        Fundwallet: "Recargar cartera",
        Paymentmethods: "Métodos de pago",
        Cash: "Efectivo",
        Alltransactions: "Todas las transacciones",
        Viewall: "Ver todo",
        NoDataFound: "No se encontraron datos"
    },
    Arabic: {
        Trip: "رحلة",
        Upcoming: "القادم",
        Completed: "مكتمل",
        Cancelled: "ملغى",
        Wallet: "المحفظة",
        TotalRides: "إجمالي الرحلات",
        Fundwallet: "شحن المحفظة",
        Paymentmethods: "طرق الدفع",
        Cash: "نقدًا",
        Alltransactions: "جميع المعاملات",
        Viewall: "عرض الكل",
        NoDataFound: "لم يتم العثور على بيانات"
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


const Wallet = () => {
    const arr = [1, 2, 3, 4]
    const router = useRouter()
    const { isDarkTheme } = useTheme();
    const [walletData, setWalletData] = useState([])
    const sumTotal = (data) => { return data?.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2); };
    const [words, setWords] = useState({ Wallet: "Wallet", TotalRides: "Total Rides", Fundwallet: "Fund wallet", Paymentmethods: "Payment methods",Cash:"Cash",Alltransactions:"All transactions",Viewall:"View all",Completed:"Completed",NoDataFound:"No Data Found"})

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    }

    useEffect(() => {
        const getWalletHistory = async () => {
            try {
                let riderId = await AsyncStorage.getItem('riderId');
                const res = await axios.get(`${devConfig.baseUrl}/wallet/history/rider/${riderId}`)
                setWalletData(res.data?.data);
            }
            catch (error) {
                console.error('Error fetching active booking:', error);
            }
        };

        getWalletHistory()
    }, []);


    useEffect(() => {
        const fetchTranslations = async () => {
            const translatedWords = await getTranslations();
            setWords(translatedWords);
        };
        fetchTranslations();
    }, []);


    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <StatusBar hidden={true} />


            {

                walletData?.length > 0 ?

                    <View>

                        <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "#000", marginBottom: 20 }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, marginBottom: 10 }}>{words?.Wallet}</Text>
                            <Text style={{ color: "#7b7c7e", fontSize: 16, marginBottom: 4 }}>{words?.TotalRides} {walletData?.length}</Text>
                            <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20, marginBottom: 10 }}>USD {sumTotal(walletData)}</Text>
                            <Pressable style={{ backgroundColor: "#fff", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 30 }}>
                                <Text>{words?.Fundwallet}</Text>
                            </Pressable>
                        </View>

                        <ScrollView style={{ paddingHorizontal: 20, backgroundColor: isDarkTheme && "#292929" }}>


                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: isDarkTheme && "white", paddingTop: 10 }}>{words?.Paymentmethods}</Text>
                                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                                    <View style={{ flex: 1, marginRight: 10, backgroundColor: "#E8F0FF", height: 135, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                        <Image source={cashImage} />
                                        <Text style={{ marginTop: 15 }}>{words?.Cash}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* <Pressable onPress={() => router.push("/rider/home/payment")} style={{ backgroundColor: "#2666CF", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                                <Text style={{ color: "#fff" }}>Add payment method</Text>
                            </Pressable> */}

                            <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginVertical: 20 }}>
                                <Text style={{ color: isDarkTheme && "white" }}>{words?.Alltransactions}</Text>
                                <Text style={{ color: "#2666CF" }}>{words?.Viewall}</Text>
                            </View>

                            <View style={{ marginBottom: 50 }}>
                                {
                                    walletData?.map((i) => (
                                        <View key={i?._id} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: isDarkTheme ? "#2f2f2f" : "#F6F6F6", padding: 10, borderRadius: 13 }}>
                                            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                                <View style={{ backgroundColor: "#E2E7EC", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5, width: 32, height: 32, marginRight: 5 }}>
                                                    <Image source={carImage} />
                                                </View>
                                                <View style={{ marginLeft: 3 }}>
                                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000", marginBottom: 2 }}>{i?.message}</Text>
                                                    <Text style={{ color: "#aba8a8" }}>{formatDate(i?.createdAt)}</Text>
                                                </View>
                                            </View>

                                            <View style={{ marginLeft: 3 }}>
                                                <Text style={{ color: isDarkTheme ? "#fff" : "#000", marginBottom: 2, fontSize: 16, fontWeight: 700 }}>${i?.amount?.toFixed(2)}</Text>
                                                <Text style={{ color: "#03AD33" }}>{words?.Completed}</Text>
                                            </View>

                                        </View>
                                    ))
                                }
                            </View>

                        </ScrollView>

                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Text style={{ color: isDarkTheme ? "white" : "black", fontSize: 20 }}>{words?.NoDataFound}</Text>
                    </View>
            }





            {/* <View style={{ borderTopColor: "#313131", borderTopWidth: 1 }}> */}
            <BottomNav />
            {/* </View> */}

        </View>
    )
}

export default Wallet