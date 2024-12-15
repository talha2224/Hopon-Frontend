

import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
import nameStyle from '../../style/rider/phone';
import AntDesign from '@expo/vector-icons/AntDesign';
import config from '../../config'
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Car = () => {
    const [files, setFiles] = useState([null, null, null]); // Initialize with three slots
    const [loading, setLoading] = useState(false);

    // Load images from AsyncStorage on component mount
    useEffect(() => {
        const loadImages = async () => {
            const savedFiles = await AsyncStorage.getItem("car");
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
            await AsyncStorage.setItem("car", JSON.stringify(updatedFiles));
        }
    };

    // Continue button handler
    const continueHandler = async () => {

        if (files.length == 3) {
            // setLoading(true);
            Toast.show({
                type: 'success',
                text1: 'Uploading...',
                text2: 'Please wait while we process your information.',
                autoHide: loading
            });
            try {
                // Retrieve and parse data from AsyncStorage
                const insurance = JSON.parse(await AsyncStorage.getItem("insurance"));
                const license = JSON.parse(await AsyncStorage.getItem("license"));
                const inspection = JSON.parse(await AsyncStorage.getItem("inspection"));
                const first_name = JSON.parse(await AsyncStorage.getItem("first_name"));
                const last_name = JSON.parse(await AsyncStorage.getItem("last_name"));
                const phone_number = JSON.parse(await AsyncStorage.getItem("phone_number"));

                // Create FormData
                let formData = new FormData();

                // Append license images
                // license.forEach((img, index) => {
                //     formData.append("licenseImage", {
                //         uri: img.uri,
                //         name: `licenseImage_${index}.jpg`,
                //         type: "image/jpeg"
                //     });
                // });

                // Append car photos
                files.forEach((img, index) => { formData.append("carPhotos", { uri: img.uri, name: `carPhoto_${index}.jpg`, type: "image/jpeg" }); });

                // Append insurance images
                // insurance.forEach((img, index) => {
                //     formData.append("insuranceImage", {
                //         uri: img.uri,
                //         name: `insuranceImage_${index}.jpg`,
                //         type: "image/jpeg"
                //     });
                // });

                // Append inspection images
                // inspection.forEach((img, index) => {
                //     formData.append("inspection", {
                //         uri: img.uri,
                //         name: `inspection_${index}.jpg`,
                //         type: "image/jpeg"
                //     });
                // });

                // Append text data
                formData.append("first_name", first_name);
                formData.append("last_name", last_name);
                formData.append("phone_number", phone_number);




                // Send FormData to server
                const response = await fetch(`${config.baseUrl}/driver/register`, {
                    method: "POST",
                    body: formData,
                    headers: { "Content-Type": "multipart/form-data", },
                });

                if (response) {
                    setLoading(true)
                    await AsyncStorage.removeItem("insurance");
                    await AsyncStorage.removeItem("license")
                    await AsyncStorage.removeItem("inspection")
                    await AsyncStorage.removeItem("first_name")
                    await AsyncStorage.removeItem("last_name")
                    await AsyncStorage.removeItem("phone_number")
                    await AsyncStorage.removeItem("car")
                    setFiles([null, null, null])
                    Toast.show({ type: 'info', text1: 'Success', text2: 'Your account is created.', autoHide: false, });
                    router.push("/driver");

                }
                else {
                    console.error("Failed to create account", response.status);
                }
            }
            catch (error) {
                console.error("Error uploading data:", error);
            }
        } else {
            Alert.alert("Upload Required", "Please upload 3 vehicle photos before continuing.");
        }
    };

    return (
        <View style={nameStyle.container}>
            <Pressable onPress={() => router.push("/driver/vehicle")} style={nameStyle.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>

            <Text style={nameStyle.txt}>Vehicle Information</Text>
            <Text style={{ color: "#71757b", marginTop: 2 }}>Upload clear and vivid car photos</Text>

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
            <Toast />
        </View>
    );
};
export default Car;
