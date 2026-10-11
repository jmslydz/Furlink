import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import ScreenIntro from '../components/ScreenIntro';

const DeviceStatusScreen = ({navigation}) => {
  const device = {name: 'Furlink Cage', model: 'Raspberry Pi 4', firmware: 'Not connected', ip: 'Not available', wifi: 'Not verified', uptime: 'Not available'};
  const sensors = ['Food level','Water level','Waste detection','Temperature','Humidity','Battery','Camera'].map(name=>({name,icon:'◦',sensor:'Not connected',ok:false}));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenIntro title="Device Status" subtitle="Raspberry Pi 4 overview" /><View style={styles.card}><Text style={styles.detailLabel}>Hardware status unavailable — connect and verify Raspberry Pi telemetry.</Text></View>

        <View style={styles.card}>
          <View style={styles.deviceHeader}>
            <Text style={styles.deviceIcon}>🏠</Text>
            <View>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceId}>Raspberry Pi 4</Text>
            </View>
          </View>
          {[
            ['Model', device.model], ['Firmware', device.firmware], ['IP', device.ip], ['Wi-Fi', device.wifi], ['Uptime', device.uptime],
          ].map(([l, v]) => (
            <View key={l} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{l}</Text>
              <Text style={styles.detailValue}>{v}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sensor Modules</Text>
        {sensors.map((s, i) => (
          <View key={i} style={styles.sensorItem}>
            <View style={styles.sensorLeft}>
              <Text style={styles.sensorIcon}>{s.icon}</Text>
              <View>
                <Text style={styles.sensorName}>{s.name}</Text>
                <Text style={styles.sensorType}>{s.sensor}</Text>
              </View>
            </View>
            <View style={[styles.sensorBadge, {backgroundColor: s.ok ? COLORS.success + '12' : COLORS.warning + '12'}]}>
              <Text style={[styles.sensorBadgeText, {color: s.ok ? COLORS.success : COLORS.warning}]}>Not verified</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Commands</Text><View style={styles.card}><Text style={styles.detailLabel}>Hardware commands are disabled until authenticated device integration and acknowledgement are implemented.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  content: {padding: SIZES.padding, paddingBottom: 100},
  connRow: {flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.card, paddingVertical: 12, marginBottom: SIZES.margin, borderWidth: 1, borderColor: COLORS.cardBorder, borderRadius: SIZES.radiusSm},
  connItem: {flexDirection: 'row', alignItems: 'center', gap: 6},
  connDot: {width: 6, height: 6, borderRadius: 3},
  connLabel: {fontSize: SIZES.fontXs, color: COLORS.text, fontWeight: '500'},
  connWifi: {fontSize: 14},
  card: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.paddingSm, borderWidth: 1, borderColor: COLORS.cardBorder, marginBottom: SIZES.margin},
  deviceHeader: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: SIZES.marginSm, paddingBottom: SIZES.marginSm, borderBottomWidth: 1, borderBottomColor: COLORS.divider},
  deviceIcon: {fontSize: 28},
  deviceName: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text},
  deviceId: {fontSize: SIZES.fontXs, color: COLORS.textTertiary, marginTop: 1},
  detailRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.divider},
  detailLabel: {fontSize: SIZES.fontSm, color: COLORS.textTertiary},
  detailValue: {fontSize: SIZES.fontSm, color: COLORS.text, fontWeight: '500'},
  sectionTitle: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text, marginBottom: SIZES.marginSm, marginTop: SIZES.margin},
  sensorItem: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.card, padding: SIZES.paddingSm, marginBottom: 1, borderBottomWidth: 1, borderBottomColor: COLORS.divider, borderRadius: 1},
  sensorLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
  sensorIcon: {fontSize: 20},
  sensorName: {fontSize: SIZES.fontSm, fontWeight: '500', color: COLORS.text},
  sensorType: {fontSize: 10, color: COLORS.textTertiary, marginTop: 1},
  sensorBadge: {paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6},
  sensorBadgeText: {fontSize: 10, fontWeight: '700'},
  cmdRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  cmdBtn: {width: '47%', backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.paddingSm, alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder},
  cmdBtnDanger: {borderColor: COLORS.danger + '30'},
  cmdIcon: {fontSize: 24, marginBottom: 6},
  cmdLabel: {fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.text},
});

export default DeviceStatusScreen;
