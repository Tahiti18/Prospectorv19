import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LayoutZenith } from './components/LayoutZenith';
import { LayoutCommandCenter } from './components/LayoutCommandCenter';
import { Layout } from './components/Layout';
import { ToastContainer } from './components/ToastContainer';
import { CommandPalette } from './components/CommandPalette';
import { Dashboard } from './components/Dashboard';
import { IntelligenceWorkspace } from './components/IntelligenceWorkspace';
import { StrategyCenter } from './components/workspaces/StrategyCenter';
import { VisualStudio } from './components/workspaces/VisualStudio';
import { CampaignOrchestrator } from './components/workspaces/CampaignOrchestrator';
import { IdentityNode } from './components/workspaces/IdentityNode';
import { SettingsNode } from './components/workspaces/SettingsNode';
import { ProspectDatabase } from './components/workspaces/ProspectDatabase';
import { TargetList } from './components/workspaces/TargetList';
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
import { Lead, WorkspaceType, MainMode, SubModule } from './types';
import { db } from './services/automation/db';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeMode, setActiveMode] = useState<MainMode>('RESEARCH');
  const [activeModule, setActiveModule] = useState<SubModule>('EXECUTIVE_DASHBOARD');
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('dashboard');
  const [layoutMode, setLayoutMode] = useState<'ZENITH' | 'COMMAND' | 'LEGACY'>('ZENITH');
  const [theater, setTheater] = useState('CYPRUS');
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
    setActiveWorkspace('strategy');
  };

  const handleNavigateSub = (mode: MainMode, mod: SubModule) => {
    setActiveMode(mode);
    setActiveModule(mod);
    // Sync legacy workspace type if needed
    if (mode === 'RESEARCH' && mod === 'EXECUTIVE_DASHBOARD') setActiveWorkspace('dashboard');
    if (mod === 'MARKET_DISCOVERY') setActiveWorkspace('intelligence');
    if (mod === 'STRATEGY_CENTER') setActiveWorkspace('strategy');
  };

  const lockedLead = leads.find(l => l.id === lockedLeadId);

  const renderContent = () => {
    switch (activeModule) {
      case 'EXECUTIVE_DASHBOARD': return <Dashboard leads={leads} onSelectLead={handleLockLead} />;
      case 'MARKET_DISCOVERY': return <MarketDiscovery market={theater} onLeadsGenerated={(nl) => setLeads(prev => [...nl, ...prev])} />;
      case 'STRATEGY_CENTER': return <StrategyCenter lead={lockedLead} onUpdateLead={db.saveLeads as any} onNavigate={handleNavigateSub} />;
      case 'VISUAL_STUDIO': return <VisualStudio leads={leads} lockedLead={lockedLead} />;
      case 'CAMPAIGN_ORCHESTRATOR': return <CampaignOrchestrator leads={leads} lockedLead={lockedLead} onNavigate={handleNavigateSub} onLockLead={setLockedLeadId} onUpdateLead={db.saveLeads as any} />;
      case 'PROSPECT_DATABASE': return <ProspectDatabase leads={leads} lockedLeadId={lockedLeadId} onLockLead={handleLockLead} onInspect={handleLockLead} />;
      case 'AUTOMATED_SEARCH': return <AutomatedSearch market={theater} onNewLeads={(nl) => setLeads(prev => [...nl, ...prev])} />;
      case 'TRANSFORMATION_BLUEPRINT': return <TransformationBlueprint onNavigate={handleNavigateSub} />;
      case 'USER_GUIDE': return <UserGuide onNavigate={handleNavigateSub} />;
      case 'BENCHMARK': return <BenchmarkNode lead={lockedLead} />;
      case 'ARTICLE_INTEL': return <ArticleIntel lead={lockedLead} />;
      case 'VIDEO_AUDIT': return <VideoAI lead={lockedLead} />;
      case 'STRATEGIC_REASONING': return <DeepLogic lead={lockedLead} />;
      case 'MARKET_TRENDS': return <MarketTrends lead={lockedLead} />;
      case 'NEXUS_GRAPH': return <NexusGraph leads={leads} />;
      case 'TIMELINE': return <TimelineNode />;
      case 'ACTIVITY_LOGS': return <ActivityLogs />;
      case 'USAGE_STATS': return <UsageStats />;
      case 'ANALYTICS_HUB': return <AnalyticsHub leads={leads} />;
      case 'HEATMAP': return <Heatmap leads={leads} market={theater} />;
      case 'PRODUCT_SYNTHESIS': return <ProductSynth lead={lockedLead} />;
      case 'PRESENTATION_BUILDER': return <DeckArch lead={lockedLead} />;
      case 'FUNNEL_MAP': return <FunnelMap lead={lockedLead} />;
      case 'ASSET_LIBRARY': return <AssetLibrary />;
      case 'VIDEO_PRODUCTION': return <VideoProduction lead={lockedLead} />;
      case 'SONIC_STUDIO': return <SonicStudio lead={lockedLead} />;
      case 'SETTINGS': return <SettingsNode />;
      case 'IDENTITY': return <IdentityNode />;
      default:
        // Context-aware generic containers
        if (activeMode === 'DESIGN') return <CreateWorkspace activeModule={activeModule} leads={leads} lockedLead={lockedLead} />;
        if (activeMode === 'OUTREACH') return <SellWorkspace activeModule={activeModule} leads={leads} lockedLead={lockedLead} />;
        if (activeMode === 'ADMIN') return <ControlWorkspace activeModule={activeModule} />;
        return <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">Node Development in Progress</div>;
    }
  };

  const LayoutComponent = layoutMode === 'ZENITH' ? LayoutZenith : layoutMode === 'COMMAND' ? LayoutCommandCenter : Layout;

  return (
    <div className="h-screen w-full overflow-hidden">
      <LayoutComponent
        activeMode={activeMode}
        setActiveMode={setActiveMode}
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
