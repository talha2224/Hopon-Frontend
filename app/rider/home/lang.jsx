import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import style from '../../../style/rider/home/saved';
import BottomNav from '../../../components/BottomNav';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import checkon from '../../../assets/images/checkon.png';
import checkoff from '../../../assets/images/checkoff.png';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';

const Lang = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // Track selected language
    const router = useRouter();
    const { isDarkTheme } = useTheme();

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language); // Set the selected language
    };

    const languages = [
        "English", "French", "Russian", "German", "Korean", 
        "Chinese", "Ukrainian", "Spanish", "Arabic"
    ];

    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <AntDesign onPress={() => router.push("/rider/home/profile")} name="arrowleft" size={24} color={isDarkTheme ? "white" : "black"} />
                <Text style={{ color: isDarkTheme && "white" }}>Languages</Text>
                <Pressable><EvilIcons name="search" size={24} color="black" /></Pressable>
            </View>

            <ScrollView contentContainerStyle={isDarkTheme ? style.ScrollcontainerDark : style.Scrollcontainer}>
                <View style={{ backgroundColor: "#333333", paddingVertical: 10, paddingHorizontal: 1, borderRadius: 10, marginHorizontal: 10 }}>
                    {languages.map((language, index) => (
                        <View key={index} style={{ marginBottom: 15, marginHorizontal: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: "#F9F9F9", borderBottomWidth: isDarkTheme ? 0 : 1, paddingBottom: 10 }}>
                            <Text style={{ color: isDarkTheme ? "white" : "#323232", marginBottom: 2 }}>{language}</Text>
                            <Pressable onPress={() => handleLanguageSelect(language)}>
                                <Image style={{ width: 15, height: 15 }} source={selectedLanguage === language ? checkon : checkoff} />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomNav />
        </View>
    );
};

export default Lang;
