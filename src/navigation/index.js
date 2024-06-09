import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Features from '../components/features';
import InputScreen from '../screens/InputScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Welcome'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Features" component={Features} />
                <Stack.Screen name="Input" component={InputScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;