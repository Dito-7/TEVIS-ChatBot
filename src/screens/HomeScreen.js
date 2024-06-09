import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, PermissionsAndroid, NativeEventEmitter, NativeModules } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/features';
import { dummyMessage } from '../constants';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAi';

const { VoiceModule } = NativeModules;
const voiceEmitter = new NativeEventEmitter(VoiceModule);

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessage);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [result, setResult] = useState('');
    const [Loading, setLoading] = useState(false);
    const ScrollViewRef = useRef();

    const SpeechStartHandler = (e) => {
        console.log('Speech Start Handler', e);
    };

    const SpeechEndHandler = (e) => {
        setRecording(false);
        console.log('Speech End Handler', e);
    };

    const SpeechResultsHandler = (e) => {
        console.log('Voice event: ', e);
        if (e.value && e.value.length > 0) {
            const text = e.value[0];
            setResult(text);
            setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);
        }
    };

    const SpeechErrorHandler = (e) => {
        console.log('Speech Error Handler: ', e);
    };

    const startRecording = async () => {
        console.log('Start recording...');
        setRecording(true);
        try {
            await Voice.start('en-GB');
        } catch (error) {
            console.log('error: ', error);
            setRecording(false);
        }
    };

    const stopRecording = async () => {
        console.log('Stop recording...');
        try {
            await Voice.stop();
            setRecording(false);

            //fetch response
            fetchResponse();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const fetchResponse = async () => {
        // const response = await apiCall(result);
        // setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response.data.choices[0].message.content }]);
        if (result.trim().length > 0) {
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: result });
            setMessages([...newMessages]);

            apiCall(result).then(response => {
                console.log('got Api Data: ', response);
            })
        }
    }

    const clear = () => {
        setMessages([]);
    };

    const stopSpeaking = () => {
        setSpeaking(false);
    };

    const updateScrollView = () => {
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }
    const requestMicrophonePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'This app needs access to your microphone to recognize speech.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the microphone');
            } else {
                console.log('Microphone permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestMicrophonePermission();

        const startListener = voiceEmitter.addListener('onSpeechStart', SpeechStartHandler);
        const endListener = voiceEmitter.addListener('onSpeechEnd', SpeechEndHandler);
        const resultsListener = voiceEmitter.addListener('onSpeechResults', SpeechResultsHandler);
        const errorListener = voiceEmitter.addListener('onSpeechError', SpeechErrorHandler);

        return () => {
            startListener.remove();
            endListener.remove();
            resultsListener.remove();
            errorListener.remove();
        };
    }, []);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/Telkom.png')} style={{ width: hp(25), height: hp(20) }} />
                </View>
                {messages.length > 0 ? (
                    <View className="flex-1 space-y-2">
                        <Text style={{ fontSize: wp(1) }} className="font-semibold text-gray-700 ml-1"></Text>
                        <View style={{ height: hp(58) }} className="bg-neutral-200 rounded-3xl p-4">
                            <ScrollView
                                ref={ScrollViewRef}
                                bounces={false} className="space-y-4" showsVerticalScrollIndicator={false}>
                                {messages.map((message, index) => {
                                    if (message.role === 'assistant') {
                                        if (message.content.includes('https')) {
                                            return (
                                                <View key={index} className="justify-start flex-row">
                                                    <View className="p-2 rounded-2xl bg-emerald-100 rounded-tl-none">
                                                        <Image
                                                            source={{ uri: message.content }}
                                                            className="rounded-2xl"
                                                            resizeMode="contain"
                                                            style={{ height: wp(60), width: wp(60) }}
                                                        />
                                                    </View>
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <View key={index} style={{ height: wp(10) }} className="bg-emerald-100 rounded-xl p-2 rounded-tl-none">
                                                    <Text className="text-gray-700">{message.content}</Text>
                                                </View>
                                            );
                                        }
                                    } else {
                                        return (
                                            <View key={index} className="flex-row justify-end">
                                                <View style={{ height: wp(10) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                                                    <Text className="text-gray-700">{message.content}</Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <Features />
                )}
                <View className="flex justify-center items-center pb-7">
                    {recording ? (
                        <TouchableOpacity onPress={stopRecording} className="border border-gray-900 rounded-full">
                            {/* recording stop */}
                            <Image
                                className="rounded-full"
                                source={require('../../assets/images/mic-gif.gif')}
                                style={{ height: hp(10), width: hp(10) }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={startRecording} className="border border-gray-900 rounded-full">
                            {/* recording start */}
                            <Image
                                className="rounded-full"
                                source={require('../../assets/images/mic.png')}
                                style={{ height: hp(10), width: hp(10) }}
                            />
                        </TouchableOpacity>
                    )}
                    {messages.length > 0 && (
                        <TouchableOpacity onPress={clear} className="bg-neutral-400 rounded-3xl absolute right-10 p-3">
                            <Text className="text-white font-semibold">Clear</Text>
                        </TouchableOpacity>
                    )}
                    {speaking && (
                        <TouchableOpacity onPress={stopSpeaking} className="bg-red-400 rounded-3xl absolute left-10 p-3">
                            <Text className="text-white font-semibold">Stop</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}