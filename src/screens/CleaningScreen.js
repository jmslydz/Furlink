import React,{useEffect,useRef,useState} from 'react';
import {View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity,Alert} from 'react-native';
import {COLORS} from '../constants/theme';
import CameraFeed from '../components/CameraFeed';
import AnimatedPup from '../components/AnimatedPup';

export default function CleaningScreen(){
 const [stage,setStage]=useState('idle'); const [seconds,setSeconds]=useState(0);
 const timer=useRef(null);
 useEffect(()=>{if(stage!=='running')return;timer.current=setInterval(()=>setSeconds(t=>t+1),1000);return()=>clearInterval(timer.current);},[stage]);
 useEffect(()=>{if(stage==='running'&&seconds>=12)setStage('complete');},[stage,seconds]);
 const start=()=>Alert.alert('Demo cleaning only','Confirm that this is an empty-cage simulation. No motor or pump will operate.',[{text:'Cancel',style:'cancel'},{text:'Start demo',onPress:()=>{setSeconds(0);setStage('running');}}]);
 const stop=()=>{setStage('stopped');clearInterval(timer.current);};
 const phase=stage==='running'?(seconds<7?'Conveyor moving (simulated)':'Water rinse (simulated)'):stage==='complete'?'Demo complete':stage==='stopped'?'Simulation stopped':'Ready for demo';
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Cleaning</Text><Text style={s.sub}>Interactive demonstration · no hardware control</Text>
 <View style={s.pup}><AnimatedPup size={88}/><View style={{flex:1}}><Text style={s.head}>Snoopy's clean space</Text><Text style={s.body}>See how waste removal and rinsing would work.</Text></View></View>
 <CameraFeed isOffline />
 <View style={s.card}><Text style={s.head}>Demo sequence</Text><Text style={s.phase}>{phase}</Text><View style={s.track}><View style={[s.fill,{width:(stage==='complete'?100:stage==='running'?Math.min(100,seconds/12*100):0)+'%'}]}/></View><Text style={s.body}>{stage==='running'?seconds+' / 12 seconds':stage==='complete'?'The demonstration finished.':'No real equipment is connected.'}</Text></View>
 <Text style={s.section}>System overview</Text>
 {[['Conveyor motor',stage==='running'&&seconds<7?'Simulated movement':'Off (demo)'],['Water pump',stage==='running'&&seconds>=7?'Simulated rinse':'Off (demo)'],['Safety interlocks','Not installed or verified'],['Physical emergency stop','Not verified']].map(([l,v])=><View key={l} style={s.row}><Text style={s.label}>{l}</Text><Text style={s.value}>{v}</Text></View>)}
 <View style={s.warning}><Text style={s.head}>⚠ Safety notice</Text><Text style={s.body}>Demonstrate conveyor movement only with an empty cage. Slow movement does not establish safety for a dog standing on the belt. This app simulation does not replace a hardwired emergency stop or hardware interlocks.</Text></View>
 <TouchableOpacity disabled={stage==='running'} onPress={start} style={[s.start,stage==='running'&&{opacity:.4}]}><Text style={s.buttonText}>▶ Start cleaning demo</Text></TouchableOpacity>
 <TouchableOpacity onPress={stop} disabled={stage!=='running'} style={[s.stop,stage!=='running'&&{opacity:.45}]}><Text style={s.stopText}>■ STOP DEMO</Text></TouchableOpacity>
 <Text style={s.hint}>For real implementation, STOP must request motor and pump shutdown immediately and wait for verified device acknowledgement. Until then, this screen controls only an on-screen animation.</Text>
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:COLORS.background},content:{padding:20,paddingBottom:110},title:{fontSize:27,fontWeight:'800',color:COLORS.text},sub:{fontSize:13,color:COLORS.textSecondary,marginTop:5,marginBottom:20},pup:{backgroundColor:COLORS.surface,borderRadius:20,padding:10,flexDirection:'row',alignItems:'center',marginBottom:16},head:{fontSize:15,fontWeight:'700',color:COLORS.text},body:{fontSize:12,color:COLORS.textSecondary,lineHeight:19,marginTop:6},section:{fontSize:17,fontWeight:'700',color:COLORS.text,marginVertical:14},row:{flexDirection:'row',justifyContent:'space-between',backgroundColor:COLORS.card,padding:15,borderRadius:12,marginBottom:7},label:{fontSize:13,color:COLORS.text},value:{fontSize:12,color:COLORS.textSecondary,flexShrink:1,textAlign:'right'},warning:{backgroundColor:'#F4E9D6',padding:17,borderRadius:16,marginTop:17},start:{backgroundColor:COLORS.primaryDark,padding:17,borderRadius:24,alignItems:'center',marginTop:19},buttonText:{color:'#FFF',fontWeight:'700'},stop:{backgroundColor:COLORS.danger,padding:17,borderRadius:24,alignItems:'center',marginTop:10},stopText:{color:'#FFF',fontWeight:'800'},hint:{fontSize:11,color:COLORS.textSecondary,lineHeight:18,marginTop:14},card:{backgroundColor:COLORS.card,borderRadius:18,padding:16,marginBottom:12},phase:{fontSize:18,color:COLORS.primaryDark,fontWeight:'800',marginTop:9},track:{height:9,backgroundColor:COLORS.surface,borderRadius:9,overflow:'hidden',marginTop:12,marginBottom:5},fill:{height:'100%',backgroundColor:COLORS.primary,borderRadius:9}});
