import React,{useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,Alert} from 'react-native';
import {COLORS} from '../constants/theme';
import {useAuth} from '../context/AuthContext';
import AnimatedPup from '../components/AnimatedPup';
import ModeSwitch from '../components/ModeSwitch';
import {useMode} from '../context/ModeContext';

const Metric = ({icon,label,value}) => <View style={styles.metric}><Text style={styles.icon}>{icon}</Text><View><Text style={styles.small}>{label}</Text><Text style={styles.value}>{value}</Text></View></View>;

export default function HomeScreen({navigation}) {
  const {isOffline} = useAuth();
  const {isDemo}=useMode();
  const [food,setFood]=useState(68);
  const [water,setWater]=useState(45);
  const [message,setMessage]=useState('Sample device overview');
  const quick=(label,screen)=>{if(label==='Feed'||label==='Water'){if(!isDemo)return Alert.alert('Actual mode','Hardware controls are unavailable until the Raspberry Pi integration is verified.');if(label==='Feed'){setFood(v=>Math.max(0,v-8));setMessage('Simulated feeding completed.');}else{setWater(v=>Math.max(0,v-5));setMessage('Simulated water dispense completed.');}return;}navigation.navigate(screen);};
  const actions=[['◒','Feed',null],['💧','Water',null],['✧','Clean','CleaningTab'],['▣','Monitor','MonitorTab']];
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><Text style={styles.brand}>Furlink</Text><TouchableOpacity accessibilityLabel="Notifications" onPress={()=>navigation.navigate('NotificationsTab')}><Text style={styles.bell}>♧</Text></TouchableOpacity></View>
    <View style={styles.petCard}><AnimatedPup size={102}/><View style={{flex:1}}><Text style={styles.petName}>Snoopy</Text><Text style={styles.status}>●  {isOffline?'Offline':'Demo preview'}</Text><Text style={styles.small}>Hardware not verified</Text></View></View>
    <ModeSwitch />
    <Text style={styles.demo}>{isDemo?'DEMO MODE · Sample values only. '+message:'ACTUAL MODE · Waiting for verified Raspberry Pi connection.'}</Text>
    <Text style={styles.section}>Cage overview</Text>
    <View style={styles.grid}><Metric icon="◒" label="Food" value={isDemo?food+"%":"--"}/><Metric icon="💧" label="Water" value={isDemo?water+"%":"--"}/><Metric icon="♨" label="Temperature" value={isDemo?"27°C":"--"}/><Metric icon="▣" label="Battery" value={isDemo?"81%":"--"}/></View>
    <Text style={styles.section}>Quick actions</Text>
    <View style={styles.actions}>{actions.map(([icon,label,screen],i)=><TouchableOpacity key={label} onPress={()=>quick(label,screen)} style={[styles.action,i===0&&styles.selected]}><Text style={[styles.actionIcon,i===0&&styles.white]}>{icon}</Text><Text style={[styles.actionLabel,i===0&&styles.white]}>{label}</Text></TouchableOpacity>)}</View>
    <View style={styles.notice}><Text style={styles.noticeTitle}>Cleaning safety</Text><Text style={styles.noticeBody}>Conveyor cleaning must be demonstrated with an empty cage until safe operation around a dog has been independently validated.</Text></View>
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:COLORS.background},content:{padding:20,paddingBottom:110},
 header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:18},brand:{fontSize:28,fontWeight:'800',color:COLORS.primaryDark},bell:{fontSize:28,color:COLORS.primaryDark,paddingHorizontal:8},
 petCard:{backgroundColor:COLORS.surface,borderRadius:22,padding:12,flexDirection:'row',alignItems:'center',gap:10},petName:{fontSize:21,fontWeight:'700',color:COLORS.text},status:{color:COLORS.primary,fontSize:12,fontWeight:'700',marginTop:8},
 small:{fontSize:12,color:COLORS.textSecondary,marginTop:3},demo:{fontSize:12,color:COLORS.textSecondary,marginTop:12,lineHeight:18},
 section:{fontSize:17,fontWeight:'700',color:COLORS.text,marginTop:25,marginBottom:13},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',rowGap:10},
 metric:{width:'48.5%',minHeight:100,backgroundColor:COLORS.card,borderRadius:17,padding:14,flexDirection:'row',gap:10,alignItems:'center'},icon:{fontSize:22,color:COLORS.primary},value:{fontSize:22,fontWeight:'800',color:COLORS.text,marginTop:4},
 actions:{flexDirection:'row',gap:8},action:{flex:1,backgroundColor:COLORS.surface,borderRadius:16,alignItems:'center',justifyContent:'center',minHeight:85,gap:7},selected:{backgroundColor:COLORS.primaryDark},actionIcon:{fontSize:23,color:COLORS.primaryDark},actionLabel:{fontSize:12,fontWeight:'600',color:COLORS.text},white:{color:'#FFFFFF'},
 notice:{backgroundColor:'#F3EAD9',borderRadius:16,padding:16,marginTop:23},noticeTitle:{fontSize:14,fontWeight:'700',color:COLORS.text},noticeBody:{fontSize:12,lineHeight:19,color:COLORS.textSecondary,marginTop:6}
});
