import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const CameraFeed = ({streamUrl, onRefresh, isOffline}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>📷</Text>
          <Text style={styles.headerTitle}>Live Camera</Text>
        </View>
        {isOffline ? (
          <View style={[styles.badge, {backgroundColor: COLORS.offline + '15'}]}>
            <View style={[styles.dot, {backgroundColor: COLORS.offline}]} />
            <Text style={[styles.badgeText, {color: COLORS.offline}]}>Offline</Text>
          </View>
        ) : (
          <View style={[styles.badge, {backgroundColor: '#EF444415'}]}>
            <View style={[styles.dot, {backgroundColor: '#EF4444'}]} />
            <Text style={[styles.badgeText, {color: '#EF4444', letterSpacing: 0.5}]}>LIVE</Text>
          </View>
        )}
      </View>

      <View style={styles.feed}>
        <Text style={styles.feedIcon}>🐕</Text>
        <Text style={styles.feedTitle}>Camera Ready</Text>
        <Text style={styles.feedSub}>
          {streamUrl ? 'Feed will appear here when connected' : 'ESP32-CAM stream URL not configured'}
        </Text>
        <Text style={styles.feedHint}>
          {new Date().toLocaleString('en-PH', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
          {'  •  '}28°C
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.ctrl}>
          <Text style={styles.ctrlIcon}>🔊</Text>
          <Text style={styles.ctrlLabel}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrl}>
          <Text style={styles.ctrlIcon}>📸</Text>
          <Text style={styles.ctrlLabel}>Snapshot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrl, styles.ctrlPrimary]} onPress={onRefresh}>
          <Text style={styles.ctrlIcon}>🔄</Text>
          <Text style={styles.ctrlLabelPrimary}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusSm,
    overflow: 'hidden',
    marginBottom: SIZES.margin,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.paddingSm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 8},
  headerIcon: {fontSize: 18},
  headerTitle: {fontSize: SIZES.fontMd, fontWeight: '600', color: COLORS.text},
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  dot: {width: 6, height: 6, borderRadius: 3},
  badgeText: {fontSize: 10, fontWeight: '700'},
  feed: {
    height: 200,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  feedIcon: {fontSize: 40, marginBottom: 8, opacity: 0.6},
  feedTitle: {fontSize: SIZES.fontMd, fontWeight: '600', color: 'rgba(255,255,255,0.9)'},
  feedSub: {fontSize: SIZES.fontXs, color: 'rgba(255,255,255,0.4)', marginTop: 4, textAlign: 'center'},
  feedHint: {fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 12},
  controls: {
    flexDirection: 'row', justifyContent: 'space-evenly',
    padding: SIZES.paddingSm, borderTopWidth: 1, borderTopColor: COLORS.divider,
  },
  ctrl: {
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6,
  },
  ctrlPrimary: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.radiusXs, paddingHorizontal: 20,
  },
  ctrlIcon: {fontSize: 18},
  ctrlLabel: {fontSize: 10, color: COLORS.textTertiary, marginTop: 3},
  ctrlLabelPrimary: {fontSize: 10, color: COLORS.textWhite, fontWeight: '600', marginTop: 3},
});

export default CameraFeed;
