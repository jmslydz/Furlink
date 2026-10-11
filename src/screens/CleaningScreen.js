import React from 'react';
import {View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/theme';
import CameraFeed from '../components/CameraFeed';
import AnimatedPup from '../components/AnimatedPup';

export default function CleaningScreen() {
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content}>
  <Text style={s.title}>Cleaning</Text><Text style={s.sub}>Conveyor floor and wash system</Text>
  <View style={s.pup}><AnimatedPup size={90}/><View style={{flex:1}}><Text style={s.head}>Cleaning control</Text><Text style={s.body}>Raspberry Pi 4 integration pending</Text></View></View>
  <CameraFeed isOffline />
  <Text style={s.section}>System status</Text>
  {[['Conveyor motor','Not connected'],['Water pump','Not connected'],['Safety interlocks','Not verified'],['Emergency stop','Not verified']].map(([label,value])=><View key={label} style={s.row}><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text></View>)}
  <View style={s.warning}><Text style={s.head}>⚠ Cleaning safety</Text><Text style={s.body}>The moving treadmill floor can injure a dog, even at low speed. This prototype must be demonstrated with an empty cage until occupied operation is independently validated. A camera and warning alone are not safety interlocks.</Text></View>
  <TouchableOpacity disabled style={s.start}><Text style={s.buttonText}>Start cleaning — unavailable</Text></TouchableOpacity>
  <TouchableOpacity disabled style={s.stop}><Text style={s.stopText}>STOP CLEANING — not connected</Text></TouchableOpacity>
  <Text style={s.hint}>When integrated, STOP must send a high-priority command to stop both motor and pump; show “Stopped” only after verified hardware feedback. A separate hardwired emergency stop is required.</Text>
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:COLORS.background},content:{padding:20,paddingBottom:110},title:{fontSize:27,fontWeight:'800',color:COLORS.text},sub:{fontSize:13,color:COLORS.textSecondary,marginTop:5,marginBottom:20},pup:{backgroundColor:COLORS.surface,borderRadius:20,padding:10,flexDirection:'row',alignItems:'center',marginBottom:16},head:{fontSize:15,fontWeight:'700',color:COLORS.text},body:{fontSize:12,color:COLORS.textSecondary,lineHeight:19,marginTop:6},section:{fontSize:17,fontWeight:'700',color:COLORS.text,marginVertical:14},row:{flexDirection:'row',justifyContent:'space-between',backgroundColor:COLORS.card,padding:15,borderRadius:12,marginBottom:7},label:{fontSize:13,color:COLORS.text},value:{fontSize:12,color:COLORS.textSecondary},warning:{backgroundColor:'#F4E9D6',padding:17,borderRadius:16,marginTop:17},start:{backgroundColor:COLORS.primaryDark,opacity:.45,padding:17,borderRadius:24,alignItems:'center',marginTop:19},buttonText:{color:'#FFF',fontWeight:'700'},stop:{backgroundColor:COLORS.danger,opacity:.45,padding:17,borderRadius:24,alignItems:'center',marginTop:10},stopText:{color:'#FFF',fontWeight:'800'},hint:{fontSize:11,color:COLORS.textSecondary,lineHeight:18,marginTop:14}});
