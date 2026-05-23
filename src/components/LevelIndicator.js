import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const LevelIndicator = ({level, label, icon, color, showPercentage}) => {
  const pct = Math.min(Math.max(level, 0), 100);
  const barColor = pct > 50 ? (color || COLORS.success) : pct > 20 ? COLORS.warning : COLORS.danger;
  const trackColor = barColor + '15';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.pct, {color: barColor}]}>
          {showPercentage ? `${Math.round(pct)}%` : labelFor(pct)}
        </Text>
      </View>
      <View style={[styles.track, {backgroundColor: trackColor}]}>
        <View style={[styles.bar, {width: `${pct}%`, backgroundColor: barColor}]} />
      </View>
    </View>
  );
};

function labelFor(pct) {
  if (pct <= 10) return 'Empty';
  if (pct <= 25) return 'Low';
  if (pct <= 60) return 'Moderate';
  return 'Full';
}

const styles = StyleSheet.create({
  container: {marginBottom: SIZES.marginSm},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {fontSize: 14, marginRight: 6, opacity: 0.7},
  label: {
    flex: 1,
    fontSize: SIZES.fontSm,
    color: COLORS.text,
    fontWeight: '500',
  },
  pct: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default LevelIndicator;
