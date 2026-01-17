import React, { useState } from 'react';
import { MainMode, SubModule } from '../../types';

interface UserGuideProps {
  onNavigate: (mode: MainMode, mod: SubModule) => void;
}

interface ModuleDetail {
  id: SubModule;
  mode: MainMode;
  title: string;
  mission: string;
  input: string;
  output: string;
  useCase: string;
  tags: string[];
}

const MODULE_REGISTRY: ModuleDetail[] = [
  // --- RESEARCH ZONE (16 MODULES) ---
  { id: 'EXECUTIVE_DASHBOARD', mode: 'RESEARCH', title: 'Executive Dashboard', mission: 'Aggregates all active agency telemetry, market discoveries, and automation runs into a single high-level command view.', input: 'System Stats, Ledger Data', output: 'Live Telemetry Widgets', useCase: 'High-level agency oversight.', tags: ['Core', 'Ops'] },
  { id: 'MARKET_DISCOVERY', mode: 'RESEARCH', title: 'Market Discovery', mission: 'Scans regional theater data to identify high-ticket business prospects based on industry density and commercial signals.', input: 'Region, Niche Keywords', output: 'Verified Lead Arrays', useCase: 'Targeted geographic acquisition.', tags: ['Search', 'Sales'] },
  { id: 'AUTOMATED_SEARCH', mode: 'RESEARCH', title: 'Auto Search Swarm', mission: 'Autonomous crawler swarm that extracts business signals and brand vulnerabilities in real-time.', input: 'Vulnerability Directives', output: 'Live Opportunity Feed', useCase: 'Passive pipeline development.', tags: ['Automation', 'Signal'] },
  { id: 'STRATEGY_CENTER', mode: 'RESEARCH', title: 'Strategy Hub', mission: 'Comprehensive audit node for individual lead profiles, converting raw data into transformation opportunities.', input: 'Prospect Digital Footprint', output: 'Transformation Roadmap', useCase: 'Sales call tactical planning.', tags: ['Strategy', 'Audit'] },
  { id: 'STRATEGIC_REASONING', mode: 'RESEARCH', title: 'Deep Logic Lab', mission: 'High-level cognitive reasoning engine for solving complex business roadblocks and architecting closing logic.', input: 'Strategic Challenges', output: 'Solution Pathways', useCase: 'Handling high-stakes objections.', tags: ['Reasoning', 'Logic'] },
  { id: 'WORKSPACE', mode: 'RESEARCH', title: 'Strategic Workspace', mission: 'Secure interface for ad-hoc intelligence gathering and collaborative drafting with the neural core.', input: 'Intelligence Directives', output: 'Drafted Strategic Assets', useCase: 'Quick research and drafting.', tags: ['Chat', 'AI'] },
  { id: 'MARKET_TRENDS', mode: 'RESEARCH', title: 'Trend Monitor', mission: 'Real-time grounding in global trends to ensure outreach messaging aligns with the current cultural zeitgeist.', input: 'Web Grounding Vectors', output: 'Viral Relevance Reports', useCase: 'Timely marketing engagement.', tags: ['Viral', 'Grounding'] },
  { id: 'VISUAL_ANALYSIS', mode: 'RESEARCH', title: 'Vision Intel', mission: 'Neural audit of brand aesthetics to identify trust-killing design deficits and authority gaps.', input: 'Static Brand Plates', output: 'Design Grade Matrix', useCase: 'Visual authority auditing.', tags: ['Vision', 'Audit'] },
  { id: 'VIDEO_INSIGHTS', mode: 'RESEARCH', title: 'Media Insights', mission: 'Temporal deconstruction of video assets to analyze pacing, narrative hooks, and retention benchmarks.', input: 'Video URL Source', output: 'Structural Deconstruction', useCase: 'Refining media strategies.', tags: ['Video', 'Intel'] },
  { id: 'CONTENT_ANALYSIS', mode: 'RESEARCH', title: 'Content Analysis', mission: 'Hyper-speed synthesis of long-form documentation into concise executive summaries.', input: 'Source Documentation', output: 'Executive Synthesis', useCase: 'Rapid competitive research.', tags: ['Text', 'Efficiency'] },
  { id: 'BENCHMARK', mode: 'RESEARCH', title: 'Reverse Engineer', mission: 'Technical deconstruction of competitor tech stacks and business models.', input: 'Competitor Digital Node', output: 'Comparative Gap Analysis', useCase: 'Market disruption strategy.', tags: ['Analysis', 'Tech'] },
  { id: 'ANALYTICS_HUB', mode: 'RESEARCH', title: 'Market Intelligence', mission: 'Macro-level evaluation of industry datasets to map regional opportunity spikes.', input: 'Aggregated Ledger Data', output: 'Opportunity Heatmaps', useCase: 'Macro-market positioning.', tags: ['Macro', 'Data'] },
  { id: 'HEATMAP', mode: 'RESEARCH', title: 'Target Heatmap', mission: 'Visualization of prospect density and scoring across a geographic theater.', input: 'Ledger Coordinates', output: 'Visual Cluster Map', useCase: 'Regional planning.', tags: ['Map', 'Visual'] },
  { id: 'FACT_CHECK', mode: 'RESEARCH', title: 'Fact Checker', mission: 'Grounded verification of business claims and market data points.', input: 'Claim Strings', output: 'Verification Report', useCase: 'Securing sales integrity.', tags: ['Trust', 'Truth'] },
  { id: 'PROSPECT_DATABASE', mode: 'RESEARCH', title: 'Lead Database', mission: 'Central CRM ledger for managing identified prospects and engagement history.', input: 'Discovery Results', output: 'Unified Lead Records', useCase: 'Database management.', tags: ['CRM', 'Data'] },
  { id: 'PIPELINE', mode: 'RESEARCH', title: 'Growth Pipeline', mission: 'Visual deal tracking from reconnaissance to final contract signature.', input: 'Lead Status State', output: 'Kanban Sales View', useCase: 'Pipeline management.', tags: ['Sales', 'Track'] },

  // --- DESIGN ZONE (7 MODULES) ---
  { id: 'VISUAL_STUDIO', mode: 'DESIGN', title: 'Creative Studio', mission: 'Generates high-fidelity brand assets and commercial photography from pure text directives.', input: 'Aesthetic Directives', output: '4K Commercial Renders', useCase: 'Creative asset production.', tags: ['Creative', 'Image'] },
  { id: 'BRAND_DNA', mode: 'DESIGN', title: 'Brand DNA', mission: 'Extracts core identity markers from any URL to maintain total visual consistency.', input: 'Website URL', output: 'Brand Identity Matrix', useCase: 'Identity synchronization.', tags: ['Extraction', 'Branding'] },
  { id: 'MOCKUPS_4K', mode: 'DESIGN', title: 'Mockup Forge', mission: 'Creates photorealistic commercial mockups for products in premium environments.', input: 'Asset Plates', output: 'Premium Studio Renders', useCase: 'Visual proof of transformation.', tags: ['Product', '3D'] },
  { id: 'PRODUCT_SYNTHESIS', mode: 'DESIGN', title: 'Offer Architecture', mission: 'Architects high-ticket service bundles and product offers for target clients.', input: 'Capability Data', output: 'Structured Value Stack', useCase: 'Offer re-engineering.', tags: ['Offer', 'Pricing'] },
  { id: 'CONTENT_IDEATION', mode: 'DESIGN', title: 'Flash Spark', mission: 'High-volume generation of creative hooks and viral themes.', input: 'Strategy Brief', output: 'Categorized Idea Matrix', useCase: 'Editorial planning.', tags: ['Ideas', 'Viral'] },
  { id: 'ASSET_LIBRARY', mode: 'DESIGN', title: 'Media Vault', mission: 'Persistent repository for all content created within the OS ecosystem.', input: 'Generated Media', output: 'Organized Reservoir', useCase: 'Asset management.', tags: ['Storage', 'Files'] },
  { id: 'FLASH_SPARK', mode: 'DESIGN', title: 'Neural Spark', mission: 'Ultra-fast content hooks designed for rapid deployment.', input: 'Lead Context', output: 'Deployable Copy Sparks', useCase: 'Velocity content.', tags: ['Speed', 'AI'] },

  // --- MEDIA ZONE (6 MODULES) ---
  { id: 'VIDEO_PRODUCTION', mode: 'MEDIA', title: 'Video Studio', mission: 'Cinematic video synthesis engine producing professional short-form ads via VEO 3.1.', input: 'Cinematic Prompts', output: 'High-Fidelity MP4', useCase: 'Scalable video production.', tags: ['Motion', 'Veo'] },
  { id: 'VIDEO_AUDIT', mode: 'MEDIA', title: 'Video Audit', mission: 'Critiques existing video assets for engagement and production value.', input: 'Video Link', output: 'Creative Audit Report', useCase: 'Improving client media.', tags: ['Critique', 'Media'] },
  { id: 'MOTION_LAB', mode: 'MEDIA', title: 'Motion Lab', mission: 'Pre-production storyboard architecture for complex narrative videos.', input: 'Narrative Script', output: 'Animated Storyboard', useCase: 'Pre-production design.', tags: ['Storyboard', 'Anim'] },
  { id: 'SONIC_STUDIO', mode: 'MEDIA', title: 'Sonic Forge', mission: 'Comprehensive audio engineering for soundtracks and original brand music.', input: 'Vibe/Genre Directives', output: 'Studio Audio Files', useCase: 'Media scoring.', tags: ['Audio', 'Music'] },
  { id: 'MEETING_NOTES', mode: 'MEDIA', title: 'Executive Scribe', mission: 'Synthesizes meeting audio into actionable mission checklists and briefs.', input: 'Transcript Text', output: 'Scribe Report', useCase: 'Workflow sync.', tags: ['Scribe', 'Tasks'] },
  { id: 'CINEMA_INTEL', mode: 'MEDIA', title: 'Cinema Intel', mission: 'Exhaustive deconstruction of competitor video strategy and hooks.', input: 'Competitor Video', output: 'Intelligence Briefing', useCase: 'Media reconnaissance.', tags: ['Intel', 'Video'] },

  // --- OUTREACH ZONE (10 MODULES) ---
  { id: 'CAMPAIGN_ORCHESTRATOR', mode: 'OUTREACH', title: 'Campaign Architect', mission: 'End-to-end orchestration of multi-channel outreach campaigns.', input: 'Dossier & Assets', output: 'Complete Campaign Suite', useCase: 'Scaling client acquisition.', tags: ['Campaign', 'Auto'] },
  { id: 'PROPOSALS', mode: 'OUTREACH', title: 'Proposal Builder', mission: 'Generates high-conversion Magic Links for strategic deal closure.', input: 'Deal Parameters', output: 'Interactive Proposal', useCase: 'Closing premium deals.', tags: ['Closing', 'Copy'] },
  { id: 'ROI_CALCULATOR', mode: 'OUTREACH', title: 'Value Projector', mission: 'Mathematical modeling to quantify revenue lift from AI transformation.', input: 'LTV, Conv Rates', output: 'ROI Growth Report', useCase: 'Value justification.', tags: ['Math', 'Finance'] },
  { id: 'SEQUENCER', mode: 'OUTREACH', title: 'Outreach Builder', mission: 'Architects multi-day engagement flows across Email and LinkedIn.', input: 'Narrative Core', output: 'Engagement Schedule', useCase: 'Drip automation.', tags: ['Drip', 'Email'] },
  { id: 'PRESENTATION_BUILDER', mode: 'OUTREACH', title: 'Deck Architect', mission: 'Narrative and structural design for high-ticket sales decks.', input: 'Brand Story', output: 'Slide Architecture', useCase: 'Sales presentations.', tags: ['Sales', 'Build'] },
  { id: 'DEMO_SANDBOX', mode: 'OUTREACH', title: 'Growth Simulator', mission: 'Predictive modeling for testing market and scaling scenarios.', input: 'Market Variables', output: 'Simulation Data', useCase: 'Scenario selling.', tags: ['Simulation', 'Growth'] },
  { id: 'DRAFTING', mode: 'OUTREACH', title: 'Drafting Portal', mission: 'Distraction-free environment for polishing outbound copy.', input: 'AI Drafts', output: 'Polished Copy', useCase: 'Copywriting.', tags: ['Writing', 'Edit'] },
  { id: 'SALES_COACH', mode: 'OUTREACH', title: 'Strategic Coach', mission: 'Tactical guidance engine for objection handling and negotiation.', input: 'Sales Obstacles', output: 'Coach Directives', useCase: 'Live support.', tags: ['Coach', 'Strat'] },
  { id: 'AI_CONCIERGE', mode: 'OUTREACH', title: 'Neural Agent', mission: 'Proof-of-concept AI concierge for automated lead qualification.', input: 'Knowledge Base', output: 'Interactive POC', useCase: 'Service demo.', tags: ['Agent', 'Demo'] },
  { id: 'ELEVATOR_PITCH', mode: 'OUTREACH', title: 'Pitch Generator', mission: 'Crafts 30-second introductory scripts for rapid value delivery.', input: 'Offer DNA', output: 'Value Scripts', useCase: 'Cold calling.', tags: ['Pitch', 'Hook'] },

  // --- ADMIN ZONE (11 MODULES) ---
  { id: 'SETTINGS', mode: 'ADMIN', title: 'Global Settings', mission: 'Configuration of system preferences and security protocols.', input: 'Global Prefs', output: 'System State', useCase: 'General admin.', tags: ['Admin', 'Config'] },
  { id: 'IDENTITY', mode: 'ADMIN', title: 'Agency Identity', mission: 'Configures your agency’s brand profile and output style system-wide.', input: 'Agency Mission', output: 'Brand Core', useCase: 'Personalization.', tags: ['Profile', 'Identity'] },
  { id: 'BILLING', mode: 'ADMIN', title: 'Financials', mission: 'Oversight of resource allocation, credits, and subscription status.', input: 'Usage Data', output: 'Financial Invoices', useCase: 'Budget control.', tags: ['Finance', 'Usage'] },
  { id: 'AFFILIATE', mode: 'ADMIN', title: 'Partners', mission: 'Management node for referral growth networks and commissions.', input: 'Partner Data', output: 'Comm Matrix', useCase: 'Network growth.', tags: ['Partners', 'Sales'] },
  { id: 'SYSTEM_CONFIG', mode: 'ADMIN', title: 'Core Config', mission: 'Advanced technical parameters for optimizing neural core performance.', input: 'Tech Specs', output: 'Optimized Core', useCase: 'Infrastructure.', tags: ['Core', 'Technical'] },
  { id: 'PROMPT_INTERFACE', mode: 'ADMIN', title: 'Prompt Lab', mission: 'Advanced interface for testing complex neural directives.', input: 'Raw Directives', output: 'Inference Logs', useCase: 'Direct engineering.', tags: ['Engineering', 'Lab'] },
  { id: 'ACTIVITY_LOGS', mode: 'ADMIN', title: 'Activity Trace', mission: 'Persistent trace of all OS activity and decision vectors.', input: 'Event Stream', output: 'Trace Table', useCase: 'Audit history.', tags: ['Logs', 'Security'] },
  { id: 'TIMELINE', mode: 'ADMIN', title: 'Operations Timeline', mission: 'Historical view of system operations and project milestones.', input: 'Log Buffer', output: 'Operational Feed', useCase: 'History review.', tags: ['Timeline', 'History'] },
  { id: 'NEXUS_GRAPH', mode: 'ADMIN', title: 'Nexus Map', mission: 'Entity relationship visualization across the prospect database.', input: 'Ledger Data', output: 'Force Graph', useCase: 'Network analysis.', tags: ['Data', 'Map'] },
  { id: 'TASK_MANAGER', mode: 'ADMIN', title: 'Task Manager', mission: 'Checklist matrix for coordinating agency team deployment.', input: 'Project Scope', output: 'Actionable Tasks', useCase: 'Coordination.', tags: ['Tasks', 'Checklist'] },
  { id: 'USAGE_STATS', mode: 'ADMIN', title: 'Resource Stats', mission: 'Detailed reporting on token and API credit consumption.', input: 'API Usage', output: 'Cost Matrix', useCase: 'ROI monitoring.', tags: ['Cost', 'Compute'] }
];

