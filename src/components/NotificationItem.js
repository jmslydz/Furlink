import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const ICONS = {
  low_food: '🍽️', low_water: '💧', waste_detected: '💩',
  battery_low: '🔋', feeding: '🍗', system: '⚙️', offline: '📡',
};

const COLORS_MAP = {
  low_food: COLORS.food, low_water: COLORS.water, waste_detected: COLORS.waste,
  battery_low: COLORS.danger, feeding: COLORS.success, system: COLORS.info, offline: COLORS.offline,
};

const NotificationItem = ({notification, onPress}) => {
  const type = notification.type || 'system';
  const typeColor = COLORS_MAP[type] || COLORS.primary;
  const icon = ICONS[type] || '🔔';

  const timeAgo = (ts) => {
    if (!ts) return '';
    const diff = Date.now() - (typeof ts === 'number' ? ts : new Date(ts).getTime());
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, !notification.read && styles.unread]}
      onPress={() => onPress && onPress(notification)}
      activeOpacity={0.6}>
      <View style={[styles.iconWrap, {backgroundColor: typeColor + '12'}]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, !notification.read && styles.titleUnread]} numberOfLines={1}>
          {notification.title || 'Notification'}
        </Text>
        <Text style={styles.msg} numberOfLines={2}>{notification.message}</Text>
        <Text style={styles.time}>{timeAgo(notification.timestamp)}</Text>
      </View>
      {!notification.read && <View style={[styles.dot, {backgroundColor: typeColor}]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.paddingSm,
    marginBottom: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  unread: {
    borderColor: COLORS.primary,
    borderLeftWidth: 3,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.paddingSm,
  },
  icon: {fontSize: 18},
  content: {flex: 1},
  title: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
    color: COLORS.text,
  },
  titleUnread: {
    fontWeight: '700',
  },
  msg: {
    fontSize: SIZES.fontXs,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  time: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default NotificationItem;
