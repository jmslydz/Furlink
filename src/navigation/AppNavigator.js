import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from '../context/AuthContext';
import {COLORS, SIZES} from '../constants/theme';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LiveMonitorScreen from '../screens/LiveMonitorScreen';
import FeedingScheduleScreen from '../screens/FeedingScheduleScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DeviceStatusScreen from '../screens/DeviceStatusScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({icon, focused}) => (
  <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 4}}>
    <Text style={{fontSize: 20, opacity: focused ? 1 : 0.35}}>{icon}</Text>
  </View>
);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 12, left: 12, right: 12,
        height: 56,
        backgroundColor: COLORS.card,
        borderRadius: 14,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 4,
        borderWidth: 1,
        borderColor: COLORS.cardBorder,
      },
      tabBarShowLabel: false,
    }}>
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="🏠" focused={focused} />}} />
    <Tab.Screen name="MonitorTab" component={LiveMonitorScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="📷" focused={focused} />}} />
    <Tab.Screen name="ScheduleTab" component={FeedingScheduleScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="⏰" focused={focused} />}} />
    <Tab.Screen name="NotificationsTab" component={NotificationsScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="🔔" focused={focused} />}} />
    <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="⚙️" focused={focused} />}} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.splash}>
        <Text style={{fontSize: 60, marginBottom: 16}}>🐕</Text>
        <Text style={{fontSize: 26, fontWeight: '800', color: COLORS.text}}>Smart Dog Care</Text>
        <Text style={{fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4}}>IoT Dog Cage Monitoring</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 40}} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: COLORS.background}}}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={HomeTabs} />
            <Stack.Screen name="DeviceStatus" component={DeviceStatusScreen}
              options={{
                headerShown: true,
                headerTitle: 'Device Status',
                headerStyle: {backgroundColor: COLORS.background},
                headerTintColor: COLORS.text,
                headerTitleStyle: {fontWeight: '700'},
                headerShadowVisible: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen}
              options={{
                headerShown: true,
                headerTitle: 'Create Account',
                headerStyle: {backgroundColor: COLORS.background},
                headerTintColor: COLORS.text,
                headerTitleStyle: {fontWeight: '700'},
                headerShadowVisible: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default AppNavigator;
