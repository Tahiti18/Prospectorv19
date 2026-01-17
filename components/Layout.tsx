import React, { useState } from 'react';
import { MainMode, SubModule } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeMode: MainMode;
  setActiveMode: (m: MainMode) => void;
  activeModule: SubModule;
  setActiveModule: (m: SubModule) => void;
  onSearchClick: () => void;
  theater: string;
  setTheater: (t: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentLayout: string;
  setLayoutMode: (mode: string) => void;
}

const STRATEGIC_CITIES = ["LONDON, UK", "NEW YORK, USA", "DUBAI, UAE", "LOS ANGELES, USA", "SINGAPORE", "SYDNEY, AUS"];

const Icons = {
  Home: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  Search: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  Manual: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  Target: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Database: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>,
  Graph: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>,
};

const MODULE_GROUPS: Record<MainMode, Record<string, { id: SubModule; label: string; icon?: (cn: string) => React.ReactNode }[]>> = {
  RESEARCH: {
    "CORE INSIGHTS": [
      { id: 'EXECUTIVE_DASHBOARD', label: 'EXECUTIVE DASHBOARD', icon: Icons.Home },
      { id: 'SYSTEM_OVERVIEW', label: 'SYSTEM OVERVIEW', icon: Icons.Graph },
      { id: 'SYSTEM_MANUAL', label: 'SYSTEM MANUAL', icon: Icons.Manual },
      { id: 'MARKET_DISCOVERY', label: 'GENERATE LEADS', icon: Icons.Target },
      { id: 'INTELLIGENCE_SCAN', label: 'INTELLIGENCE SCAN', icon: Icons.Search },
      { id: 'MARKET_TRENDS', label: 'MARKET TRENDS', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> },
    ],
    "CRM & STRATEGY": [
      { id: 'PROSPECT_DATABASE', label: 'LEAD DATABASE', icon: Icons.Database },
      { id: 'STRATEGY_CENTER', label: 'STRATEGY HUB', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
      { id: 'PIPELINE', label: 'GROWTH PIPELINE', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
      { id: 'ANALYTICS_HUB', label: 'BUSINESS ANALYTICS', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    ],
    "ANALYSIS CENTER": [
      { id: 'BENCHMARK', label: 'BENCHMARKING', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> },
      { id: 'VISUAL_ANALYSIS', label: 'VISUAL AUDIT', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> },
      { id: 'STRATEGIC_REASONING', label: 'STRATEGIC LOGIC', icon: (cn) => <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
    ]
  },
  DESIGN: { "Creative Suite": [{ id: 'VISUAL_STUDIO', label: 'VISUAL STUDIO' }, { id: 'MOCKUPS_4K', label: '4K MOCKUPS' }] },
  MEDIA: { "Media Production": [{ id: 'VIDEO_PRODUCTION', label: 'VIDEO STUDIO' }] },
  OUTREACH: { "Sales Ops": [{ id: 'CAMPAIGN_ORCHESTRATOR', label: 'CAMPAIGN FORGE' }] },
  ADMIN: { "Management": [{ id: 'SETTINGS', label: 'SETTINGS' }] }
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, activeMode, setActiveMode, activeModule, setActiveModule, onSearchClick, theater, setTheater, theme, toggleTheme, currentLayout, setLayoutMode
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const groups = MODULE_GROUPS[activeMode] || {};

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#020617] text-slate-100 font-sans">
      {/* Top Navigation Bar */}
      <header className="h-[80px] border-b border-slate-800 flex-none z-[100] bg-[#030712] flex items-center px-8">
        <div className="flex items-center gap-4 w-[260px] shrink-0">
          <h1 className="text-xl font-black tracking-tight leading-none text-white uppercase select-none">
            PROSPECTOR <span className="text-emerald-500 italic">OS</span>
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <nav className="flex items-center gap-2 p-1.5 rounded-full bg-[#0b1021] border border-slate-800 shadow-2xl">
            {(Object.keys(MODULE_GROUPS) as MainMode[]).map((mode) => {
              const isActive = activeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-700'}`}></span>
                  {mode}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4 w-[350px] justify-end shrink-0">
           <button 
             onClick={onSearchClick}
             className="px-5 py-2.5 rounded-xl border border-slate-800 bg-[#0b1021] text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
           >
             QUICK ACCESS <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">⌘K</span>
           </button>
           
           <div className="relative group">
              <select 
                value={theater} 
                onChange={(e) => setTheater(e.target.value)}
                className="bg-[#0b1021] border border-slate-800 rounded-xl px-4 py-2.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest cursor-pointer outline-none appearance-none pr-10 focus:border-emerald-500/50"
              >
                <option value="" disabled>THEATER</option>
                {STRATEGIC_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
              </div>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ZEUS SIDEBAR */}
        <aside className={`flex-none border-r border-slate-800 bg-[#030712] transition-all duration-300 flex flex-col ${isSidebarCollapsed ? 'w-[80px]' : 'w-[260px]'}`}>
          <div className="p-6 border-b border-slate-800 flex justify-center">
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
                    <h3 className="px-4 text-[11px] font-black text-slate-100 uppercase tracking-[0.2em] mb-4">
                      {groupName}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {/* Fix: Added explicit type cast for modules to avoid 'unknown' map error */}
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
                            {mod.icon ? mod.icon('w-5 h-5') : <div className="w-5 h-5 bg-current opacity-20 rounded"></div>}
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

        {/* MAIN WORKSPACE */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[#020617] p-8">
            <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
              {children}
            </div>
          </main>

          {/* ZEUS FOOTER STATUS BAR */}
          <footer className="h-10 border-t border-slate-800 bg-[#030712] flex items-center justify-between px-6 shrink-0 relative z-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">STATUS:</span>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">V16.2 (CORPORATE)</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ENGINE:</span>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">GEMINI_3_FLASH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">CLIENT:</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">NO ACTIVE SELECTION</span>
              </div>
            </div>
          </footer>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 0)', backgroundSize: '64px 64px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
