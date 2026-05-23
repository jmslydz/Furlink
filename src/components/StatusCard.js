import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const StatusCard = ({title, value, icon, status, onPress, color}) => {
  const statusColor = getStatusColor(status);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}>
      <View style={[styles.indicator, {backgroundColor: statusColor}]} />
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, {color: color || COLORS.text}]}>{value}</Text>
      </View>
      {status && <View style={[styles.badge, {backgroundColor: statusColor + '18'}]}>
        <Text style={[styles.badgeText, {color: statusColor}]}>{getStatusLabel(status)}</Text>
      </View>}
    </TouchableOpacity>
  );
};

function getStatusColor(status) {
  switch (status) {
    case 'normal': case 'full': case 'online': case 'connected': return COLORS.success;
    case 'warning': case 'low': case 'moderate': return COLORS.warning;
    case 'danger': case 'empty': case 'offline': case 'detected': return COLORS.danger;
    default: return COLORS.textTertiary;
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'normal': return 'OK';
    case 'full': return 'Full';
    case 'low': return 'Low';
    case 'empty': return 'Empty';
    case 'detected': return 'Alert';
    case 'online': return 'On';
    case 'offline': return 'Off';
    case 'connected': return 'On';
    case 'warning': return 'Low';
    default: return status || '--';
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.paddingSm + 4,
    marginBottom: SIZES.marginSm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  indicator: {
    width: 3,
    height: 32,
    borderRadius: 2,
    marginRight: SIZES.paddingSm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.paddingSm,
  },
  icon: {fontSize: 18},
  content: {flex: 1},
  title: {
    fontSize: SIZES.fontXs,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: SIZES.fontXs,
    fontWeight: '600',
  },
});

export default StatusCard;
