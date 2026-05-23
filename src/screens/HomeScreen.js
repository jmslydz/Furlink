import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {useAuth} from '../context/AuthContext';
import StatusCard from '../components/StatusCard';
import FeedButton from '../components/FeedButton';
import LevelIndicator from '../components/LevelIndicator';

const HomeScreen = ({navigation}) => {
  const {user, isOffline, setIsOffline} = useAuth();
  const [data, setData] = useState({
    foodLevel: 68, waterLevel: 45, temperature: 27, humidity: 62,
    battery: 81, wasteDetected: false, lastFed: '2h ago', dogPresent: true,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [feeding, setFeeding] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('--:--:--');

  const tick = useCallback(() => {
    setData((p) => ({
      ...p,
      foodLevel: Math.max(5, +(p.foodLevel - Math.random() * 1.5).toFixed(1)),
      waterLevel: Math.max(5, +(p.waterLevel - Math.random() * 1).toFixed(1)),
      battery: Math.max(5, +(p.battery - Math.random() * 0.3).toFixed(1)),
      temperature: +(26 + Math.random() * 4).toFixed(1),
      humidity: +(55 + Math.random() * 18).toFixed(1),
    }));
    setLastUpdate(new Date().toLocaleTimeString('en-PH', {hour: '2-digit', minute: '2-digit', second: '2-digit'}));
  }, []);

  useEffect(() => {const i = setInterval(tick, 3000); return () => clearInterval(i);}, [tick]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    tick();
    setTimeout(() => setRefreshing(false), 1200);
  }, [tick]);

  const handleFeed = async () => {
    setFeeding(true);
    await new Promise((r) => setTimeout(r, 2000));
    setData((p) => ({...p, foodLevel: Math.min(100, p.foodLevel + 15), lastFed: 'now'}));
    setFeeding(false);
  };

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  })();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}><Text style={styles.avatarIcon}>🐕</Text></View>
            <View>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.name}>{user?.displayName || 'Pet Owner'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.statusPill} onPress={() => navigation.navigate('DeviceStatus')}>
            <View style={[styles.statusDot, {backgroundColor: isOffline ? COLORS.offline : COLORS.success}]} />
            <Text style={[styles.statusText, {color: isOffline ? COLORS.offline : COLORS.success}]}>
              {isOffline ? 'Offline' : 'Online'}
            </Text>
          </TouchableOpacity>
        </View>

        {isOffline && (
          <View style={[styles.banner, {backgroundColor: COLORS.offline + '08'}]}>
            <Text style={styles.bannerIcon}>📡</Text>
            <Text style={[styles.bannerText, {color: COLORS.offline}]}>Device offline — showing last known data</Text>
          </View>
        )}

        {data.wasteDetected && (
          <View style={[styles.banner, {backgroundColor: COLORS.waste + '08', borderLeftColor: COLORS.waste}]}>
            <Text style={styles.bannerIcon}>💩</Text>
            <View style={{flex: 1}}>
              <Text style={[styles.bannerText, {color: COLORS.waste, fontWeight: '600'}]}>Waste detected in the cage</Text>
              <Text style={[styles.bannerText, {color: COLORS.textSecondary, fontSize: 12}]}>Please clean it when possible</Text>
            </View>
          </View>
        )}

        <FeedButton onPress={handleFeed} loading={feeding} disabled={isOffline} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resource Levels</Text>
          <Text style={styles.sectionSub}>{lastUpdate}</Text>
        </View>

        <View style={styles.card}>
          <LevelIndicator level={data.foodLevel} label="Food Container" icon="🍽️" color={COLORS.food} showPercentage />
          <LevelIndicator level={data.waterLevel} label="Water Supply" icon="💧" color={COLORS.water} showPercentage />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status</Text>
        </View>

        <StatusCard title="Temperature" value={`${data.temperature}°C`} icon="🌡️" status={data.temperature > 32 ? 'warning' : 'normal'} onPress={() => navigation.navigate('DeviceStatus')} />
        <StatusCard title="Humidity" value={`${Math.round(data.humidity)}%`} icon="💨" status={data.humidity > 80 ? 'warning' : 'normal'} onPress={() => navigation.navigate('DeviceStatus')} />
        <StatusCard
          title="Battery"
          value={`${Math.round(data.battery)}%`}
          icon="🔋"
          status={data.battery <= 15 ? 'danger' : data.battery <= 30 ? 'warning' : 'normal'}
          color={data.battery <= 15 ? COLORS.danger : data.battery <= 30 ? COLORS.warning : COLORS.battery}
          onPress={() => navigation.navigate('DeviceStatus')}
        />
        <StatusCard title="Last Fed" value={data.lastFed} icon="🍗" status="normal" onPress={() => navigation.navigate('ScheduleTab')} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickRow}>
          {[
            {icon: '📷', label: 'Live View', screen: 'MonitorTab'},
            {icon: '⏰', label: 'Schedule', screen: 'ScheduleTab'},
            {icon: '🔔', label: 'Alerts', screen: 'NotificationsTab'},
            {icon: '⚙️', label: 'Device', screen: 'DeviceStatus'},
          ].map(({icon, label, screen}) => (
            <TouchableOpacity key={screen} style={styles.quickBtn} onPress={() => navigation.navigate(screen)}>
              <Text style={styles.quickIcon}>{icon}</Text>
              <Text style={styles.quickLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  content: {padding: SIZES.padding, paddingBottom: 100},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding},
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  avatar: {width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primary + '12', justifyContent: 'center', alignItems: 'center'},
  avatarIcon: {fontSize: 22},
  greeting: {fontSize: SIZES.fontXs, color: COLORS.textTertiary},
  name: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text, marginTop: 1},
  statusPill: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.cardBorder},
  statusDot: {width: 6, height: 6, borderRadius: 3},
  statusText: {fontSize: SIZES.fontXs, fontWeight: '600'},
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 12, borderRadius: SIZES.radiusXs, marginBottom: SIZES.margin,
    borderLeftWidth: 3, borderLeftColor: COLORS.offline,
  },
  bannerIcon: {fontSize: 18},
  bannerText: {fontSize: SIZES.fontSm, flex: 1},
  sectionHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SIZES.padding, marginBottom: SIZES.marginSm},
  sectionTitle: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text},
  sectionSub: {fontSize: SIZES.fontXs, color: COLORS.textTertiary},
  card: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.paddingSm, borderWidth: 1, borderColor: COLORS.cardBorder},
  quickRow: {flexDirection: 'row', gap: 10},
  quickBtn: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm,
    padding: SIZES.paddingSm, alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  quickIcon: {fontSize: 22, marginBottom: 6},
  quickLabel: {fontSize: SIZES.fontXs, color: COLORS.text, fontWeight: '600'},
});

export default HomeScreen;
