
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
import nameStyle from '../../style/rider/phone';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const inspection = () => {
    const [files, setFiles] = useState([null, null, null]); // Initialize with three slots

    // Load images from AsyncStorage on component mount
    useEffect(() => {
        const loadImages = async () => {
            const savedFiles = await AsyncStorage.getItem("inspection");
            if (savedFiles) {
                setFiles(JSON.parse(savedFiles));
            }
        };
        loadImages();
    }, []);

    // Function to handle file upload
    const pickFile = async (index) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission required", "Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.canceled) {
            const updatedFiles = [...files];
            updatedFiles[index] = result.assets[0];
            setFiles(updatedFiles);

            // Save the updated images to AsyncStorage
            await AsyncStorage.setItem("inspection", JSON.stringify(updatedFiles));
        }
    };

    // Continue button handler
    const continueHandler = async () => {
        if (files.every(file => file)) {
            router.push("/driver/vehicle");
        } else {
            Alert.alert("Upload Required", "Please upload 3 vehicle photos before continuing.");
        }
    };

    return (
        <View style={nameStyle.container}>
            <Pressable onPress={() => router.push("/driver/vehicle")} style={nameStyle.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Vehicle Inspection Information</Text>
            <Text style={{ color: "#71757b", marginTop: 2 }}>Upload clear and vivid inspection photos</Text>

            <View style={{ display: "flex", alignItems: "center", flexDirection: "row", marginTop: 20 }}>
                {[...Array(3)].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => pickFile(index)}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 70,
                            height: 61,
                            marginRight: 5,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#E0E3FF",
                            backgroundColor: "#F4F6FD"
                        }}
                    >
                        {files[index] ? (
                            <Image
                                source={{ uri: files[index].uri }}
                                style={{ width: 70, height: 61, borderRadius: 5 }}
                            />
                        ) : (
                            <FontAwesome5 name="plus" size={24} color="#2666CF" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <Pressable onPress={continueHandler} style={[nameStyle.btn, { width: "100%" }]}>
                <Text style={nameStyle.btnTxt}>Continue</Text>
            </Pressable>
        </View>
    );
};

export default inspection;
