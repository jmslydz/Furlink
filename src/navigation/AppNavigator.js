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
import CleaningScreen from '../screens/CleaningScreen';
import PupIllustration from '../components/PupIllustration';
import DispenseScreen from '../screens/DispenseScreen';
import {ModeProvider} from '../context/ModeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({icon, focused}) => (
  <Icon name={icon} size={22} color={focused ? COLORS.primaryDark : COLORS.textTertiary} />
);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 12, left: 12, right: 12,
        height: 64,
        backgroundColor: COLORS.card,
        borderRadius: 22,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 4,
        borderWidth: 1,
        borderColor: COLORS.cardBorder,
      },
      tabBarShowLabel: true,
      tabBarActiveTintColor: COLORS.primaryDark,
      tabBarInactiveTintColor: COLORS.textTertiary,
      tabBarLabelStyle: {fontSize: 10, fontWeight: '600'},
    }}>
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="home-outline" focused={focused} />}} />
    <Tab.Screen name="MonitorTab" component={LiveMonitorScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="camera-outline" focused={focused} />}} />
    <Tab.Screen name="ScheduleTab" component={FeedingScheduleScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="calendar-outline" focused={focused} />}} />
    <Tab.Screen name="NotificationsTab" component={NotificationsScreen} options={{title:'History',tabBarIcon: ({focused}) => <TabIcon icon="time-outline" focused={focused} />}} />
    <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{tabBarIcon: ({focused}) => <TabIcon icon="settings-outline" focused={focused} />}} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.splash}>
        <PupIllustration pose="sleep" size={200} />
        <Text style={{fontSize: 26, fontWeight: '800', color: COLORS.text}}>Furlink</Text>
        <Text style={{fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4}}>IoT Dog Cage Monitoring</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 40}} />
      </View>
    );
  }

  return (
    <ModeProvider><NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: COLORS.background}}}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={HomeTabs} />
            <Stack.Screen name="Feeding" options={{headerShown:false}}>{props=><DispenseScreen {...props} kind="food" />}</Stack.Screen>
            <Stack.Screen name="Water" options={{headerShown:false}}>{props=><DispenseScreen {...props} kind="water" />}</Stack.Screen>
            <Stack.Screen name="CleaningTab" component={CleaningScreen} />
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
    </NavigationContainer></ModeProvider>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default AppNavigator;
