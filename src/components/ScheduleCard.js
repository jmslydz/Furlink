import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const ScheduleCard = ({schedule, onToggle, onEdit, onDelete}) => {
  const time = schedule.time || '--:--';
  const amount = schedule.amount || 1;
  const activeDays = schedule.days || [];

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.timeRow}>
          <Text style={styles.timeIcon}>⏰</Text>
          <View>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.amount}>{amount} serving{amount !== 1 ? 's' : ''}</Text>
          </View>
        </View>
        <Switch
          value={schedule.enabled}
          onValueChange={(v) => onToggle && onToggle(schedule.id, v)}
          trackColor={{false: COLORS.divider, true: COLORS.primary + '40'}}
          thumbColor={schedule.enabled ? COLORS.primary : COLORS.textTertiary}
        />
      </View>

      <View style={styles.daysRow}>
        {DAYS.map((d, i) => (
          <View key={i} style={[styles.day, activeDays.includes(i) && styles.dayActive]}>
            <Text style={[styles.dayText, activeDays.includes(i) && styles.dayTextActive]}>{d}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit && onEdit(schedule)}>
          <Text style={styles.actionIcon}>✏️</Text>
          <Text style={styles.actionLabel}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => onDelete && onDelete(schedule.id)}>
          <Text style={styles.actionIcon}>🗑️</Text>
          <Text style={[styles.actionLabel, {color: COLORS.danger}]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.paddingSm,
    marginBottom: SIZES.marginSm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  top: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  timeRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
  timeIcon: {fontSize: 22},
  time: {fontSize: SIZES.fontXl, fontWeight: '700', color: COLORS.text},
  amount: {fontSize: SIZES.fontXs, color: COLORS.textTertiary, marginTop: 1},
  daysRow: {
    flexDirection: 'row', gap: 5, marginTop: SIZES.marginSm, paddingTop: SIZES.marginSm, borderTopWidth: 1, borderTopColor: COLORS.divider,
  },
  day: {
    width: 32, height: 26, borderRadius: 6,
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center',
  },
  dayActive: {backgroundColor: COLORS.primary},
  dayText: {fontSize: 10, fontWeight: '600', color: COLORS.textTertiary},
  dayTextActive: {color: COLORS.textWhite},
  actions: {
    flexDirection: 'row', gap: 8, marginTop: SIZES.marginSm, paddingTop: SIZES.marginSm, borderTopWidth: 1, borderTopColor: COLORS.divider,
  },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radiusXs,
  },
  actionIcon: {fontSize: 12},
  actionLabel: {fontSize: SIZES.fontXs, fontWeight: '500', color: COLORS.textSecondary},
  deleteBtn: {backgroundColor: COLORS.danger + '08'},
});

export default ScheduleCard;
