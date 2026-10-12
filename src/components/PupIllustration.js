import React from 'react';
import Svg,{Path,Ellipse,Circle,Rect} from 'react-native-svg';
/** Static illustrated mascot. Poses are separate drawings, never animated. */
export default function PupIllustration({pose='sit',size=120}){
 const food=pose==='feed',water=pose==='water',clean=pose==='clean',sleep=pose==='sleep',point=pose==='point';
 return <Svg width={size} height={size*.8} viewBox="0 0 160 128">
 <Path d="M8 113 H153" stroke="#333632" strokeWidth="1.5" strokeLinecap="round"/>
 {food&&<><Ellipse cx="118" cy="103" rx="30" ry="8" fill="#527C68"/><Path d="M89 84 L97 107 Q118 117 140 107 L147 84Z" fill="#527C68" stroke="#333632" strokeWidth="2"/><Ellipse cx="118" cy="85" rx="29" ry="7" fill="#E8B989"/><Circle cx="111" cy="84" r="3" fill="#B87C42"/><Circle cx="124" cy="85" r="3" fill="#B87C42"/></>}
 {water&&<><Path d="M94 86 L101 110 Q119 118 140 110 L146 86Z" fill="#91D5EC" stroke="#333632" strokeWidth="2"/><Ellipse cx="120" cy="87" rx="26" ry="7" fill="#B6E7F4" stroke="#333632" strokeWidth="1.5"/></>}
 {clean&&<><Circle cx="128" cy="23" r="6" fill="none" stroke="#91D5EC" strokeWidth="2"/><Circle cx="142" cy="43" r="3" fill="none" stroke="#91D5EC" strokeWidth="2"/><Circle cx="19" cy="46" r="5" fill="none" stroke="#91D5EC" strokeWidth="2"/></>}
 <Path d={sleep?'M28 82 Q40 59 84 75 Q113 76 129 101 Q123 116 96 111 L46 112 Q20 108 28 82Z':'M51 71 Q70 61 91 78 L105 106 L56 108 Q41 93 51 71Z'} fill="#FFFDF9" stroke="#292D2B" strokeWidth="2.6"/>
 <Path d="M96 100 Q119 91 131 104" fill="none" stroke="#292D2B" strokeWidth="3" strokeLinecap="round"/>
 <Path d={sleep?'M20 67 Q11 37 38 27 Q76 13 95 42 Q105 60 84 83 Q55 93 20 67Z':'M28 59 Q17 34 43 19 Q80 7 98 39 Q110 60 84 78 Q55 89 28 59Z'} fill="#FFFDF9" stroke="#292D2B" strokeWidth="2.7"/>
 <Path d="M37 28 Q18 23 15 49 Q12 73 34 76 Q43 59 37 28Z" fill="#262A28"/>
 <Ellipse cx="93" cy="54" rx="9" ry="7" fill="#262A28"/>
 <Circle cx="71" cy="37" r="2.8" fill="#262A28"/>
 <Path d="M82 65 Q88 70 94 63" stroke="#262A28" strokeWidth="2" fill="none" strokeLinecap="round"/>
 <Path d={point?'M90 81 L143 60':'M60 98 L52 110'} stroke="#292D2B" strokeWidth="4" strokeLinecap="round"/>
 {point&&<Circle cx="143" cy="60" r="5" fill="#FFFDF9" stroke="#292D2B" strokeWidth="2"/>}
 <Path d="M83 77 Q94 79 98 73" fill="none" stroke="#B65D4E" strokeWidth="3"/>
 </Svg>;
}
