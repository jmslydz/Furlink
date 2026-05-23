import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const FeedButton = ({onPress, disabled, loading}) => {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled || loading) return;
    Animated.sequence([
      Animated.timing(scale, {toValue: 0.96, duration: 80, useNativeDriver: true}),
      Animated.timing(scale, {toValue: 1, duration: 80, useNativeDriver: true}),
    ]).start();
    setPressed(true);
    if (onPress) onPress();
    setTimeout(() => setPressed(false), 2500);
  };

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        style={[styles.btn, (disabled || loading) && styles.btnDisabled]}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.textWhite} />
        ) : (
          <View style={styles.inner}>
            <Text style={styles.icon}>{pressed ? '✅' : '🍗'}</Text>
            <View>
              <Text style={styles.label}>{pressed ? 'Dispensed!' : 'Feed Now'}</Text>
              <Text style={styles.sub}>{pressed ? '1 serving released' : 'Tap to dispense 1 serving'}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSm,
    paddingVertical: 16,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  btnDisabled: {
    backgroundColor: COLORS.textTertiary,
    opacity: 0.6,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {fontSize: 26},
  label: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  sub: {
    fontSize: SIZES.fontXs,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 1,
  },
});

export default FeedButton;
