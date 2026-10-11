import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View, StyleSheet} from 'react-native';
import Svg, {Ellipse, Path, Circle} from 'react-native-svg';

/** Lightweight Snoopy-inspired animated beagle, no additional native dependency. */
export default function AnimatedPup({size = 112}) {
  const float = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(float, {toValue: 1, duration: 1450, easing: Easing.inOut(Easing.sin), useNativeDriver: true}),
      Animated.timing(float, {toValue: 0, duration: 1450, easing: Easing.inOut(Easing.sin), useNativeDriver: true}),
    ]));
    const wag = Animated.loop(Animated.sequence([
      Animated.timing(sway,{toValue:1,duration:320,useNativeDriver:true}),
      Animated.timing(sway,{toValue:0,duration:320,useNativeDriver:true}),
    ]));
    loop.start(); wag.start();
    return () => {loop.stop();wag.stop();};
  }, [float,sway]);
  return <View accessible accessibilityLabel="Animated black and white puppy" style={[styles.wrap,{width:size,height:size}]}>
    <Animated.View style={{width:size,height:size,transform:[{translateY:float.interpolate({inputRange:[0,1],outputRange:[0,-5]})}]}}>
      <Animated.View style={{position:'absolute',right:size*0.07,top:size*0.56,width:size*0.27,height:size*0.26,transform:[{rotate:sway.interpolate({inputRange:[0,1],outputRange:['-12deg','14deg']})}]}}><Svg width="100%" height="100%" viewBox="0 0 35 35"><Path d="M5 30 Q33 22 25 3" fill="none" stroke="#27342F" strokeWidth="4" strokeLinecap="round"/></Svg></Animated.View>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Ellipse cx="61" cy="108" rx="41" ry="5" fill="#DCDDD5"/>
        <Path d="M42 71 Q36 91 50 103 L89 103 Q104 88 90 69 Z" fill="#FFFFFF" stroke="#27342F" strokeWidth="2.4"/>
        
        <Path d="M44 94 L43 105 M80 94 L81 105" stroke="#27342F" strokeWidth="5" strokeLinecap="round"/>
        <Path d="M31 27 Q55 6 83 25 Q103 40 91 68 Q79 85 47 77 Q23 70 25 48 Z" fill="#FFFFFF" stroke="#27342F" strokeWidth="2.5"/>
        <Path d="M36 28 Q12 22 15 55 Q19 77 36 65 Q43 46 36 28 Z" fill="#252B2A" stroke="#27342F" strokeWidth="2"/>
        <Ellipse cx="84" cy="49" rx="13" ry="9" fill="#FFFFFF"/>
        <Ellipse cx="93" cy="50" rx="7" ry="5.5" fill="#27342F"/>
        <Circle cx="69" cy="36" r="2.8" fill="#27342F"/>
        <Path d="M73 63 Q80 69 86 61" fill="none" stroke="#27342F" strokeWidth="2" strokeLinecap="round"/>
        <Path d="M42 72 Q64 81 89 71" stroke="#B36B54" strokeWidth="3.5" fill="none"/>
      </Svg>
    </Animated.View>
  </View>;
}
const styles=StyleSheet.create({wrap:{alignItems:'center',justifyContent:'center'}});
