import React, { useState, useEffect } from 'react';
import { LayoutZenith } from './components/LayoutZenith';
import { LayoutCommandCenter } from './components/LayoutCommandCenter';
import { Layout } from './components/Layout';
import { ToastContainer } from './components/ToastContainer';
import { CommandPalette } from './components/CommandPalette';
import { ExecutiveDashboard } from './components/workspaces/ExecutiveDashboard';
import { StrategyCenter } from './components/workspaces/StrategyCenter';
import { VisualStudio } from './components/workspaces/VisualStudio';
import { CampaignOrchestrator } from './components/workspaces/CampaignOrchestrator';
import { IdentityNode } from './components/workspaces/IdentityNode';
import { SettingsNode } from './components/workspaces/SettingsNode';
import { ProspectDatabase } from './components/workspaces/ProspectDatabase';
import { MarketDiscovery } from './components/workspaces/MarketDiscovery';
import { AutomatedSearch } from './components/workspaces/AutomatedSearch';
import { TransformationBlueprint } from './components/workspaces/TransformationBlueprint';
import { UserGuide } from './components/workspaces/UserGuide';
import { SellWorkspace } from './components/workspaces/SellWorkspace';
import { CreateWorkspace } from './components/workspaces/CreateWorkspace';
import { ControlWorkspace } from './components/workspaces/ControlWorkspace';
import { IntelNode } from './components/workspaces/IntelNode';
import { BenchmarkNode } from './components/workspaces/BenchmarkNode';
import { ArticleIntel } from './components/workspaces/ArticleIntel';
import { VideoAI } from './components/workspaces/VideoAI';
import { DeepLogic } from './components/workspaces/DeepLogic';
import { MarketTrends } from './components/workspaces/MarketTrends';
import { NexusGraph } from './components/workspaces/NexusGraph';
import { TimelineNode } from './components/workspaces/TimelineNode';
import { ActivityLogs } from './components/workspaces/ActivityLogs';
import { UsageStats } from './components/workspaces/UsageStats';
import { ChronosNode } from './components/workspaces/ChronosNode';
import { AnalyticsHub } from './components/workspaces/AnalyticsHub';
import { Heatmap } from './components/workspaces/Heatmap';
import { ProductSynth } from './components/workspaces/ProductSynth';
import { DeckArch } from './components/workspaces/DeckArch';
import { FunnelMap } from './components/workspaces/FunnelMap';
import { AssetLibrary } from './components/workspaces/AssetLibrary';
import { VideoProduction } from './components/workspaces/VideoProduction';
import { SonicStudio } from './components/workspaces/SonicStudio';
import { ContentAnalysis } from './components/workspaces/ContentAnalysis';
import { VisionLab } from './components/workspaces/VisionLab';
import { CinemaIntel } from './components/workspaces/CinemaIntel';
import { FactCheck } from './components/workspaces/FactCheck';
import { VideoPitch } from './components/workspaces/VideoPitch';
import { ROICalc } from './components/workspaces/ROICalc';
import { Sequencer } from './components/workspaces/Sequencer';
import { AIConcierge } from './components/workspaces/AIConcierge';
import { PitchGen } from './components/workspaces/PitchGen';
import { MotionLab } from './components/workspaces/MotionLab';
import { DemoSandbox } from './components/workspaces/DemoSandbox';
import { Lead, MainMode, SubModule } from './types';
import { db } from './services/automation/db';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeMode, setActiveMode] = useState<MainMode>('RESEARCH');
  const [activeModule, setActiveModule] = useState<SubModule>('EXECUTIVE_DASHBOARD');
  const [layoutMode, setLayoutMode] = useState<'ZENITH' | 'COMMAND' | 'ZEUS'>('ZENITH');
  const [theater, setTheater] = useState('LOS ANGELES, USA');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lockedLeadId, setLockedLeadId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(setLeads);
    return () => unsub();
  }, []);

  const handleLockLead = (id: string) => {
    setLockedLeadId(id);
    setActiveMode('RESEARCH');
    setActiveModule('STRATEGY_CENTER');
  };

  const handleNavigateSub = (mode: MainMode, mod: SubModule) => {
    setActiveMode(mode);
    setActiveModule(mod);
  };

  const lockedLead = leads.find(l => l.id === lockedLeadId);

  const renderContent = () => {
    switch (activeModule) {
      // --- RESEARCH ZONE ---
      case 'EXECUTIVE_DASHBOARD': 
        return <ExecutiveDashboard leads={leads} market={theater} onNavigate={handleNavigateSub} />;
      case 'TRANSFORMATION_BLUEPRINT':
        return <TransformationBlueprint onNavigate={handleNavigateSub} />;
      case 'USER_GUIDE':
      case 'SYSTEM_OVERVIEW':
        return <UserGuide onNavigate={handleNavigateSub} />;
      case 'MARKET_DISCOVERY': 
        return <MarketDiscovery market={theater} onLeadsGenerated={(nl) => setLeads(prev => [...nl, ...prev])} />;
      case 'AUTOMATED_SEARCH': 
      case 'INTELLIGENCE_SCAN':
        return <AutomatedSearch market={theater} onNewLeads={(nl) => setLeads(prev => [...nl, ...prev])} />;
      case 'PROSPECT_DATABASE': 
        return <ProspectDatabase leads={leads} lockedLeadId={lockedLeadId} onLockLead={handleLockLead} onInspect={handleLockLead} />;
      case 'STRATEGY_CENTER': 
      case 'STRATEGY_HUB':
        return <StrategyCenter lead={lockedLead} onUpdateLead={db.saveLeads as any} onNavigate={handleNavigateSub} />;
      case 'PIPELINE':
        return <SellWorkspace activeModule="PIPELINE" leads={leads} lockedLead={lockedLead} />;
      case 'STRATEGIC_REASONING': 
      case 'DEEP_LOGIC':
        return <DeepLogic lead={lockedLead} />;
      case 'MARKET_TRENDS': 
        return <MarketTrends lead={lockedLead} />;
      case 'VISUAL_ANALYSIS':
      case 'VISUAL_AUDIT':
        return <VisionLab lead={lockedLead} />;
      case 'VIDEO_INSIGHTS':
      case 'CINEMA_INTEL':
        return <CinemaIntel lead={lockedLead} />;
      case 'CONTENT_ANALYSIS':
        return <ContentAnalysis lead={lockedLead} />;
      case 'BENCHMARK': 
        return <BenchmarkNode lead={lockedLead} />;
      case 'ANALYTICS_HUB': 
        return <AnalyticsHub leads={leads} />;
      case 'HEATMAP': 
        return <Heatmap leads={leads} market={theater} />;
      case 'FACT_CHECK':
        return <FactCheck lead={lockedLead} />;

      // --- DESIGN ZONE ---
      case 'VISUAL_STUDIO': 
        return <VisualStudio leads={leads} lockedLead={lockedLead} />;
      case 'BRAND_DNA':
        return <CreateWorkspace activeModule="BRAND_DNA" leads={leads} lockedLead={lockedLead} />;
      case 'MOCKUPS_4K':
        return <CreateWorkspace activeModule="MOCKUPS_4K" leads={leads} lockedLead={lockedLead} />;
      case 'PRODUCT_SYNTHESIS': 
        return <ProductSynth lead={lockedLead} />;
      case 'ASSET_LIBRARY': 
        return <AssetLibrary />;

      // --- MEDIA ZONE ---
      case 'VIDEO_PRODUCTION': 
        return <VideoProduction lead={lockedLead} />;
      case 'VIDEO_PITCH':
        return <VideoPitch lead={lockedLead} />;
      case 'VIDEO_AUDIT': 
        return <VideoAI lead={lockedLead} />;
      case 'MOTION_LAB':
        return <MotionLab lead={lockedLead} />;
      case 'SONIC_STUDIO': 
        return <SonicStudio lead={lockedLead} />;

      // --- OUTREACH ZONE ---
      case 'CAMPAIGN_ORCHESTRATOR': 
        return <CampaignOrchestrator leads={leads} lockedLead={lockedLead} onNavigate={handleNavigateSub} onLockLead={setLockedLeadId} onUpdateLead={db.saveLeads as any} />;
      case 'PROPOSALS':
        return <SellWorkspace activeModule="PROPOSALS" leads={leads} lockedLead={lockedLead} />;
      case 'ROI_CALCULATOR':
        return <ROICalc leads={leads} />;
      case 'SEQUENCER':
        return <Sequencer lead={lockedLead} />;
      case 'PRESENTATION_BUILDER': 
        return <DeckArch lead={lockedLead} />;
      case 'AI_CONCIERGE':
        return <AIConcierge lead={lockedLead} />;
      case 'ELEVATOR_PITCH':
        return <PitchGen lead={lockedLead} />;
      case 'FUNNEL_MAP': 
        return <FunnelMap lead={lockedLead} />;
      case 'DEMO_SANDBOX':
        return <DemoSandbox lead={lockedLead} />;

      // --- ADMIN ZONE ---
      case 'SETTINGS': 
        return <SettingsNode />;
      case 'IDENTITY': 
        return <IdentityNode />;
      case 'BILLING':
        return <ControlWorkspace activeModule="BILLING" />;
      case 'TIMELINE': 
        return <TimelineNode />;
      case 'ACTIVITY_LOGS': 
        return <ActivityLogs />;
      case 'USAGE_STATS': 
        return <UsageStats />;
      case 'NEXUS_GRAPH': 
        return <NexusGraph leads={leads} />;
      
      default:
        // Generic fallback for any other modules
        if (activeMode === 'DESIGN') return <CreateWorkspace activeModule={activeModule} leads={leads} lockedLead={lockedLead} />;
        if (activeMode === 'OUTREACH') return <SellWorkspace activeModule={activeModule} leads={leads} lockedLead={lockedLead} />;
        if (activeMode === 'ADMIN') return <ControlWorkspace activeModule={activeModule} />;
        return (
          <div className="flex flex-col items-center justify-center h-full py-40 opacity-20">
            <span className="text-6xl mb-4">⚙️</span>
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Initializing Operational Node: {activeModule}</p>
          </div>
        );
    }
  };

  const LayoutComponent = layoutMode === 'ZENITH' ? LayoutZenith : layoutMode === 'COMMAND' ? LayoutCommandCenter : Layout;

  return (
    <div className="h-screen w-full overflow-hidden bg-[#020617]">
      <LayoutComponent
        activeMode={activeMode}
        setActiveMode={(m) => {
          setActiveMode(m);
          // Standard first-module auto-routing
          if (m === 'RESEARCH') setActiveModule('EXECUTIVE_DASHBOARD');
          if (m === 'DESIGN') setActiveModule('VISUAL_STUDIO');
          if (m === 'MEDIA') setActiveModule('VIDEO_PRODUCTION');
          if (m === 'OUTREACH') setActiveModule('CAMPAIGN_ORCHESTRATOR');
          if (m === 'ADMIN') setActiveModule('SETTINGS');
        }}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onSearchClick={() => setIsSearchOpen(true)}
        theater={theater}
        setTheater={setTheater}
        currentLayout={layoutMode}
        setLayoutMode={setLayoutMode as any}
        theme="dark"
        toggleTheme={() => {}}
      >
        {renderContent()}
      </LayoutComponent>

      <CommandPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={handleNavigateSub} 
        theme="dark" 
      />
      <ToastContainer />
    </div>
  );
}