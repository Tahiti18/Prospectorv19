import React, { useState, useEffect } from 'react';
import { Lead, AssetRecord } from '../../types';
import { subscribeToAssets, saveAsset } from '../../services/geminiService';
import { kieSunoService } from '../../services/kieSunoService';
import { toast } from '../../services/toastManager';

interface SonicStudioProps {
  lead?: Lead;
}

const INDUSTRY_PRESETS = [
  { id: 'tech', label: 'TECH / SAAS', icon: '⚛️' },
  { id: 'luxury', label: 'LUXURY ESTATE', icon: '💎' },
  { id: 'clinic', label: 'MODERN CLINIC', icon: '⚕️' },
  { id: 'perf', label: 'HIGH PERFORMANCE', icon: '⚡' },
  { id: 'focus', label: 'DEEP FOCUS', icon: '🧘' },
  { id: 'epic', label: 'CINEMATIC EPIC', icon: '🎻' }
];

const GENRES = ['CINEMATIC', 'ELECTRONIC', 'ROCK', 'HIP HOP', 'JAZZ', 'AMBIENT', 'CORPORATE', 'POP', 'SYNTHWAVE', 'LO-FI'];
const ATMOSPHERES = ['UPLIFTING', 'MELANCHOLIC', 'ENERGETIC', 'RELAXING', 'SUSPENSEFUL'];

