import React,{createContext,useContext,useState} from 'react';
const ModeContext=createContext(null);
export const ModeProvider=({children})=>{const [mode,setMode]=useState('demo');return <ModeContext.Provider value={{mode,setMode,isDemo:mode==='demo'}}>{children}</ModeContext.Provider>;};
export const useMode=()=>{const ctx=useContext(ModeContext);if(!ctx)throw new Error('useMode requires ModeProvider');return ctx;};
