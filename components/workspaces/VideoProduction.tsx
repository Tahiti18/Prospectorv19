import React, { useState, useRef, useEffect } from 'react';
import { Lead, VeoConfig } from '../../types';
import { generateVideoPayload, saveAsset, SESSION_ASSETS } from '../../services/geminiService';
import { toast } from '../../services/toastManager';

interface VideoProductionProps {
  lead?: Lead;
}

export const VideoProduction: React.FC<VideoProductionProps> = ({ lead }) => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [config, setConfig] = useState<VeoConfig>({ aspectRatio: '16:9', resolution: '720p' });
  
  const [startFrame, setStartFrame] = useState<string | null>(null);
  const [endFrame, setEndFrame] = useState<string | null>(null);
  
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const videoGallery = SESSION_ASSETS.filter(a => a.type === 'VIDEO' && (lead ? a.leadId === lead.id : true));

  useEffect(() => {
    if (lead) {
      setPrompt(`Cinematic high-end commercial for ${lead.businessName}. Style: Luxury AI Transformation, 4K depth, professional color grade, dynamic camera sweep.`);
    }
  }, [lead]);

  useEffect(() => {
    if (!taskId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/kie/record-info?taskId=${taskId}`);
        const data = await res.json();
        const curStatus = data?.data?.status || data?.status;
        setStatus(curStatus || 'QUEUED');

        if (curStatus === 'completed' || curStatus === 'success') {
          clearInterval(interval);
          const url = data?.data?.video_url || data?.video_url;
          if (url) {
            setVideoUrl(url);
            saveAsset('VIDEO', `VEO: ${prompt.slice(0, 20)}`, url, 'VIDEO_PRODUCTION', lead?.id);
            toast.success("VEO 3.1 SYNTHESIS COMPLETE");
          }
          setIsGenerating(false);
        } else if (curStatus === 'failed') {
          clearInterval(interval);
          toast.error("VEO SYNTHESIS FAILED");
          setIsGenerating(false);
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [taskId]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (s: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleForge = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setVideoUrl(null);
    try {
      const id = await generateVideoPayload(prompt, lead?.id, startFrame || undefined, endFrame || undefined, config);
      setTaskId(id);
      setStatus('establishing uplink...');
    } catch (e) {
      setIsGenerating(false);
      toast.error("VEO Gateway Busy");
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 p-4 animate-in fade-in duration-700 bg-[#020617]">
      {/* LEFT PANEL: VEO ARCHITECTURE */}
      <aside className="w-[420px] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-10">
         <div className="bg-[#0b1021] border border-slate-800 rounded-[48px] p-10 space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full"></div>
            
            <div className="space-y-4 relative z-10">
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-1 border-b border-slate-800 pb-3">DIMENSIONAL RATIO</h3>
               <div className="grid grid-cols-2 gap-4">
                  {['16:9', '9:16'].map(r => (
                    <button key={r} onClick={() => setConfig({...config, aspectRatio: r as any})} className={`py-4 rounded-2xl text-[10px] font-black border-2 transition-all ${config.aspectRatio === r ? 'bg-emerald-600 border-emerald-500 text-white shadow-2xl' : 'bg-slate-950 border-slate-800 text-slate-600 hover:text-slate-300'}`}>
                      {r === '16:9' ? 'LANDSCAPE (16:9)' : 'PORTRAIT (9:16)'}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                   <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-1">START FRAME</h3>
                   <div onClick={() => startInputRef.current?.click()} className={`aspect-square rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group ${startFrame ? 'border-emerald-500/50 bg-black' : 'border-slate-800 bg-slate-950 hover:border-emerald-500/30'}`}>
                      {startFrame ? <img src={startFrame} className="w-full h-full object-cover" /> : <span className="text-4xl opacity-20 group-hover:scale-110 transition-transform">📷</span>}
                      <input type="file" ref={startInputRef} onChange={(e) => handleFile(e, setStartFrame)} className="hidden" accept="image/*" />
                   </div>
                </div>
                <div className="space-y-4">
                   <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-1">END FRAME</h3>
                   <div onClick={() => endInputRef.current?.click()} className={`aspect-square rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group ${endFrame ? 'border-emerald-500/50 bg-black' : 'border-slate-800 bg-slate-950 hover:border-emerald-500/30'}`}>
                      {endFrame ? <img src={endFrame} className="w-full h-full object-cover" /> : <span className="text-4xl opacity-20 group-hover:scale-110 transition-transform">📷</span>}
                      <input type="file" ref={endInputRef} onChange={(e) => handleFile(e, setEndFrame)} className="hidden" accept="image/*" />
                   </div>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-1">CINEMATIC DIRECTIVE</h3>
               <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-56 bg-slate-950 border border-slate-800 rounded-[40px] p-8 text-sm text-slate-200 focus:border-emerald-500 outline-none resize-none italic font-medium leading-relaxed custom-scrollbar shadow-inner"
                  placeholder="Describe temporal pathing, lighting, and camera motion..."
               />
            </div>

            <button 
              onClick={handleForge}
              disabled={isGenerating || !prompt}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-8 rounded-[40px] text-[14px] font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 disabled:opacity-50 border-b-8 border-emerald-800 relative z-10"
            >
              {isGenerating ? 'UPLINK ACTIVE...' : 'INITIATE VIDEO FORGE'}
            </button>
         </div>
      </aside>

      {/* RIGHT PANEL: OUTPUT & GALLERY */}
      <main className="flex-1 flex flex-col gap-6 bg-[#05091a] border border-slate-800/50 rounded-[56px] p-10 shadow-2xl overflow-hidden relative">
         {/* THEATER PREVIEW */}
         <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 p-8 flex items-center gap-3">
               <div className={`w-2.5 h-2.5 rounded-full ${isGenerating ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-800'}`}></div>
               <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">LIVE PREVIEW DECK</span>
            </div>

            {isGenerating ? (
               <div className="text-center space-y-10 animate-in zoom-in-95 duration-700">
                  <div className="relative w-40 h-40 mx-auto">
                     <div className="absolute inset-0 border-8 border-emerald-900/20 rounded-full"></div>
                     <div className="absolute inset-0 border-8 border-emerald-500 border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-5xl">📽️</div>
                  </div>
                  <div className="space-y-4">
                     <p className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Neural Mesh Synthesis</p>
                     <p className="text-[12px] text-emerald-400 font-bold uppercase tracking-[0.8em] animate-pulse">ESTIMATED COMPLETION: 120S</p>
                  </div>
               </div>
            ) : videoUrl ? (
               <div className="w-full max-w-6xl aspect-video rounded-[56px] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.9)] border-4 border-slate-800/50 bg-black animate-in fade-in duration-1000">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
               </div>
            ) : (
               <div className="opacity-[0.03] grayscale scale-150 select-none pointer-events-none transform -rotate-12">
                  <span className="text-[300px]">📽️</span>
               </div>
            )}
         </div>

         {/* TEMPORAL GALLERY */}
         <div className="h-[250px] bg-[#0b1021]/80 border-t border-slate-800/80 p-8 flex flex-col gap-8 rounded-b-[56px]">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">TEMPORAL ARCHIVE ({videoGallery.length})</h3>
               <button className="text-[10px] font-black text-emerald-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                 <span>⬇️</span> EXPORT_ALL_PAYLOADS
               </button>
            </div>
            <div className="flex-1 flex gap-8 overflow-x-auto pb-4 no-scrollbar">
               {videoGallery.map((v, i) => (
                 <button key={v.id} onClick={() => setVideoUrl(v.data)} className="w-[240px] h-full flex-none rounded-[32px] bg-black border-2 border-slate-800 overflow-hidden relative group transition-all hover:border-emerald-500/50 shadow-2xl">
                    <video src={v.data} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                       <p className="text-[10px] font-black text-white uppercase truncate mb-1">{v.title}</p>
                       <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">RECALL ASSET</p>
                    </div>
                 </button>
               ))}
               {videoGallery.length === 0 && (
                 <div className="w-full flex flex-col items-center justify-center opacity-10 italic gap-4">
                    <span className="text-4xl">📼</span>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">Awaiting first cinematic forge cycle...</p>
                 </div>
               )}
            </div>
         </div>
      </main>
    </div>
  );
};
