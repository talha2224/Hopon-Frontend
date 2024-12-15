import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import style from '../../../style/rider/home/msg';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/themeContext';
import devConfig from '../../../config';

const socket = io(devConfig.socketUrl);

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatId, setChatId] = useState('');
    const [driverName, setDriverName] = useState('');
    const router = useRouter();
    const { isDarkTheme } = useTheme();
    const flatListRef = useRef();

    const fetchMessageHistory = async () => {
        try {
            const storedChatId = await AsyncStorage.getItem('chatId');
            const storedDriverName = await AsyncStorage.getItem('driverName');
            setChatId(storedChatId);
            setDriverName(storedDriverName || 'Unknown');

            if (storedChatId) {
                socket.emit('join-chat', storedChatId);
                socket.on('chat-history', (chatHistory) => {
                    setMessages(chatHistory);
                });
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {id: Date.now(),chatId,message,senderRole:'driver'};
            socket.emit('send-message', newMessage);
            setMessages((prev) => [...prev, { ...newMessage, sender:'driver' }]);
            setMessage('');
        }
    };

    useEffect(() => {
        fetchMessageHistory();
        socket.on('receive-message', (newMessage) => {
            setMessages((prev) => {
                if (prev.some((msg) => msg.id === newMessage.id)) {return prev;}
                return [...prev, newMessage];
            });
        });

        return () => {
            socket.off('chat-history');
            socket.off('receive-message');
            socket.disconnect();
        };
    }, []);
    return (
        <View style={isDarkTheme ? style.containerDark : style.container}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 40, flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign onPress={() => router.push('/driver/home/msg')} name="arrowleft" size={24} color={isDarkTheme ? 'white' : 'black'}/>
                <Text style={{ color: isDarkTheme ? 'white' : 'black', marginLeft: 20 }}>{driverName || 'Unknown'}</Text>
            </View>

            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                ref={flatListRef}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const displayMessage = typeof item.message === 'string' ? item.message : JSON.stringify(item.message);

                    return (
                        <View style={{ alignSelf: item?.senderRole === 'rider' ? 'flex-end' : 'flex-start', backgroundColor: item?.senderRole === 'rider' ? '#2666CF' : '#e0e0e0',padding: 10, borderRadius: 10, marginVertical: 5, marginHorizontal: 10, maxWidth: '80%',}}>
                            <Text style={{ color: item?.senderRole === 'rider' ? 'white' : 'black' }}>{displayMessage}</Text>
                        </View>
                    );
                }}
            />

            {/* Input Field */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: isDarkTheme ? '#333' : '#fff' }}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                    placeholderTextColor={isDarkTheme ? '#888' : '#aaa'}
                    style={{
                        flex: 1,
                        height: 40,
                        borderColor: isDarkTheme ? '#555' : '#ccc',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        color: isDarkTheme ? 'white' : 'black',
                    }}
                />

                <TouchableOpacity onPress={handleSendMessage} style={{ marginLeft: 10, backgroundColor: '#2666CF', borderRadius: 10, padding: 10 }}>
                    <Ionicons name="send" size={14} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Messages;
