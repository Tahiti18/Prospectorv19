export type WorkspaceType = 'dashboard' | 'intelligence' | 'strategy' | 'creative' | 'campaign' | 'identity' | 'admin' | 'settings';

// Narrowed to the 5 primary modes to satisfy Record types in layouts
export type MainMode = 'RESEARCH' | 'DESIGN' | 'MEDIA' | 'OUTREACH' | 'ADMIN';

export type SubModule = 
  | 'EXECUTIVE_DASHBOARD' | 'SYSTEM_OVERVIEW' | 'SYSTEM_MANUAL' | 'MARKET_DISCOVERY' 
  | 'AUTOMATED_SEARCH' | 'PROSPECT_DATABASE' | 'PIPELINE' | 'STRATEGY_CENTER' 
  | 'STRATEGIC_REASONING' | 'WORKSPACE' | 'MARKET_TRENDS' | 'VISUAL_ANALYSIS' 
  | 'CONTENT_ANALYSIS' | 'BENCHMARK' | 'ANALYTICS_HUB' | 'HEATMAP' 
  | 'USER_GUIDE' | 'VISUAL_STUDIO' | 'BRAND_DNA' | 'MOCKUPS_4K' | 'PRODUCT_SYNTHESIS' 
  | 'CONTENT_IDEATION' | 'ASSET_LIBRARY' | 'VIDEO_PRODUCTION' | 'VIDEO_AUDIT' 
  | 'VIDEO_INSIGHTS' | 'MOTION_LAB' | 'SONIC_STUDIO' | 'MEETING_NOTES' 
  | 'CAMPAIGN_ORCHESTRATOR' | 'PROPOSALS' | 'ROI_CALCULATOR' | 'SEQUENCER' 
  | 'PRESENTATION_BUILDER' | 'DEMO_SANDBOX' | 'DRAFTING' | 'SALES_COACH' 
  | 'AI_CONCIERGE' | 'ELEVATOR_PITCH' | 'FUNNEL_MAP' | 'AGENCY_PLAYBOOK' 
  | 'BILLING' | 'AFFILIATE' | 'IDENTITY' | 'SYSTEM_CONFIG' | 'EXPORT_DATA' 
  | 'CALENDAR' | 'ACTIVITY_LOGS' | 'SETTINGS' | 'NEXUS_GRAPH' | 'TIMELINE' 
  | 'TASK_MANAGER' | 'THEME' | 'USAGE_STATS' | 'TRANSFORMATION_BLUEPRINT'
  | 'PROMPT_INTERFACE' | 'MODEL_BENCH' | 'FACT_CHECK' | 'TRANSLATOR' | 'VIDEO_PITCH'
  | 'ANALYTICS' | 'MODEL_TEST' | 'INTELLIGENCE_SCAN';

export type OutreachStatus = 'cold' | 'queued' | 'sent' | 'opened' | 'replied' | 'booked' | 'won' | 'lost' | 'paused';

export interface Lead {
  id: string;
  businessName: string;
  websiteUrl: string;
  niche: string;
  city: string;
  rank: number;
  phone?: string;
  email?: string;
  leadScore: number;
  assetGrade: 'A' | 'B' | 'C' | 'D';
  socialGap?: string;
  visualProof?: string;
  bestAngle?: string;
  personalizedHook?: string;
  instagram?: string;
  tiktok?: string;
  status: OutreachStatus;
  outreachStatus?: OutreachStatus;
  notes?: string;
  tags?: string[];
  lastContactAt?: number;
  nextFollowUpAt?: number;
  contactUrl?: string;
  brandIdentity?: BrandIdentity;
  campaigns?: Campaign[];
  groundingSources?: Array<{ uri: string; title: string }>;
  locked?: boolean;
  lockedAt?: number;
  lockedByRunId?: string;
  lockExpiresAt?: number;
  outreachHistory?: OutreachLog[];
}

export interface AssetRecord {
  id: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO';
  title: string;
  data: string;
  timestamp: number;
  module: string;
  leadId?: string;
  metadata?: any;
}

export interface BenchmarkReport {
  entityName: string;
  missionSummary: string;
  visualStack: Array<{ label: string; description: string }>;
  sonicStack: Array<{ label: string; description: string }>;
  featureGap: string;
  businessModel: string;
  designSystem: string;
  deepArchitecture: string;
  sources: Array<{ uri: string; title: string }>;
}

export interface VeoConfig {
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}

export interface BrandIdentity {
  colors: string[];
  visualTone: string;
  fontPairing: string;
  extractedImages?: string[];
}

export interface Campaign {
  id: string;
  name: string;
  timestamp: number;
  creatives: CreativeAsset[];
}

export interface CreativeAsset {
  id: string;
  type: 'static' | 'motion';
  angle: 'STORY' | 'PRODUCT' | 'LIFESTYLE' | 'ABSTRACT';
  imageUrl: string;
  videoUrl?: string;
  headline: string;
  subhead: string;
  cta: string;
  status: 'ready' | 'draft';
}

export interface ComputeStats {
  sessionTokens: number;
  sessionCostUsd: number;
  projectedMonthlyUsd: number;
  proCalls: number;
  flashCalls: number;
}

export type OutreachChannel = 'email' | 'linkedin' | 'phone' | 'sms' | 'whatsapp';
export type OutreachMode = 'live' | 'test';

export interface OutreachLog {
  id: string;
  timestamp: number;
  channel: OutreachChannel;
  mode: OutreachMode;
  leadId?: string;
  to?: string;
  subject?: string;
  contentSnippet?: string;
  status: 'SENT' | 'FAILED' | 'DELIVERED';
}

export interface GeminiResult<T> {
  ok: boolean;
  text: string;
  raw: any;
  error?: { message: string };
}

export interface OutreachAssets {
  emailOpeners: string[];
  fullEmail: string;
  callOpener: string;
  voicemail: string;
  smsFollowup: string;
}

export interface EngineResult {
  leads: Lead[];
  rubric: {
    visual: string;
    social: string;
    highTicket: string;
    reachability: string;
    grades: { A: string; B: string; C: string };
  };
  assets: OutreachAssets;
  groundingSources?: Array<{ uri: string; title: string }>;
}