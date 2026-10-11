import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import CameraFeed from '../components/CameraFeed';

const LiveMonitorScreen = () => {
  const [key, setKey] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Live Monitor</Text>
        <Text style={styles.sub}>Raspberry Pi 4 camera · connection pending</Text>

        <CameraFeed key={key} isOffline onRefresh={() => setKey((k) => k + 1)} />

        <View style={styles.card}><Text style={styles.guideText}>Sensor readings are unavailable until the Raspberry Pi is connected.</Text></View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Camera Info</Text>
          {[
            ['Device', 'Raspberry Pi 4 camera'],
            ['Resolution', 'Not configured'],
            ['Stream', 'Not connected'],
          ].map(([label, value]) => (
            <View key={label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{label}</Text>
              <Text style={styles.infoValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Setup Guide</Text>
          <Text style={styles.guideText}>
            Connect the Raspberry Pi 4 camera to a secure stream service. The app must be configured and authenticated before video can appear.
          </Text>
          <Text style={styles.guideText}>Camera configuration is not implemented yet.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  content: {padding: SIZES.padding, paddingBottom: 100},
  title: {fontSize: 24, fontWeight: '700', color: COLORS.text, letterSpacing: -0.3},
  sub: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4, marginBottom: SIZES.padding},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: SIZES.margin},
  envCard: {
    width: '47%', backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm,
    padding: SIZES.paddingSm, alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  envIcon: {fontSize: 24, marginBottom: 6},
  envValue: {fontSize: SIZES.fontXl, fontWeight: '700', color: COLORS.text},
  envLabel: {fontSize: SIZES.fontXs, color: COLORS.textTertiary, marginTop: 2},
  envBadge: {backgroundColor: COLORS.success + '12', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6, marginTop: 6},
  envBadgeText: {fontSize: 10, fontWeight: '600', color: COLORS.success},
  card: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.paddingSm, borderWidth: 1, borderColor: COLORS.cardBorder, marginBottom: SIZES.margin},
  cardTitle: {fontSize: SIZES.fontMd, fontWeight: '600', color: COLORS.text, marginBottom: SIZES.marginSm},
  infoRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.divider},
  infoLabel: {fontSize: SIZES.fontSm, color: COLORS.textTertiary},
  infoValue: {fontSize: SIZES.fontSm, color: COLORS.text, fontWeight: '500'},
  guideText: {fontSize: SIZES.fontSm, color: COLORS.textSecondary, lineHeight: 20},
  guideBtn: {marginTop: SIZES.marginSm, backgroundColor: COLORS.primary, paddingVertical: 10, borderRadius: SIZES.radiusXs, alignItems: 'center'},
  guideBtnText: {fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textWhite},
});

export default LiveMonitorScreen;
