import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Features() {
    const navigation = useNavigation();

    return (
        // <View className="flex-1 bg-white">
        //     <SafeAreaView className="flex-1 flex mx-5">
        //         <View className="flex-row justify-center">
        //             <Image source={require('../../assets/images/Telkom.png')} style={{ width: hp(25), height: hp(20) }} />
        //         </View>
        <View style={{ height: hp(60) }} className="space-y-4">
            <Text style={{ fontSize: wp(6.5) }} className="font-semibold text-gray-700">Features</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
                    <View className="flex-row items-center space-x-1">
                        <Image source={require('../../assets/images/chat-gpt.png')} style={{ width: hp(4), height: hp(4) }} />
                        <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray700">Chat Gpt
                        </Text>
                    </View>
                    <Text style={{ fontSize: wp(3.8) }} className="font-medium text-gray700">
                        ChatGPT is a chatbot and virtual assistant developed by OpenAI.
                    </Text>
                </View>
            </TouchableOpacity>

            <View className="bg-purple-200 p-4 rounded-xl space-y-2">
                <TouchableOpacity onPress={() => navigation.navigate('Input')}>

                    <View className="flex-row items-center space-x-1">
                        <Image source={require('../../assets/images/dall-e.png')} style={{ width: hp(4), height: hp(4) }} />

                        <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray700">DALL-E
                        </Text>
                    </View>
                    <Text style={{ fontSize: wp(3.8) }} className="font-medium text-gray700">
                        are text-to-image models developed by OpenAI using deep learning methodologies to generate digital images from natural language descriptions known as "prompts".
                    </Text>
                </TouchableOpacity>

            </View>

            <View className="bg-blue-200 p-4 rounded-xl space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assets/images/smart-ai.png')} style={{ width: hp(4), height: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray700">Smart AI
                    </Text>
                </View>
                <Text style={{ fontSize: wp(3.8) }} className="font-medium text-gray700">
                    A powerful voice assistant with the abilities of Chat Gpt and DALL-E.
                </Text>
            </View>
        </View>
        //     </SafeAreaView>
        // </View>
    )
}