export const SonicStudio: React.FC<SonicStudioProps> = ({ lead }) => {
  const [prompt, setPrompt] = useState('Background music for Island Blue Cyprus (Luxury Real Estate). Professional, high-quality, engaging, suitable for commercial use., high fidelity, studio quality, grammy award winning, wide stereo, warm analog warmth,');
  const [isInstrumental, setIsInstrumental] = useState(true);
  const [duration, setDuration] = useState('30S');
  const [format, setFormat] = useState('MP3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [activeAsset, setActiveAsset] = useState<AssetRecord | null>(null);

  useEffect(() => {
    const unsub = subscribeToAssets((all) => {
      const audio = all.filter(a => a.type === 'AUDIO');
      setAssets(audio);
      if (audio.length > 0 && !activeAsset) setActiveAsset(audio[0]);
    });
    return () => unsub();
  }, []);

  const handleForge = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    toast.neural("Establishing Frequency Mesh...");
    try {
      await kieSunoService.runFullCycle(prompt, isInstrumental, lead?.id);
    } catch (e) {
      toast.error("Sonic Gateway Timeout");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4 p-2 animate-in fade-in duration-700 bg-[#020617] overflow-hidden">
      {/* LEFT PANEL: PRESETS & THEORY */}
      <aside className="w-[300px] flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2 py-4">
         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
               INDUSTRY PRESETS
            </h3>
            <div className="grid grid-cols-2 gap-3">
               {INDUSTRY_PRESETS.map(p => (
                 <button key={p.id} className="h-24 bg-[#0b1021] border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-emerald-500/50 transition-all group">
                    <span className="text-xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">{p.icon}</span>
                    <span className="text-[8px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">{p.label}</span>
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">GENRE DEFINITION</h3>
            <div className="flex flex-wrap gap-2">
               {GENRES.map(g => (
                 <button key={g} className="px-3 py-1.5 bg-[#0b1021] border border-slate-800 rounded-lg text-[8px] font-black text-slate-500 hover:text-white hover:border-emerald-500 transition-all">
                    {g}
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">ATMOSPHERE</h3>
            <div className="flex flex-wrap gap-2">
               {ATMOSPHERES.map(a => (
                 <button key={a} className="px-3 py-1.5 bg-[#0b1021] border border-slate-800 rounded-lg text-[8px] font-black text-slate-500 hover:text-white hover:border-emerald-500 transition-all">
                    {a}
                 </button>
               ))}
            </div>
         </div>
      </aside>

      {/* CENTER PANEL: PLAYER & GALLERY (IMAGE 4748 REPLICA) */}
      <main className="flex-1 flex flex-col gap-6 bg-[#05091a] border border-slate-800/50 rounded-[48px] p-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
         
         <div className="flex-1 flex flex-col items-center justify-center pt-4">
            <div className="flex w-full max-w-3xl gap-8 mb-10">
               {/* High-Fidelity Cover Art (Exact Square with soft corners) */}
               <div className="w-64 h-64 bg-[#0b1021] rounded-[40px] overflow-hidden border-2 border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] group relative">
                  <img src={activeAsset?.metadata?.coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
               
               {/* Real-time Frequency Analyzer Box */}
               <div className="flex-1 h-64 bg-[#0b1021]/50 border border-slate-800/60 rounded-[40px] p-8 relative flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">FREQ ANALYZER</span>
                  </div>
                  <div className="flex-1 flex items-end justify-center gap-1.5">
                     {[...Array(24)].map((_, i) => (
                       <div key={i} className="w-2 bg-emerald-500/30 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 90 + 10}%`, animationDelay: `${i * 0.05}s` }}></div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="text-center space-y-3 mb-12">
               <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl">
                 {activeAsset?.title || 'ISLAND BLUE HORIZONS'}
               </h2>
               <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
                  SONIC STUDIO <span className="opacity-30">•</span> 10/01/2026
               </p>
            </div>

            {/* Stem Control Strip (Replica) */}
            <div className="w-full max-w-2xl space-y-10">
               <div className="flex justify-center items-center gap-6">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-50">STEMS</span>
                  <div className="flex bg-[#0b1021] p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
                     {['DRUMS', 'BASS', 'VOCALS', 'OTHER'].map(s => (
                       <button key={s} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${s === 'DRUMS' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-600 hover:text-slate-300'}`}>
                         {s}
                       </button>
                     ))}
                  </div>
               </div>

               {/* High-Contrast Progress Bar */}
               <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-800/50 rounded-full relative overflow-hidden group cursor-pointer">
                     <div className="absolute top-0 left-0 h-full w-1/3 bg-white shadow-[0_0_15px_white]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-600 font-mono tracking-tighter">
                     <span>0:00</span>
                     <span>3:08</span>
                  </div>
               </div>

               {/* Large Transport Controls */}
               <div className="flex justify-center items-center gap-12 pt-4">
                  <button className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 active:scale-95"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
                  <button 
                    onClick={togglePlay}
                    className="w-24 h-24 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] border-b-8 border-emerald-800 active:translate-y-1 active:border-b-0 transition-all"
                  >
                     <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                  <button className="text-slate-600 hover:text-white transition-colors transform hover:scale-110 active:scale-95"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
               </div>
            </div>
         </div>

         {/* ASSET GALLERY DRAWER (Replica) */}
         <div className="h-[200px] bg-[#0b1021]/60 border-t border-slate-800/80 p-8 rounded-b-[48px]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">ASSET GALLERY</h3>
               <div className="flex gap-6 text-[9px] font-black text-slate-700 uppercase tracking-widest">
                  <span>{assets.length} AUDIO</span>
                  <span className="opacity-40">0 VISUAL</span>
               </div>
            </div>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
               {assets.map((a) => (
                 <button key={a.id} onClick={() => setActiveAsset(a)} className={`w-28 h-28 flex-none rounded-3xl overflow-hidden border-2 transition-all group relative ${activeAsset?.id === a.id ? 'border-emerald-500 scale-105 shadow-2xl' : 'border-slate-800 grayscale hover:grayscale-0 hover:border-slate-600'}`}>
                    <img src={a.metadata?.coverUrl || 'https://via.placeholder.com/200'} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <span className="text-white font-black text-[9px] uppercase tracking-widest">PLAY</span>
                    </div>
                 </button>
               ))}
               <button className="w-28 h-28 flex-none border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-700 hover:border-emerald-500 transition-all hover:bg-emerald-500/5 group">
                  <span className="text-4xl group-hover:scale-125 group-hover:text-emerald-500 transition-all">+</span>
               </button>
            </div>
         </div>
      </main>

      {/* RIGHT PANEL: ARCHITECTURE (Replica) */}
      <aside className="w-[360px] flex flex-col gap-6 overflow-y-auto custom-scrollbar pl-2 py-4">
         <div className="bg-[#0b1021] border border-slate-800 rounded-[40px] p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full"></div>
            <div className="flex justify-between items-center relative z-10">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">SONIC PROMPT</h3>
               <button className="text-[9px] font-black text-indigo-400 uppercase flex items-center gap-2 hover:text-white transition-colors group">
                 <span className="group-hover:animate-pulse">✨</span> MAGIC WAND
               </button>
            </div>
            <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               className="w-full h-48 bg-[#020617] border border-slate-800 rounded-[32px] p-6 text-[12px] font-bold text-slate-300 focus:border-emerald-500 outline-none resize-none italic leading-relaxed custom-scrollbar shadow-inner"
            />
         </div>

         <div className="bg-[#0b1021] border border-slate-800 rounded-[40px] p-10 space-y-10 shadow-2xl relative overflow-hidden flex-1">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] relative z-10 border-b border-slate-800 pb-4">CONFIGURATION</h3>
            
            <div className="grid grid-cols-2 gap-6 relative z-10">
               <div className="space-y-3">
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1">DURATION</span>
                  <button onClick={() => setDuration('30S')} className={`w-full py-4 rounded-2xl text-[10px] font-black border transition-all ${duration === '30S' ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg' : 'bg-[#020617] border-slate-800 text-slate-600 hover:text-slate-400'}`}>30S (AI)</button>
               </div>
               <div className="space-y-3">
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1">MODE</span>
                  <button onClick={() => setIsInstrumental(!isInstrumental)} className={`w-full py-4 rounded-2xl text-[10px] font-black border transition-all ${isInstrumental ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg' : 'bg-[#020617] border-slate-800 text-slate-600 hover:text-slate-400'}`}>
                    {isInstrumental ? 'INSTRUMENTAL' : 'VOCAL'}
                  </button>
               </div>
            </div>

            <div className="space-y-4 relative z-10">
               <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1">EXPORT FORMAT</span>
               <div className="flex gap-3">
                  {['MP3', 'WAV'].map(f => (
                    <button key={f} onClick={() => setFormat(f)} className={`flex-1 py-4 rounded-2xl text-[10px] font-black border transition-all ${format === f ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'bg-[#020617] border-slate-800 text-slate-600'}`}>{f}</button>
                  ))}
               </div>
            </div>

            <div className="space-y-4 relative z-10">
               <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest ml-1">COVER ART</span>
               <div className="grid grid-cols-2 gap-4">
                  <button className="h-28 bg-[#020617] border border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 hover:border-emerald-500/50 transition-all group">
                     <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">AI COVER</span>
                     <span className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">Create Art</span>
                  </button>
                  <button className="h-28 bg-[#020617] border border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 hover:border-emerald-500/50 transition-all group">
                     <span className="text-[10px] font-black text-emerald-500 group-hover:text-white uppercase tracking-widest">UPLOAD</span>
                     <span className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">Custom</span>
                  </button>
               </div>
            </div>

            <button 
              onClick={handleForge}
              disabled={isGenerating}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-8 rounded-[32px] text-[13px] font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 disabled:opacity-50 border-b-8 border-emerald-800 mt-4 relative z-10"
            >
              {isGenerating ? 'FORGING FREQUENCY...' : 'INITIATE SONIC FORGE'}
            </button>
         </div>
      </aside>
    </div>
  );
};

const togglePlay = () => {};
