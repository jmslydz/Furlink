import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import NotificationItem from '../components/NotificationItem';

const FILTERS = [
  {key: 'all', label: 'All', icon: '🔔'},
  {key: 'unread', label: 'Unread', icon: '🆕'},
  {key: 'low_food', label: 'Food', icon: '🍽️'},
  {key: 'low_water', label: 'Water', icon: '💧'},
  {key: 'waste_detected', label: 'Waste', icon: '💩'},
  {key: 'battery_low', label: 'Battery', icon: '🔋'},
];

const NotificationsScreen = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {id: '1', type: 'low_food', title: 'Low Food', message: 'Food container is at 15%. Please refill soon.', timestamp: Date.now() - 900000, read: false},
    {id: '2', type: 'waste_detected', title: 'Waste Detected', message: 'Sensor detected waste in the cage area.', timestamp: Date.now() - 2700000, read: false},
    {id: '3', type: 'feeding', title: 'Feeding Complete', message: 'Your dog was fed 1.5 servings at 7:00 AM.', timestamp: Date.now() - 7200000, read: true},
    {id: '4', type: 'battery_low', title: 'Battery Warning', message: 'Device battery at 18%. Please charge the system.', timestamp: Date.now() - 10800000, read: true},
    {id: '5', type: 'low_water', title: 'Low Water', message: 'Water level is at 30%. Refill soon.', timestamp: Date.now() - 14400000, read: true},
    {id: '6', type: 'feeding', title: 'Manual Feeding', message: 'You dispensed 1 serving via the app.', timestamp: Date.now() - 28800000, read: true},
    {id: '7', type: 'system', title: 'Device Connected', message: 'IoT dog cage system connected to Wi-Fi.', timestamp: Date.now() - 86400000, read: true},
  ]);

  const unread = notifications.filter((n) => !n.read).length;

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.type === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.sub}>{unread > 0 ? `${unread} unread` : 'All caught up!'}</Text>
        </View>
        {unread > 0 && (
          <TouchableOpacity style={styles.markBtn} onPress={() => setNotifications((p) => p.map((n) => ({...n, read: true})))}>
            <Text style={styles.markBtnText}>Mark Read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[styles.filterChip, filter === f.key && styles.filterChipActive]} onPress={() => setFilter(f.key)}>
            <Text style={styles.filterIcon}>{f.icon}</Text>
            <Text style={[styles.filterLabel, filter === f.key && styles.filterLabelActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>{filter === 'unread' ? 'All notifications read!' : 'Nothing here yet'}</Text>
          </View>
        ) : filtered.map((n) => (
          <NotificationItem key={n.id} notification={n} onPress={(notification) => setNotifications((p) => p.map((x) => x.id === notification.id ? {...x, read: true} : x))} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: SIZES.padding, paddingBottom: SIZES.marginSm},
  title: {fontSize: 24, fontWeight: '700', color: COLORS.text, letterSpacing: -0.3},
  sub: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 2},
  markBtn: {backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 7, borderRadius: SIZES.radiusXs},
  markBtnText: {fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.textWhite},
  filterRow: {maxHeight: 40, marginBottom: SIZES.margin},
  filterContent: {paddingHorizontal: SIZES.padding, gap: 6},
  filterChip: {flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: COLORS.cardBorder},
  filterChipActive: {backgroundColor: COLORS.primary, borderColor: COLORS.primary},
  filterIcon: {fontSize: 13},
  filterLabel: {fontSize: SIZES.fontXs, fontWeight: '500', color: COLORS.text},
  filterLabelActive: {color: COLORS.textWhite, fontWeight: '700'},
  list: {padding: SIZES.padding, paddingTop: 0, paddingBottom: 100},
  empty: {alignItems: 'center', paddingTop: 60},
  emptyIcon: {fontSize: 48, opacity: 0.4},
  emptyTitle: {fontSize: SIZES.fontMd, fontWeight: '600', color: COLORS.text, marginTop: 10},
  emptyText: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4},
});

export default NotificationsScreen;