export const UserGuide: React.FC<UserGuideProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('');
  const [activeZone, setActiveZone] = useState<MainMode | 'ALL'>('ALL');

  const filtered = MODULE_REGISTRY.filter(m => 
    (activeZone === 'ALL' || m.mode === activeZone) &&
    (m.title.toLowerCase().includes(filter.toLowerCase()) || 
     m.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())) ||
     m.mission.toLowerCase().includes(filter.toLowerCase()))
  );

  const zones: { id: MainMode | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'MASTER_INDEX' },
    { id: 'RESEARCH', label: 'RESEARCH' },
    { id: 'DESIGN', label: 'DESIGN' },
    { id: 'MEDIA', label: 'MEDIA' },
    { id: 'OUTREACH', label: 'OUTREACH' },
    { id: 'ADMIN', label: 'ADMIN' }
  ];

  return (
    <div className="max-w-[1750px] mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-1000 pb-60">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b-2 border-emerald-500/20 pb-16 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="space-y-6 max-w-5xl relative z-10">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-600/10 border border-emerald-500/30 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.5em]">Official OS Registry</span>
           </div>
           <h1 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">
             SYSTEM <span className="text-emerald-500 italic">MANUAL</span>
           </h1>
           <p className="text-2xl text-slate-400 font-medium leading-relaxed font-serif italic max-w-4xl">
             Explore the exhaustive library of 58 integrated Prospector OS modules. Every neural node, strategic lab, and creative forge is documented here for enterprise agency mastery.
           </p>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-3xl p-6 border-2 border-slate-800 rounded-[40px] flex flex-col md:flex-row gap-6 items-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
         <div className="flex-1 w-full relative">
            <input 
              value={filter} onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-[#0b1021] border border-slate-800 rounded-2xl px-12 py-6 text-sm font-bold text-white outline-none focus:border-emerald-500 transition-all shadow-inner placeholder-slate-700"
              placeholder="SEARCH THE SYSTEM REGISTRY..."
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         </div>
         <div className="flex bg-[#0b1021] border border-slate-800 rounded-2xl p-1.5 overflow-x-auto no-scrollbar max-w-full shadow-lg">
            {zones.map(z => (
              <button 
                key={z.id} 
                onClick={() => setActiveZone(z.id)} 
                className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeZone === z.id ? 'bg-emerald-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
              >
                {z.label}
              </button>
            ))}
         </div>
      </div>

      {/* MODULE GRID - 3 COLUMNS HIGH DENSITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
         {filtered.length === 0 ? (
           <div className="col-span-full py-60 text-center opacity-30 border-4 border-dashed border-slate-800 rounded-[64px] flex flex-col items-center justify-center">
              <span className="text-8xl mb-10">🔍</span>
              <h3 className="text-2xl font-black uppercase tracking-[0.5em] text-slate-500 italic">No Registry Match Found</h3>
           </div>
         ) : filtered.map(m => (
           <div key={m.id} onClick={() => onNavigate(m.mode, m.id)} className="bg-[#0b1021] border-2 border-slate-800/80 rounded-[56px] p-12 flex flex-col group hover:border-emerald-500/50 transition-all cursor-pointer relative overflow-hidden shadow-2xl hover:-translate-y-2 duration-500">
              {/* Background ID Watermark */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-[150px] font-black italic select-none group-hover:opacity-[0.05] transition-opacity leading-none uppercase">
                {m.id.slice(0, 2)}
              </div>

              <div className="flex justify-between items-start mb-10 relative z-10">
                 <span className="px-4 py-1.5 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest">{m.mode}</span>
                 <div className="flex flex-wrap gap-2 justify-end">
                    {m.tags.map(t => <span key={t} className="text-[8px] font-black text-slate-500 uppercase border border-slate-800 px-3 py-1 rounded-full whitespace-nowrap group-hover:text-slate-300 transition-colors">{t}</span>)}
                 </div>
              </div>

              <div className="mb-10 relative z-10 flex-1">
                 <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">{m.title}</h3>
                 <p className="text-[13px] text-slate-400 font-medium italic mt-5 leading-relaxed">"{m.mission}"</p>
              </div>

              <div className="space-y-5 mt-auto relative z-10">
                 <div className="p-6 bg-slate-950/60 rounded-[32px] border border-slate-800 group-hover:border-emerald-500/30 transition-all">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">INPUT_VECTOR</span>
                       <span className="text-[7px] font-black text-emerald-500/50">READY</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide truncate">{m.input}</p>
                 </div>
                 <div className="pt-6 border-t border-slate-800/80 group-hover:border-emerald-500/40 transition-colors">
                    <span className="text-[8px] font-black text-slate-600 uppercase block mb-1.5 tracking-widest">ENTERPRISE USE-CASE</span>
                    <p className="text-[12px] font-black text-white uppercase italic tracking-tight">{m.useCase}</p>
                 </div>
              </div>

              {/* Decorative architectural markers */}
              <div className="absolute top-10 left-10 w-10 h-10 border-t-2 border-l-2 border-slate-800 group-hover:border-emerald-500/40 transition-colors"></div>
              <div className="absolute bottom-10 right-10 w-10 h-10 border-b-2 border-r-2 border-slate-800 group-hover:border-emerald-500/40 transition-colors"></div>
           </div>
         ))}
      </div>
      
      {/* FOOTER CTA */}
      <div className="bg-[#0b1021] border-2 border-emerald-500/20 rounded-[100px] p-24 text-center space-y-12 shadow-[0_0_100px_rgba(16,185,129,0.05)] relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-3 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"></div>
         <div className="space-y-8 relative z-10">
            <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
              READY TO <span className="text-emerald-500">OPERATE?</span>
            </h2>
            <p className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto italic font-serif leading-relaxed">
              Mastering the Prospector OS workflow is the key to closing high-ticket agency deals. Return to the Executive Dashboard to initialize your first discovery sweep.
            </p>
         </div>
         <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative z-10">
            <button 
               onClick={() => onNavigate('RESEARCH', 'EXECUTIVE_DASHBOARD')}
               className="px-20 py-7 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[40px] text-[16px] font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95 transition-all border-b-8 border-emerald-800"
            >
               Return to Mission Control
            </button>
         </div>
      </div>
    </div>
  );
};
