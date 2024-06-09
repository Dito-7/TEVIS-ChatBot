import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, PermissionsAndroid, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/features';
import { apiCall } from '../api/openAi';
import { dummyMessage } from '../constants';

export default function InputScreen() {
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');
    const ScrollViewRef = useRef();

    const [responseContent, setResponseContent] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchResponse = async () => {
        if (textInput.trim().length > 0) {
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: textInput });
            setMessages(newMessages);

            setLoading(true); // Menandai bahwa sedang memuat respons
            apiCall(textInput)
                .then(response => {
                    console.log('got Api Data: ', response);
                    setLoading(false); // Respons telah diterima, tidak lagi dalam proses memuat
                    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
                        newMessages.push({ role: 'assistant', content: response.data.choices[0].message.content });
                        setMessages(newMessages);
                        setResponseContent(response.data.choices[0].message.content);
                    }
                })
                .catch(error => {
                    console.error('Error fetching response:', error);
                    setLoading(false); // Menghentikan status memuat jika terjadi kesalahan
                });
            setTextInput(''); // Clear text input after sending message
        }
    };
    const clearMessages = () => {
        setMessages([]); // Clear messages
    };

    const updateScrollView = () => {
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/Telkom.png')} style={{ width: hp(25), height: hp(20) }} />
                </View>

                <View style={{ flex: 1, marginBottom: 10 }}>
                    <Text style={{ fontSize: wp(1), fontWeight: 'bold', color: 'gray', marginLeft: 1 }}></Text>

                    {messages.length > 0 && (
                        <View style={{ height: hp(58), backgroundColor: '#E5E7EB', borderRadius: 20, padding: 10 }}>
                            <ScrollView
                                ref={ScrollViewRef}
                                bounces={false}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingVertical: 10 }}
                                showsVerticalScrollIndicator={false}>
                                {messages.map((message, index) => (
                                    <View key={index} style={{ alignItems: message.role === 'assistant' ? 'flex-start' : 'flex-end' }}>
                                        <View style={{ backgroundColor: message.role === 'assistant' ? '#6EE7B7' : 'white', borderRadius: 20, padding: 10, marginTop: 5 }}>
                                            <Text style={{ color: message.role === 'assistant' ? 'black' : 'gray' }}>{message.content}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                    <TextInput
                        value={textInput}
                        onChangeText={setTextInput}
                        placeholder="Type your message here"
                        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10, width: '80%', marginBottom: 10 }}
                    />
                    <TouchableOpacity onPress={fetchResponse} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white' }}>Send</Text>
                    </TouchableOpacity>
                    {messages.length > 0 && (
                        <TouchableOpacity onPress={clearMessages} style={{ backgroundColor: '#4B5563', borderRadius: 20, padding: 10, position: 'absolute', top: 20, right: 10 }}>
                            <Text style={{ color: 'white' }}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
