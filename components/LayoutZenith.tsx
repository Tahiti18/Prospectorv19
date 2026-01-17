import React, { useState, useEffect, useRef } from 'react';
import { MainMode, SubModule } from '../types';
import { Tooltip } from './Tooltip';

interface LayoutProps {
  children: React.ReactNode;
  activeMode: MainMode;
  setActiveMode: (m: MainMode) => void;
  activeModule: SubModule;
  setActiveModule: (m: SubModule) => void;
  onSearchClick: () => void;
  theater: string;
  setTheater: (t: string) => void;
  currentLayout: string;
  setLayoutMode: (mode: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const STRATEGIC_CITIES = ["LONDON, UK", "NEW YORK, USA", "DUBAI, UAE", "LOS ANGELES, USA", "SINGAPORE", "SYDNEY, AUS"];

const ModeIcon = ({ id, active }: { id: MainMode, active: boolean }) => {
  const cn = active ? "text-white" : "text-slate-400 group-hover:text-white";
  switch(id) {
    case 'RESEARCH': return <svg className={`w-4 h-4 ${cn}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; 
    case 'DESIGN': return <svg className={`w-4 h-4 ${cn}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>; 
    case 'MEDIA': return <svg className={`w-4 h-4 ${cn}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>; 
    case 'OUTREACH': return <svg className={`w-4 h-4 ${cn}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>; 
    case 'ADMIN': return <svg className={`w-4 h-4 ${cn}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; 
  }
}

const MODULE_GROUPS: Record<MainMode, Record<string, { id: SubModule; label: string; icon?: (cn: string) => React.ReactNode }[]>> = {
  RESEARCH: {
    "CORE INSIGHTS": [
      { id: 'EXECUTIVE_DASHBOARD', label: 'EXECUTIVE DASHBOARD' },
      { id: 'TRANSFORMATION_BLUEPRINT', label: 'SYSTEM OVERVIEW' },
      { id: 'USER_GUIDE', label: 'SYSTEM MANUAL' },
      { id: 'MARKET_DISCOVERY', label: 'GENERATE LEADS' },
      { id: 'INTELLIGENCE_SCAN', label: 'INTELLIGENCE SCAN' },
      { id: 'MARKET_TRENDS', label: 'MARKET TRENDS' },
    ],
    "CRM & STRATEGY": [
      { id: 'PROSPECT_DATABASE', label: 'LEAD DATABASE' },
      { id: 'STRATEGY_CENTER', label: 'STRATEGY HUB' },
      { id: 'PIPELINE', label: 'GROWTH PIPELINE' },
      { id: 'ANALYTICS_HUB', label: 'BUSINESS ANALYTICS' },
    ],
    "ANALYSIS CENTER": [
      { id: 'BENCHMARK', label: 'BENCHMARKING' },
      { id: 'VISUAL_ANALYSIS', label: 'VISUAL AUDIT' },
      { id: 'STRATEGIC_REASONING', label: 'STRATEGIC LOGIC' },
      { id: 'FACT_CHECK', label: 'FACT CHECKER' },
    ]
  },
  DESIGN: {
    "CREATIVE STUDIO": [
      { id: 'VISUAL_STUDIO', label: 'VISUAL STUDIO' },
      { id: 'BRAND_DNA', label: 'BRAND DNA' },
      { id: 'MOCKUPS_4K', label: 'MOCKUP FORGE' },
    ],
    "ASSET ARCHITECTURE": [
      { id: 'PRODUCT_SYNTHESIS', label: 'OFFER SYNTHESIS' },
      { id: 'CONTENT_IDEATION', label: 'CONTENT IDEATION' },
      { id: 'ASSET_LIBRARY', label: 'ASSET VAULT' },
    ]
  },
  MEDIA: {
    "CINEMATIC FORGE": [
      { id: 'VIDEO_PRODUCTION', label: 'VIDEO STUDIO' },
      { id: 'VIDEO_PITCH', label: 'VEO VIDEO FORGE' },
      { id: 'VIDEO_AUDIT', label: 'VIDEO AUDIT' },
      { id: 'MOTION_LAB', label: 'MOTION LAB' },
    ],
    "SONIC ENGINEERING": [
      { id: 'SONIC_STUDIO', label: 'SONIC STUDIO' },
      { id: 'MEETING_NOTES', label: 'EXECUTIVE SCRIBE' },
    ]
  },
  OUTREACH: {
    "CAMPAIGN ENGINE": [
      { id: 'CAMPAIGN_ORCHESTRATOR', label: 'CAMPAIGN ARCHITECT' },
      { id: 'PRESENTATION_BUILDER', label: 'DECK ARCHITECT' },
      { id: 'FUNNEL_MAP', label: 'FUNNEL MAPPER' },
    ],
    "SALES PROTOCOL": [
      { id: 'PROPOSALS', label: 'PROPOSAL BUILDER' },
      { id: 'SEQUENCER', label: 'OUTREACH BUILDER' },
      { id: 'ELEVATOR_PITCH', label: 'PITCH GENERATOR' },
      { id: 'SALES_COACH', label: 'STRATEGIC COACH' },
    ],
    "VALUE MODELING": [
      { id: 'ROI_CALCULATOR', label: 'VALUE PROJECTOR' },
      { id: 'DEMO_SANDBOX', label: 'GROWTH SIMULATOR' },
      { id: 'AI_CONCIERGE', label: 'NEURAL AGENT' },
    ]
  },
  ADMIN: {
    "OPERATIONS": [
      { id: 'AGENCY_PLAYBOOK', label: 'PLAYBOOK' },
      { id: 'IDENTITY', label: 'IDENTITY' },
      { id: 'BILLING', label: 'FINANCIALS' },
      { id: 'AFFILIATE', label: 'PARTNERS' },
    ],
    "SYSTEM NODES": [
      { id: 'SETTINGS', label: 'GLOBAL SETTINGS' },
      { id: 'SYSTEM_CONFIG', label: 'CORE CONFIG' },
      { id: 'USAGE_STATS', label: 'RESOURCE STATS' },
      { id: 'EXPORT_DATA', label: 'DATA MANAGEMENT' },
    ],
    "TRACE LOGS": [
      { id: 'ACTIVITY_LOGS', label: 'ACTIVITY TRACE' },
      { id: 'TIMELINE', label: 'HISTORICAL TIMELINE' },
      { id: 'NEXUS_GRAPH', label: 'NEXUS MAP' },
      { id: 'TASK_MANAGER', label: 'TASK MANAGER' },
    ]
  }
};

export const LayoutZenith: React.FC<LayoutProps> = ({ 
  children, activeMode, setActiveMode, activeModule, setActiveModule, onSearchClick, theater, setTheater, currentLayout, setLayoutMode, theme, toggleTheme
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const groups = MODULE_GROUPS[activeMode] || {};

  const handleModeClick = (mode: MainMode) => {
    setActiveMode(mode);
    // Auto-select logical starting module per mode
    const firstGroup = Object.keys(MODULE_GROUPS[mode])[0];
    const firstMod = MODULE_GROUPS[mode][firstGroup][0].id;
    setActiveModule(firstMod);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#020617] text-slate-100 font-sans">
      {/* ZENITH APEX HEADER */}
      <header className="h-20 flex-none border-b border-slate-800 z-[100] flex items-center justify-between px-8 bg-[#030712]">
         <div className="flex items-center gap-4 w-80 shrink-0">
            <h1 className="text-xl font-black tracking-tight leading-none text-white uppercase select-none">
               PROSPECTOR <span className="text-emerald-500 italic">OS</span>
            </h1>
         </div>

         <div className="flex-1 flex justify-center pointer-events-auto">
            <nav className="flex items-center gap-2 p-1.5 rounded-full border shadow-2xl bg-[#0b1021] border-slate-800">
               {(Object.keys(MODULE_GROUPS) as MainMode[]).map((mode) => {
                  const isActive = activeMode === mode;
                  return (
                     <button
                        key={mode}
                        onClick={() => handleModeClick(mode)}
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                           isActive 
                              ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                     >
                        <ModeIcon id={mode} active={isActive} />
                        {mode}
                     </button>
                  );
               })}
            </nav>
         </div>

         <div className="flex items-center gap-4 w-auto justify-end shrink-0">
            <button 
               onClick={onSearchClick}
               className="px-5 h-12 rounded-2xl border text-xs font-bold transition-all bg-[#0b1021] border-slate-800 text-slate-400 hover:text-white flex items-center gap-3"
            >
               <span className="uppercase tracking-widest text-[10px] font-black">QUICK ACCESS</span>
               <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800">⌘K</span>
            </button>

            <div className="relative group">
                <select 
                   value={theater} 
                   onChange={(e) => setTheater(e.target.value)}
                   className="bg-[#0b1021] border border-slate-800 rounded-2xl px-6 h-12 text-[10px] font-black text-emerald-400 uppercase tracking-widest cursor-pointer outline-none appearance-none pr-12 focus:border-emerald-500/50"
                >
                   <option value="" disabled>THEATER</option>
                   {STRATEGIC_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                </div>
            </div>
         </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
         {/* ZENITH SIDEBAR */}
         <aside className={`flex-none border-r border-slate-800 bg-[#030712] transition-all duration-300 flex flex-col z-50 ${isSidebarCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
            <div className="p-6 border-b border-slate-800 flex justify-center shrink-0">
               <button 
                 onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                 className="w-full py-2.5 rounded-lg bg-slate-900/40 border border-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] hover:text-emerald-500 hover:border-emerald-500/30 transition-all"
               >
                 {isSidebarCollapsed ? '→' : 'COLLAPSE INTERFACE'}
               </button>
            </div>

            <nav className="flex-1 overflow-y-auto custom-scrollbar py-8 space-y-12">
               {Object.entries(groups).map(([groupName, modules]) => (
                  <div key={groupName} className="px-4 space-y-4">
                     {!isSidebarCollapsed && (
                       <h3 className="px-4 text-[11px] font-black text-slate-100 uppercase tracking-[0.25em] mb-4 border-b border-slate-800/50 pb-2">
                         {groupName}
                       </h3>
                     )}
                     <div className="space-y-1">
                        {(modules as any[]).map(mod => {
                           const isActive = activeModule === mod.id;
                           return (
                              <button
                                 key={mod.id}
                                 onClick={() => setActiveModule(mod.id)}
                                 className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
                                    isActive 
                                       ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/30 shadow-lg' 
                                       : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
                                 }`}
                              >
                                 <div className={`shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                 </div>
                                 {!isSidebarCollapsed && (
                                   <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : ''}`}>
                                     {mod.label}
                                   </span>
                                 )}
                                 {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-500 rounded-l-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>}
                              </button>
                           );
                        })}
                     </div>
                  </div>
               ))}
            </nav>
         </aside>

         {/* ZENITH MAIN WORKSPACE */}
         <div className="flex-1 flex flex-col overflow-hidden relative bg-[#020617]">
            <main className="flex-1 h-full overflow-y-auto custom-scrollbar p-10">
               <div className="max-w-[1600px] mx-auto min-h-full">
                  {children}
               </div>
            </main>

            {/* ZENITH STATUS BAR */}
            <footer className="h-10 border-t border-slate-800 bg-[#030712] flex items-center justify-between px-8 shrink-0 relative z-[60]">
               <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">STATUS:</span>
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        OPERATIONAL
                     </span>
                  </div>
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">V16.2 (CORPORATE)</span>
               </div>

               <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ENGINE:</span>
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">GEMINI_3_FLASH</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">CLIENT:</span>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-50">NO ACTIVE SELECTION</span>
                  </div>
                  <div className="h-4 w-px bg-slate-800"></div>
                  <div className="flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                     LATENCY: <span className="text-emerald-500">12ms</span>
                  </div>
               </div>
            </footer>

            {/* Background Aesthetic Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
               <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 0)', backgroundSize: '64px 64px' }}></div>
            </div>
         </div>
      </div>
    </div>
  );
};
