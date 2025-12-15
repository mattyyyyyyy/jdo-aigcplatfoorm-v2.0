import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import { 
  Mic, 
  Phone, 
  PhoneOff, 
  ChevronDown, 
  Play, 
  Save, 
  User, 
  ArrowLeft,
  Send,
  AlertTriangle,
  Upload,
  Globe,
  History,
  X,
  Box,
  Crown,
  Cat,
  Ghost,
  Sword,
  Sparkles,
  Zap,
  Flower,
  Moon,
  MessageSquare,
  Check,
  Glasses,
  Shirt,
  Video,
  Square,
  Volume2,
  Gauge,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCcw,
  Footprints, 
  Scissors,
  Loader2,
  Square as SquareIcon,
  Layers,
  Palette,
  Search,
  GripVertical,
  Activity,
  FileBox,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  PlayCircle,
  Undo2,
  Redo2,
  Wind,
  PauseCircle,
  Music,
  CaseSensitive,
  Binary,
  Sigma,
  Languages,
  HandMetal,
  FileCheck,
  FileText,
  FileInput,
  Trash2,
  Clock,
  Image as ImageIcon,
  Monitor,
  LayoutTemplate
} from 'lucide-react';
import { AppModule, Asset, ChatMessage } from '../types';

interface StudioProps {
  module: AppModule;
  onChangeModule: (module: AppModule) => void;
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
  bgMode: 'default' | 'themeA' | 'themeB';
  onBack: () => void;
  onOpenSettings: () => void;
  savedAssets: Asset[];
  onSaveAsset: (asset: Asset) => void;
  t: any;
}

// --- New Voice Config Constants ---
const VOICE_LANGUAGES = [
  { id: 'zh', name: '中文' },
  { id: 'en', name: 'English' }
];

const VOICE_PRESETS = [
  { id: 'gentle_sister', name: '温柔姐姐', gender: 'female', color: '#fbcfe8' },
  { id: 'youthful_maiden', name: '青春少女', gender: 'female', color: '#f472b6' },
  { id: 'playful_girl', name: '俏皮女童', gender: 'female', color: '#fb7185' },
  { id: 'sunny_boy', name: '阳光少年', gender: 'male', color: '#facc15' },
  { id: 'artsy_guy', name: '文艺小哥', gender: 'male', color: '#60a5fa' },
  { id: 'obedient_shota', name: '乖巧正太', gender: 'male', color: '#4ade80' },
  { id: 'news_anchor', name: '新闻播报员', gender: 'male', color: '#3b82f6' },
  { id: 'customer_service_zhang', name: '客服小张', gender: 'female', color: '#ec4899' },
  { id: 'anime_girl', name: '动漫少女', gender: 'female', color: '#d946ef' },
  { id: 'ancient_sister', name: '古装姐', gender: 'female', color: '#8b5cf6' },
  { id: 'teacher_zhang', name: '小张老师', gender: 'male', color: '#10b981' },
  { id: 'guide_jin', name: '导购小金', gender: 'male', color: '#f59e0b' }
];

const VOICE_EMOTIONS = [
  { id: 'default', name: '默认' },
  { id: 'happy', name: '开心' },
  { id: 'sad', name: '悲伤' },
  { id: 'angry', name: '生气' },
  { id: 'excited', name: '激动' },
  { id: 'whisper', name: '低语' }
];

const ACTIONS = [
  { id: 'wave', name: 'Wave / 挥手', icon: '👋' },
  { id: 'greet', name: 'Greet / 问候', icon: '🤝' },
  { id: 'run', name: 'Run / 跑步', icon: '🏃' },
  { id: 'walk', name: 'Walk / 走路', icon: '🚶' },
  { id: 'idle', name: 'Idle / 待机', icon: '🧍' },
  { id: 'dance', name: 'Dance / 跳舞', icon: '💃' },
  { id: 'jump', name: 'Jump / 跳跃', icon: '⏫' },
  { id: 'sit', name: 'Sit / 坐下', icon: '🪑' },
];

const BACKGROUNDS = [
  { id: 'green_screen', name: '绿幕', type: 'color', value: '#00FF00' },
  { id: 'newsroom', name: '新闻直播间', type: 'image', value: 'https://images.unsplash.com/photo-1495020686659-d507f9506685?q=80&w=600&auto=format&fit=crop' },
  { id: 'classroom', name: '教室', type: 'image', value: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop' },
  { id: 'office', name: '办公室', type: 'image', value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop' },
];

const ASPECT_RATIOS = [
  { id: '2:3', label: '2:3', ratio: 2/3 },
  { id: '3:2', label: '3:2', ratio: 3/2 },
  { id: '16:9', label: '16:9', ratio: 16/9 },
  { id: '9:16', label: '9:16', ratio: 9/16 },
];

// --- Custom Rainbow Star Loader ---
const RainbowLoader = ({ size = 16 }: { size?: number }) => (
  <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
        <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
            <defs>
                <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="25%" stopColor="#eab308" />
                    <stop offset="50%" stopColor="#22c55e" />
                    <stop offset="75%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
            <path 
                d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" 
                fill="none" 
                stroke="url(#rainbow-grad)" 
                strokeWidth="2"
                strokeLinejoin="round"
            />
             <path 
                d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" 
                fill="none" 
                stroke="url(#rainbow-grad)" 
                strokeWidth="2"
                strokeLinejoin="round"
                transform="rotate(45, 12, 12)"
                className="opacity-80"
            />
        </svg>
      </div>
  </div>
);

// --- Simplified Audio Visualizer Hook ---
const useAudioVisualizer = (active: boolean, bars: number = 32) => {
  const [levels, setLevels] = useState<number[]>(new Array(bars).fill(10));
  
  useEffect(() => {
    if (!active) {
        setLevels(new Array(bars).fill(10));
        return;
    }

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let stream: MediaStream | null = null;
    let rafId: number;
    let isMounted = true;
    let dataArray: Uint8Array;

    const startAudio = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (!isMounted) {
            stream.getTracks().forEach(t => t.stop());
            return;
        }

        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; 
        analyser.smoothingTimeConstant = 0.5;
        
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const update = () => {
          if (!analyser || !isMounted) return;
          analyser.getByteFrequencyData(dataArray);
          
          const step = Math.floor(bufferLength / bars);
          const newLevels = [];
          for (let i = 0; i < bars; i++) {
             const val = dataArray[i * step];
             newLevels.push(10 + (val / 255) * 90);
          }
          setLevels(newLevels);
          rafId = requestAnimationFrame(update);
        };
        update();

      } catch (err) {
        console.warn("Microphone access denied or error:", err);
        const fallbackInterval = setInterval(() => {
           if(isMounted) setLevels(prev => prev.map(() => 10 + Math.random() * 40));
        }, 100);
        return () => clearInterval(fallbackInterval);
      }
    };

    startAudio();

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (source) source.disconnect();
      if (analyser) analyser.disconnect();
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
    };
  }, [active, bars]);

  return levels;
};

// --- Voice Card Component ---
const VoiceCard = ({ onCancel }: { onCancel: () => void }) => {
  const [time, setTime] = useState(0);
  const levels = useAudioVisualizer(true, 32);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#1a1a1a]/90 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 w-72 backdrop-blur-xl relative overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-right">
        <button 
          onClick={onCancel} 
          className="absolute top-2 right-2 p-1.5 text-white/30 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <X size={14} />
        </button>

        <div className="flex items-center justify-center gap-[2px] h-12 w-full px-2">
          {levels.map((level, i) => (
              <div 
                key={i} 
                className="w-1 bg-white rounded-full transition-all duration-75 ease-linear"
                style={{ 
                  height: `${Math.max(10, level)}%`,
                  opacity: 0.5 + (level / 200) 
                }} 
              />
          ))}
        </div>

        <span className="font-mono text-xl font-medium text-white/90 tracking-widest">
          {formatTime(time)}
        </span>
        
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1a1a1a] border-r border-b border-white/10 rotate-45 transform" />
    </div>
  );
};

// --- Particle System ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;

  constructor(w: number, h: number, centerY: number) {
    this.x = Math.random() * w;
    this.y = centerY + (Math.random() - 0.5) * 100;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 1) * 0.8 - 0.2;
    this.life = 1.0;
    this.decay = Math.random() * 0.01 + 0.005;
    this.size = Math.random() * 2 + 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(220, 230, 255, ${this.life * 0.8})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- Call Visualizer ---
const CallVisualizer = ({ active, className = "", width = 500, height = 200 }: { active: boolean, className?: string, width?: number, height?: number }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const audioContextRef = useRef<AudioContext | null>(null);
   const analyserRef = useRef<AnalyserNode | null>(null);
   const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
   const streamRef = useRef<MediaStream | null>(null);
   const rafRef = useRef<number | null>(null);
   const particlesRef = useRef<Particle[]>([]);
   const dataArrayRef = useRef<Uint8Array | null>(null);

   const config = {
     color: '255, 255, 255', 
     speed: 0.18,            
     lines: 8,               
     baseAmplitude: 15,
     particleCount: 50       
   };

   useEffect(() => {
     if (!active) {
         if (rafRef.current) cancelAnimationFrame(rafRef.current);
         if (sourceRef.current) sourceRef.current.disconnect();
         if (analyserRef.current) analyserRef.current.disconnect();
         if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
         if (audioContextRef.current) audioContextRef.current.close();
         
         rafRef.current = null;
         sourceRef.current = null;
         analyserRef.current = null;
         streamRef.current = null;
         audioContextRef.current = null;
         particlesRef.current = [];
         dataArrayRef.current = null;
         
         if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
         }
         return;
     }

     const initAudio = async () => {
         try {
             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
             streamRef.current = stream;
             
             const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
             const ctx = new AudioContextClass();
             audioContextRef.current = ctx;

             const analyser = ctx.createAnalyser();
             analyser.fftSize = 1024; 
             analyser.smoothingTimeConstant = 0.85;
             analyserRef.current = analyser;
             
             dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

             const source = ctx.createMediaStreamSource(stream);
             source.connect(analyser);
             sourceRef.current = source;

             animate();
         } catch (e) {
             console.error("Mic access error:", e);
         }
     };

     const animate = () => {
         if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
         const canvas = canvasRef.current;
         const ctx = canvas.getContext('2d');
         if (!ctx) return;

         const w = canvas.width;
         const h = canvas.height;
         const centerY = h * 0.5;

         const dataArray = dataArrayRef.current;
         analyserRef.current.getByteFrequencyData(dataArray);

         let sum = 0;
         for(let i = 0; i < 200; i++) {
             sum += dataArray[i];
         }
         const volume = sum / 200; 
         const energy = Math.max(volume / 255, 0.05); 
         const amplitude = energy * 60 + config.baseAmplitude; 

         ctx.clearRect(0, 0, w, h);
         ctx.globalCompositeOperation = 'lighter'; 

         const spawnCount = Math.floor(energy * 3); 
         if (particlesRef.current.length < config.particleCount && Math.random() < 0.5 + energy) {
             for(let k=0; k<spawnCount + 1; k++) {
                 particlesRef.current.push(new Particle(w, h, centerY));
             }
         }

         ctx.shadowBlur = 5;
         ctx.shadowColor = 'white';
         
         for (let i = particlesRef.current.length - 1; i >= 0; i--) {
             const p = particlesRef.current[i];
             p.update();
             p.draw(ctx);
             if (p.life <= 0) {
                 particlesRef.current.splice(i, 1);
             }
         }

         const time = Date.now() * 0.002;
         ctx.shadowBlur = 25; 
         ctx.shadowColor = `rgba(${config.color}, 0.7)`; 

         for (let i = 0; i < config.lines; i++) {
             ctx.beginPath();
             const distFromCenter = Math.abs(i - config.lines / 2);
             const alpha = Math.max(0, 1 - (distFromCenter / (config.lines / 2.5)));
             
             ctx.strokeStyle = `rgba(${config.color}, ${alpha * 0.6 + 0.1})`;
             ctx.lineWidth = 1.5 + (energy * 2); 

             for (let x = 0; x <= w; x += 5) {
                 const k = x / w;
                 const attenuation = Math.pow(4 * k * (1 - k), 4); 
                 const frequency = 0.008 + (i * 0.003); 
                 const phase = time * (config.speed + i * 0.02) + (i * 2); 
                 const y = centerY + 
                           Math.sin(x * frequency + phase) * amplitude * attenuation * (1 + Math.sin(time * 1.5 + i) * 0.2); 

                 if (x === 0) ctx.moveTo(x, y);
                 else ctx.lineTo(x, y);
             }
             ctx.stroke();
         }

         rafRef.current = requestAnimationFrame(animate);
     };

     initAudio();

     return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
     };
   }, [active]);
   
   useEffect(() => {
     return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (sourceRef.current) sourceRef.current.disconnect();
        if (analyserRef.current) analyserRef.current.disconnect();
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        if (audioContextRef.current) audioContextRef.current.close();
     }
   }, []);

   if (!active) return null;

   return (
    <div className={`pointer-events-none z-30 animate-in fade-in zoom-in duration-500 ${className}`}>
       <canvas 
          ref={canvasRef}
          width={width} 
          height={height}
          className="w-full h-full object-contain"
          style={{ 
            filter: 'blur(0.5px) contrast(1.2)', 
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
       />
    </div>
   );
}

// Assets with compatibility (Simplified)
const ASSETS: Asset[] = [
  // ... (Same assets as before, will be rendered below) ...
  { id: 'f1', name: 'Ganyu Style', type: 'base', category: 'female', previewColor: '#A5C9FF' },
  { id: 'f2', name: 'Keqing Style', type: 'base', category: 'female', previewColor: '#D4A5FF' },
  { id: 'f3', name: 'Barbara Style', type: 'base', category: 'female', previewColor: '#FFB7C5' },
  { id: 'f4', name: 'Nahida Style', type: 'base', category: 'female', previewColor: '#B5EAD7' },
  { id: 'm1', name: 'Xiao Style', type: 'base', category: 'male', previewColor: '#4ADE80' },
  { id: 'm2', name: 'Childe Style', type: 'base', category: 'male', previewColor: '#F87171' },
  { id: 'm3', name: 'Kazuha Style', type: 'base', category: 'male', previewColor: '#E2E8F0' },
  { id: 'm4', name: 'Zhongli Style', type: 'base', category: 'male', previewColor: '#FCD34D' },
  { id: 'p1', name: 'Paimon', type: 'base', category: 'pet', previewColor: '#FFFFFF' },
  { id: 'p2', name: 'Guoba', type: 'base', category: 'pet', previewColor: '#F97316' },
  // Accessories
  { id: 'a_f1_1', name: 'Qilin Horns', type: 'accessory', subCategory: 'decoration', previewColor: '#ef4444', compatibleWith: ['f1'] },
  { id: 'a_f1_2', name: 'Ice Bell', type: 'accessory', subCategory: 'decoration', previewColor: '#93c5fd', compatibleWith: ['f1'] },
  { id: 'a_f1_3', name: 'Frost Top', type: 'accessory', subCategory: 'top', previewColor: '#bfdbfe', compatibleWith: ['f1'] },
  { id: 'a_f1_4', name: 'Cryo Orb', type: 'accessory', subCategory: 'decoration', previewColor: '#60a5fa', compatibleWith: ['f1'] },
  { id: 'a_f1_5', name: 'Goat Plushie', type: 'accessory', subCategory: 'decoration', previewColor: '#ffffff', compatibleWith: ['f1'] },
  { id: 'a_f1_6', name: 'Spirit Boots', type: 'accessory', subCategory: 'shoes', previewColor: '#3b82f6', compatibleWith: ['f1'] },
  { id: 'a_f1_7', name: 'Cloud Cape', type: 'accessory', subCategory: 'top', previewColor: '#e0f2fe', compatibleWith: ['f1'] },
  { id: 'a_f1_8', name: 'Jade Skirt', type: 'accessory', subCategory: 'bottom', previewColor: '#10b981', compatibleWith: ['f1'] },
  { id: 'a_f2_1', name: 'Cat Twin Tails', type: 'accessory', subCategory: 'decoration', previewColor: '#a855f7', compatibleWith: ['f2'] },
  { id: 'a_f2_2', name: 'Electro Vision', type: 'accessory', subCategory: 'decoration', previewColor: '#c084fc', compatibleWith: ['f2'] },
  { id: 'a_f2_3', name: 'Stiletto Heels', type: 'accessory', subCategory: 'shoes', previewColor: '#e879f9', compatibleWith: ['f2'] },
  { id: 'a_f2_4', name: 'Golden Shrimp', type: 'accessory', subCategory: 'decoration', previewColor: '#facc15', compatibleWith: ['f2'] },
  { id: 'a_f2_5', name: 'Purple Top', type: 'accessory', subCategory: 'top', previewColor: '#7e22ce', compatibleWith: ['f2'] },
  { id: 'a_f2_6', name: 'Night Gown', type: 'accessory', subCategory: 'top', previewColor: '#4c1d95', compatibleWith: ['f2'] },
  { id: 'a_f2_7', name: 'Lightning Skirt', type: 'accessory', subCategory: 'bottom', previewColor: '#d8b4fe', compatibleWith: ['f2'] },
  { id: 'a_f2_8', name: 'Star Hairpin', type: 'accessory', subCategory: 'decoration', previewColor: '#fbbf24', compatibleWith: ['f2'] },
  { id: 'a_f3_1', name: 'Idol Hat', type: 'accessory', subCategory: 'decoration', previewColor: '#f472b6', compatibleWith: ['f3'] },
  { id: 'a_f3_2', name: 'Song Book', type: 'accessory', subCategory: 'decoration', previewColor: '#fbcfe8', compatibleWith: ['f3'] },
  { id: 'a_f3_3', name: 'Water Notes', type: 'accessory', subCategory: 'decoration', previewColor: '#38bdf8', compatibleWith: ['f3'] },
  { id: 'a_f3_4', name: 'Duck Toy', type: 'accessory', subCategory: 'decoration', previewColor: '#fef08a', compatibleWith: ['f3'] },
  { id: 'a_f3_5', name: 'White Dress', type: 'accessory', subCategory: 'top', previewColor: '#f3f4f6', compatibleWith: ['f3'] },
  { id: 'a_f3_6', name: 'Sparkle Mic', type: 'accessory', subCategory: 'decoration', previewColor: '#94a3b8', compatibleWith: ['f3'] },
  { id: 'a_f3_7', name: 'Rainbow Skirt', type: 'accessory', subCategory: 'bottom', previewColor: '#f472b6', compatibleWith: ['f3'] },
  { id: 'a_f3_8', name: 'Healer Shoes', type: 'accessory', subCategory: 'shoes', previewColor: '#22d3ee', compatibleWith: ['f3'] },
  { id: 'a_f4_1', name: 'Leaf Hairclip', type: 'accessory', subCategory: 'decoration', previewColor: '#86efac', compatibleWith: ['f4'] },
  { id: 'a_f4_2', name: 'Dendro Lamp', type: 'accessory', subCategory: 'decoration', previewColor: '#bbf7d0', compatibleWith: ['f4'] },
  { id: 'a_f4_3', name: 'Wisdom Orb', type: 'accessory', subCategory: 'decoration', previewColor: '#4ade80', compatibleWith: ['f4'] },
  { id: 'a_f4_4', name: 'Swing Set', type: 'accessory', subCategory: 'decoration', previewColor: '#166534', compatibleWith: ['f4'] },
  { id: 'a_f4_5', name: 'Green Cape', type: 'accessory', subCategory: 'top', previewColor: '#15803d', compatibleWith: ['f4'] },
  { id: 'a_f4_6', name: 'Forest Shorts', type: 'accessory', subCategory: 'bottom', previewColor: '#84cc16', compatibleWith: ['f4'] },
  { id: 'a_f4_7', name: 'Dream Shoes', type: 'accessory', subCategory: 'shoes', previewColor: '#d9f99d', compatibleWith: ['f4'] },
  { id: 'a_f4_8', name: 'Tech Terminal', type: 'accessory', subCategory: 'decoration', previewColor: '#22c55e', compatibleWith: ['f4'] },
  { id: 'a_m1_1', name: 'Yaksha Mask', type: 'accessory', subCategory: 'decoration', previewColor: '#22c55e', compatibleWith: ['m1'] },
  { id: 'a_m1_2', name: 'Jade Spear', type: 'accessory', subCategory: 'decoration', previewColor: '#10b981', compatibleWith: ['m1'] },
  { id: 'a_m2_1', name: 'Fatui Mask', type: 'accessory', subCategory: 'decoration', previewColor: '#ef4444', compatibleWith: ['m2'] },
  { id: 'a_m2_2', name: 'Water Daggers', type: 'accessory', subCategory: 'decoration', previewColor: '#3b82f6', compatibleWith: ['m2'] },
  { id: 'a_m3_1', name: 'Red Streak', type: 'accessory', subCategory: 'decoration', previewColor: '#ef4444', compatibleWith: ['m3'] },
  { id: 'a_m3_2', name: 'Maple Leaf', type: 'accessory', subCategory: 'decoration', previewColor: '#fdba74', compatibleWith: ['m3'] },
  { id: 'a_m4_1', name: 'Dragon Horns', type: 'accessory', subCategory: 'decoration', previewColor: '#f59e0b', compatibleWith: ['m4'] },
  { id: 'a_m4_2', name: 'Meteor', type: 'accessory', subCategory: 'decoration', previewColor: '#fbbf24', compatibleWith: ['m4'] },
  { id: 'a_p1_1', name: 'Halo', type: 'accessory', subCategory: 'decoration', previewColor: '#fbbf24', compatibleWith: ['p1'] },
  { id: 't1', name: '新闻主播', type: 'template', category: 'male', previewColor: '#3b82f6', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
  { id: 't2', name: '英语老师', type: 'template', category: 'female', previewColor: '#10b981', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
  { id: 't3', name: '虚拟偶像', type: 'template', category: 'female', previewColor: '#ec4899', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
  { id: 't4', name: '专业医生', type: 'template', category: 'male', previewColor: '#0ea5e9', src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop' },
  { id: 't5', name: '金牌主持', type: 'template', category: 'female', previewColor: '#f59e0b', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
  { id: 't6', name: '可爱萌娃', type: 'template', category: 'female', previewColor: '#fbbf24', src: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=600&auto=format&fit=crop' },
  { id: 't7', name: '人气网红', type: 'template', category: 'female', previewColor: '#8b5cf6', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop' },
];

const VoiceDropdown = ({ label, value, options, onChange }: { label: string; value: string; options: { id: string; name: string; }[]; onChange: (v: string) => void; }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-white/60 pl-1">{label}</label>
    <div className="relative group">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-lg py-2.5 px-3 text-xs text-white appearance-none focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-hover:text-white transition-colors" size={14} />
    </div>
  </div>
);

const VoiceSlider = ({ label, icon: Icon, value, min, max, onChange }: { label: string; icon?: any; value: number; min: number; max: number; onChange: (v: number) => void }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center px-1">
      <label className="text-xs font-bold text-white/60 flex items-center gap-1">
        {Icon && <Icon size={10} />}
        {label}
      </label>
      <span className="text-[10px] font-mono text-white/40">{value}</span>
    </div>
    <div className="relative h-2 flex items-center">
       <input 
         type="range" 
         min={min} max={max} 
         value={value} 
         onChange={(e) => onChange(parseInt(e.target.value))}
         className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:bg-white/20 transition-colors z-10 focus:outline-none"
       />
       <div 
         className="absolute h-1 bg-white/30 rounded-l-lg pointer-events-none left-0" 
         style={{ width: `${((value - min) / (max - min)) * 100}%` }} 
       />
    </div>
  </div>
);

const TOOLBAR_ITEMS = [
  { icon: FileInput, label: '导入文件', id: 'import' },
  { icon: PlayCircle, label: '占位A', id: 'play' },
  { icon: Undo2, label: '占位B', id: 'undo' },
  { icon: Redo2, label: '占位C', id: 'redo' },
  { icon: Wind, label: '占位D', id: 'breath' },
  { icon: PauseCircle, label: '占位E', id: 'pause' },
  { icon: Music, label: '占位F', id: 'sfx' },
  { icon: CaseSensitive, label: '占位G', id: 'poly' },
  { icon: Binary, label: '占位H', id: 'num' },
  { icon: Sigma, label: '占位I', id: 'math' },
  { icon: Languages, label: '占位J', id: 'lang' },
  { icon: HandMetal, label: '占位K', id: 'motion' },
  { icon: FileCheck, label: '占位L', id: 'check' },
  { icon: Globe, label: '占位M', id: 'trans' },
  { icon: Mic, label: '占位N', id: 'mic' },
  { icon: FileText, label: '占位O', id: 'ocr' },
  { icon: Sparkles, label: '占位P', id: 'ai' },
];

export default function Studio({ module, onChangeModule, lang, setLang, bgMode, onBack, onOpenSettings, savedAssets, onSaveAsset, t }: StudioProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const [voiceConfig, setVoiceConfig] = useState({
    lang: 'zh',
    genderFilter: 'all' as 'all' | 'male' | 'female',
    selectedVoice: 'gentle_sister',
    emotion: 'default',
    speed: 50,
    pitch: 50
  });
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedHistory, setUploadedHistory] = useState<Asset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isImportMenuOpen, setIsImportMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Right Sidebar State
  const [activeRightTab, setActiveRightTab] = useState<'voice' | 'avatar' | 'accessory' | 'mine' | 'action' | 'background'>('avatar');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Left Sidebar State
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => setIsSidebarExpanded(prev => !prev);
  const sidebarWidth = isSidebarExpanded ? 520 : 320;
  
  const generationTimerRef = useRef<number | null>(null);
  const playbackTimerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [baseModel, setBaseModel] = useState<string>('f1');
  const [accessory, setAccessory] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingModel, setPendingModel] = useState<string | null>(null);
  
  // Call Warning State
  const [showCallWarning, setShowCallWarning] = useState(false);
  
  // Canvas Controls
  const [canvasTransform, setCanvasTransform] = useState({ scale: 1, rotation: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const rotationRafRef = useRef<number | null>(null);

  const [activeAvatarTab, setActiveAvatarTab] = useState<string>('all');
  const [accessoryFilter, setAccessoryFilter] = useState<'all' | 'top' | 'bottom' | 'shoes' | 'decoration'>('all');

  // Background and Aspect Ratio State
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0]);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]); // Default 2:3
  const [showRatioMenu, setShowRatioMenu] = useState(false);

  // Toolbar State
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [visibleItemCount, setVisibleItemCount] = useState(TOOLBAR_ITEMS.length);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine theme state for styling
  const isThemeActive = bgMode !== 'default';
  // Helper for asset card image backgrounds to be less transparent when theme is active
  // Updated: Increased opacity to bg-black/80 for image display areas
  const cardImageBg = isThemeActive ? 'bg-black/80 group-hover:bg-black/70' : 'bg-white/5 group-hover:bg-white/10';

  const featureTitle = useMemo(() => {
    switch (module) {
        case '2d-audio': return t.features[0];
        case '2d-chat': return t.features[1];
        case '2d-avatar': return t.features[2];
        case '3d-avatar': return t.features[3];
        default: return 'Studio';
    }
  }, [module, t.features]);

  // Dynamic Toolbar Logic
  useLayoutEffect(() => {
    const updateLayout = () => {
        if (!toolbarRef.current) return;
        const width = toolbarRef.current.clientWidth;
        // Item: min-w-[50px] + gap-1 (4px) = 54px. 
        // Using 55px to be safe and account for potential sub-pixel rendering or border interactions.
        const count = Math.floor(width / 55);
        setVisibleItemCount(Math.max(1, Math.min(TOOLBAR_ITEMS.length, count)));
    };

    updateLayout();
    
    const observer = new ResizeObserver(updateLayout);
    if (toolbarRef.current) {
        observer.observe(toolbarRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const visibleItems = TOOLBAR_ITEMS.slice(0, visibleItemCount);
  const overflowItems = TOOLBAR_ITEMS.slice(visibleItemCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (module === '2d-audio' || module === '2d-chat' || module === '2d-avatar') {
      setBaseModel('t1');
      setActiveAvatarTab('all'); 
    } else if (module === '3d-avatar') {
      setBaseModel('f1');
      setActiveAvatarTab('all');
    }
    setAccessory(null);
    setMessages([
        { id: '0', role: 'assistant', text: lang === 'zh' ? '你好，我是你的数字助手。' : 'Hello, I am your digital assistant.', timestamp: Date.now() }
    ]);
    setIsCallActive(false);
    setIsGenerating(false);
    setIsPlaying(false);
    setInputValue('');
    setIsVoiceRecording(false);
    setCanvasTransform({ scale: 1, rotation: 0 });
    setIsRotating(false);
    setAccessoryFilter('all');
    setIsModuleMenuOpen(false);
    setActiveRightTab('avatar');
    setSearchQuery('');
    setIsSidebarExpanded(false); 
    setIsImportMenuOpen(false);
    setProgress(0);
    setSelectedBackground(BACKGROUNDS[0]);
    setAspectRatio(ASPECT_RATIOS[0]);
    setIsOverflowOpen(false);
    
    if (generationTimerRef.current) cancelAnimationFrame(generationTimerRef.current);
    if (playbackTimerRef.current) clearTimeout(playbackTimerRef.current);
  }, [module, lang]);

  useEffect(() => {
    setSearchQuery('');
  }, [activeRightTab, module]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
        //textareaRef.current.style.height = 'auto';
        //textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    return () => {
        if (rotationRafRef.current) cancelAnimationFrame(rotationRafRef.current);
        if (generationTimerRef.current) cancelAnimationFrame(generationTimerRef.current);
        if (playbackTimerRef.current) clearTimeout(playbackTimerRef.current);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    setCanvasTransform(prev => ({
        ...prev,
        scale: Math.max(0.5, Math.min(2.0, prev.scale - e.deltaY * 0.001))
    }));
  };

  const handleCanvasTransform = (type: 'zoomIn' | 'zoomOut') => {
      if (checkCallActive()) return;
      setCanvasTransform(prev => {
          switch(type) {
              case 'zoomIn': return { ...prev, scale: Math.min(prev.scale + 0.1, 2.0) };
              case 'zoomOut': return { ...prev, scale: Math.max(prev.scale - 0.1, 0.5) };
              default: return prev;
          }
      });
  };

  const handleResetRotation = () => {
      if (checkCallActive()) return;
      setCanvasTransform(prev => ({ ...prev, rotation: 0 }));
  };

  const startRotation = (direction: 'left' | 'right', e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    if (checkCallActive()) return;
    stopRotation();
    setIsRotating(true);
    const rotate = () => {
        setCanvasTransform(prev => ({ 
            ...prev, 
            rotation: prev.rotation + (direction === 'left' ? -2 : 2)
        }));
        rotationRafRef.current = requestAnimationFrame(rotate);
    };
    rotate();
  };

  const stopRotation = () => {
    setIsRotating(false);
    if (rotationRafRef.current) {
        cancelAnimationFrame(rotationRafRef.current);
        rotationRafRef.current = null;
    }
  };

  const checkCallActive = () => {
    if (isCallActive) {
      setShowCallWarning(true);
      return true;
    }
    return false;
  };

  const handleAssetClick = (asset: Asset) => {
    if (checkCallActive()) return;

    if (module === '3d-avatar') {
      if (asset.type === 'base') {
        if (accessory && asset.id !== baseModel) {
          setPendingModel(asset.id);
          setShowConfirmDialog(true);
        } else {
          setBaseModel(asset.id);
        }
      } else if (asset.type === 'accessory') {
        setAccessory(asset.id === accessory ? null : asset.id);
      } else if (asset.type === 'snapshot' && asset.state) {
           setBaseModel(asset.state.baseModel);
           setAccessory(asset.state.accessory);
      }
    } else {
      setBaseModel(asset.id);
    }
  };

  const confirmModelChange = () => {
    if (pendingModel) {
      setBaseModel(pendingModel);
      setAccessory(null);
      // Auto switch to accessory tab after confirmation
      setActiveRightTab('accessory');
    }
    setShowConfirmDialog(false);
    setPendingModel(null);
  };

  const handleSendMessage = () => {
    if (checkCallActive()) return;
    if (!inputValue.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: lang === 'zh' ? "收到指令，正在处理..." : "Received. Processing...",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const finishVoiceRecording = () => {
    setIsVoiceRecording(false);
    const simulatedText = lang === 'zh' 
      ? "你好，我想更换一下角色的配饰，请帮我推荐一个。" 
      : "Hello, I would like to change the character accessories, please recommend one.";
    setInputValue(prev => (prev ? prev + ' ' : '') + simulatedText);
  };

  const toggleVoiceRecording = () => {
    if (checkCallActive()) return;
    if (isVoiceRecording) finishVoiceRecording();
    else setIsVoiceRecording(true);
  };

  const cancelVoiceRecording = () => setIsVoiceRecording(false);

  const handleSaveState = () => {
    if (checkCallActive()) return;
    if (module === '3d-avatar') {
      const currentBase = ASSETS.find(a => a.id === baseModel);
      const newSnapshot: Asset = {
        id: `snap-${Date.now()}`,
        name: `Custom ${currentBase?.name.split(' ')[0] || 'Avatar'}`,
        type: 'snapshot',
        module: module,
        previewColor: currentBase?.previewColor || '#555',
        state: { baseModel, accessory }
      };
      onSaveAsset(newSnapshot);
    } else {
      const newAsset: Asset = {
        id: `saved-${Date.now()}`,
        name: `Save ${new Date().toLocaleTimeString()}`,
        type: 'template',
        module: module,
        previewColor: '#4f46e5'
      };
      onSaveAsset(newAsset);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkCallActive()) {
        // Reset file input so change event can fire again if needed
        if(e.target) e.target.value = '';
        return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      const newAsset: Asset = {
        id: `upload-${Date.now()}`,
        name: file.name,
        type: 'upload',
        module: module,
        src: url,
        mediaType: isVideo ? 'video' : 'image',
        previewColor: '#555'
      };
      setUploadedHistory(prev => [newAsset, ...prev]);
      setBaseModel(newAsset.id);
      
      // Auto-switch back to viewing the upload (no tab switch needed as we setBaseModel)
      // Close the import menu to show the result
      setIsImportMenuOpen(false);
    }
  };

  const handleStop = () => {
    if (generationTimerRef.current) cancelAnimationFrame(generationTimerRef.current);
    if (playbackTimerRef.current) clearTimeout(playbackTimerRef.current);
    setIsGenerating(false);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleGenerate = () => {
    if (checkCallActive()) return;
    if (isGenerating || isPlaying) {
        handleStop();
        return;
    }
    setIsGenerating(true);
    setProgress(0);
    
    if (module === '2d-audio' && inputValue.trim()) {
       setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'user',
         text: inputValue,
         timestamp: Date.now()
       }]);
       setInputValue('');
    }
    
    // Clear existing timers
    if (generationTimerRef.current) cancelAnimationFrame(generationTimerRef.current);
    if (playbackTimerRef.current) clearTimeout(playbackTimerRef.current);

    const duration = 3000;
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, (elapsed / duration) * 100);
        setProgress(p);

        if (p < 100) {
            generationTimerRef.current = requestAnimationFrame(updateProgress) as any;
        } else {
            setIsGenerating(false);
            setIsPlaying(true);
            setProgress(0);
            playbackTimerRef.current = setTimeout(() => {
                setIsPlaying(false);
            }, 5000);
        }
    };
    generationTimerRef.current = requestAnimationFrame(updateProgress) as any;
  };

  const handleVoicePreview = (e: React.MouseEvent, voiceId: string) => {
    e.stopPropagation();
    
    if (checkCallActive()) return;

    // Select the voice when previewing
    setVoiceConfig(prev => ({...prev, selectedVoice: voiceId}));

    if (isGenerating || isPlaying) {
      handleStop();
      return;
    }
    setIsPlaying(true);
    // Simulate speaking briefly for audition
    playbackTimerRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleVoiceConfigChange = (updater: (prev: any) => any) => {
      if (checkCallActive()) return;
      setVoiceConfig(updater);
  };

  const handleToolbarClick = (id: string) => {
    if (checkCallActive()) return;
    if (id === 'import') {
      if (module === '3d-avatar' || module === '2d-audio') {
        setIsImportMenuOpen(!isImportMenuOpen);
      } else {
        fileInputRef.current?.click();
      }
    } else if (id === 'play') {
      handleGenerate();
    } else {
      console.log('Toolbar action:', id);
    }
  };

  const isSpeaking = isPlaying || isCallActive;
  const shouldMoveUp = isCallActive || isGenerating || isPlaying;
  const filteredVoices = useMemo(() => {
      return VOICE_PRESETS.filter(voice => {
          if (voiceConfig.genderFilter !== 'all' && voice.gender !== voiceConfig.genderFilter) return false;
          if (searchQuery && !voice.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
          return true;
      });
  }, [voiceConfig.genderFilter, searchQuery]);

  // Common Controls Overlay for both 2D and 3D
  const CanvasControls = () => (
    <div className="absolute bottom-8 right-8 z-50 flex gap-2">
       <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 flex flex-col gap-1 border border-white/10 shadow-lg">
          <button onClick={() => handleCanvasTransform('zoomIn')} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom In"><ZoomIn size={16}/></button>
          <button onClick={() => handleCanvasTransform('zoomOut')} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom Out"><ZoomOut size={16}/></button>
       </div>
       {/* Only show rotation controls for 3D avatar module */}
       {module === '3d-avatar' && (
           <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 flex flex-col gap-1 border border-white/10 shadow-lg">
              <button 
                onMouseDown={(e) => startRotation('left', e)} 
                onMouseUp={stopRotation} 
                onMouseLeave={stopRotation}
                onTouchStart={(e) => startRotation('left', e)}
                onTouchEnd={stopRotation}
                onContextMenu={(e) => e.preventDefault()}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" 
                title="Rotate Left"
              >
                <RotateCcw size={16}/>
              </button>
              <button 
                onClick={handleResetRotation}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" 
                title="Reset Rotation"
              >
                <RefreshCcw size={16}/>
              </button>
              <button 
                onMouseDown={(e) => startRotation('right', e)} 
                onMouseUp={stopRotation} 
                onMouseLeave={stopRotation}
                onTouchStart={(e) => startRotation('right', e)}
                onTouchEnd={stopRotation}
                onContextMenu={(e) => e.preventDefault()}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" 
                title="Rotate Right"
              >
                <RotateCw size={16}/>
              </button>
           </div>
       )}
    </div>
  );

  const AspectRatioMenu = () => (
    <div className="absolute top-4 left-4 z-50">
        <div className="relative">
            <button 
                onClick={() => !checkCallActive() && setShowRatioMenu(!showRatioMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white hover:bg-white/10 transition-colors"
            >
                <Monitor size={14} />
                尺寸: {aspectRatio.label}
                <ChevronDown size={12} className={`transition-transform ${showRatioMenu ? 'rotate-180' : ''}`} />
            </button>
            {showRatioMenu && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col p-1">
                    {ASPECT_RATIOS.map(ratio => (
                        <button
                            key={ratio.id}
                            onClick={() => {
                                setAspectRatio(ratio);
                                setShowRatioMenu(false);
                            }}
                            className={`flex items-center justify-between px-3 py-2 text-xs text-left rounded-md transition-colors ${aspectRatio.id === ratio.id ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                            {ratio.label}
                            {aspectRatio.id === ratio.id && <Check size={12} className="text-green-400" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );

  const visualizerOffset = canvasTransform.scale;
  const loaderMarginTop = (canvasTransform.scale - 1) * 250 + 240;

  const get3DTabs = () => ['all', 'female', 'male', 'pet'] as const;

  // Helper to get container style based on background
  const getBackgroundStyle = () => {
      if (selectedBackground.type === 'color') {
          return { backgroundColor: selectedBackground.value };
      } else {
          return { 
              backgroundImage: `url(${selectedBackground.value})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
          };
      }
  };

  // Helper to get container dimensions based on ratio
  // Base logic: try to fit within 500x500 box roughly
  const getContainerDimensions = () => {
      const baseSize = 500; // max dimension
      let width, height;
      
      if (aspectRatio.ratio >= 1) {
          // Landscape or Square
          width = baseSize;
          height = baseSize / aspectRatio.ratio;
      } else {
          // Portrait
          height = baseSize;
          width = baseSize * aspectRatio.ratio;
      }
      return { width, height };
  };

  const { width: containerWidth, height: containerHeight } = getContainerDimensions();

  const render3dCanvas = () => {
    // Look up model from all available sources including uploads
    const allAssets = [...ASSETS, ...uploadedHistory, ...savedAssets];
    const model = allAssets.find(a => a.id === baseModel);
    const acc = ASSETS.find(a => a.id === accessory);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8 perspective-[1000px]" onWheel={handleWheel}>
        <AspectRatioMenu />
        <div className={`relative transition-transform duration-500 z-10 translate-y-0`}>
            <div className={`rounded-2xl flex items-center justify-center border-2 border-white overflow-hidden backdrop-blur-md group transform-style-3d ${isSpeaking ? 'scale-105' : ''} ${isGenerating ? 'brightness-50 grayscale-[0.5]' : ''} transition-all duration-300`}
                 style={{ 
                    ...getBackgroundStyle(), // Apply selected background
                    width: containerWidth,
                    height: containerHeight,
                    boxShadow: isSpeaking ? 'none' : '0 0 25px rgba(255,255,255,0.2)',
                    animation: isSpeaking ? 'talking-glow 0.8s infinite' : 'none',
                    transition: isRotating ? 'none' : 'all 0.3s ease',
                    transform: `scale(${canvasTransform.scale}) rotateY(${canvasTransform.rotation}deg)`
                 }}
            >
                {/* 3D Model Rendering Container (Centered inside background) */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Show uploaded image if available for 3D module (as a placeholder for the model) */}
                    {model?.src && (
                       <img src={model.src} className="absolute inset-0 w-full h-full object-contain mix-blend-normal" />
                    )}

                    {!model?.src && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            <div className="relative z-20 flex flex-col items-center gap-8 transform-style-3d">
                                <div className="relative transform-style-3d animate-bounce" style={{ animationDuration: '4s' }}>
                                     {acc && (
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse">
                                             {acc.name.includes('Mask') ? <Ghost size={24} style={{ color: acc.previewColor }} /> :
                                              acc.name.includes('Horn') ? <Moon size={24} style={{ color: acc.previewColor }} /> :
                                              acc.name.includes('Leaf') ? <Flower size={24} style={{ color: acc.previewColor }} /> :
                                              <Zap size={24} style={{ color: acc.previewColor }} />}
                                        </div>
                                     )}
                                     <div className="relative z-10 drop-shadow-2xl">
                                        {model?.category === 'female' ? (
                                            <User size={100} className="text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                        ) : model?.category === 'male' ? (
                                            <User size={100} className="text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                        ) : (
                                            <Cat size={80} className="text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                        )}
                                     </div>
                                </div>
                                <div className="text-center px-6">
                                    <h3 className="text-2xl font-bold text-white drop-shadow-md">{model?.name || 'Custom Model'}</h3>
                                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">3D Avatar Model</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
                <div className="absolute inset-0 pointer-events-none">
                     {[1,2,3,4].map(i => (
                        <div 
                            key={i}
                            className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px] animate-pulse"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`,
                                animationDelay: `${i * 0.5}s`
                            }}
                        />
                     ))}
                </div>
            </div>
        </div>
        
        <CanvasControls />
        
        {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
               <RainbowLoader size={48} />
               <div className="mt-6 w-48 h-0.5 bg-white/20 rounded-full relative overflow-visible">
                  {/* Progress Line */}
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-white shadow-[0_0_10px_rgba(255,165,0,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Fuse Spark at the tip */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse"
                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)', opacity: progress > 0 ? 1 : 0 }}
                  />
               </div>
               <span className="text-xs text-white/80 tracking-widest uppercase font-medium mt-3">{t.studio.controls.generating} {Math.floor(progress)}%</span>
            </div>
        )}
      </div>
    );
  };

  const render2dCanvas = () => {
    const currentAsset = [...ASSETS, ...uploadedHistory, ...savedAssets].find(a => a.id === baseModel);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8" onWheel={handleWheel}>
        <AspectRatioMenu />
        <div className={`relative w-auto h-auto flex items-center justify-center transition-all duration-500 translate-y-0 ${isSpeaking ? 'scale-105' : ''}`}>
           {currentAsset?.src ? (
             <div 
                className={`rounded-2xl overflow-hidden shadow-2xl relative z-10 border-2 border-white ${isGenerating ? 'brightness-50 grayscale-[0.5]' : ''} transition-all duration-300`}
                style={{
                  ...getBackgroundStyle(), // Apply selected background
                  width: containerWidth,
                  height: containerHeight,
                  boxShadow: isSpeaking ? 'none' : '0 0 25px rgba(255,255,255,0.2)',
                  animation: isSpeaking ? 'talking-glow 0.8s infinite' : 'none',
                  transition: isRotating ? 'none' : 'all 0.3s ease',
                  transform: `scale(${canvasTransform.scale}) rotateY(${canvasTransform.rotation}deg)`
                }}
             >
                 {/* Avatar Content - Object Contain to preserve original aspect ratio inside the frame */}
                 {currentAsset.mediaType === 'video' ? (
                    <video src={currentAsset.src} className="w-full h-full object-contain" autoPlay loop muted playsInline />
                 ) : (
                    <img src={currentAsset.src} alt="avatar" className="w-full h-full object-contain" />
                 )}
             </div>
           ) : (
             <div 
                className={`rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10 shadow-2xl border-2 border-white overflow-hidden backdrop-blur-md ${isGenerating ? 'brightness-50 grayscale-[0.5]' : ''}`}
                style={{ 
                    // Fallback gradient if no image, or combine with background if transparent
                    background: selectedBackground.type === 'color' 
                      ? `linear-gradient(to bottom, ${currentAsset?.previewColor || '#444'}80, #0f0f0f80)`
                      : `url(${selectedBackground.value})`,
                    backgroundSize: 'cover',
                    width: containerWidth,
                    height: containerHeight,
                    boxShadow: isSpeaking ? 'none' : '0 0 25px rgba(255,255,255,0.2)',
                    animation: isSpeaking ? 'talking-glow 0.8s infinite' : 'none',
                    transition: isRotating ? 'none' : 'all 0.3s ease',
                    transform: `scale(${canvasTransform.scale}) rotateY(${canvasTransform.rotation}deg)`
                }}
             >
                {/* Only darken if using an image background to make text readable */}
                {selectedBackground.type === 'image' && <div className="absolute inset-0 bg-black/40" />}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="relative z-20 flex flex-col items-center gap-6">
                    <span className="text-7xl select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-in zoom-in duration-500">
                        {currentAsset?.id.startsWith('t') ? '👨‍💼' : '🤖'}
                    </span>
                    <div className="text-center px-6">
                        <h3 className="text-2xl font-bold text-white drop-shadow-md">{currentAsset?.name}</h3>
                        <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">AI Template</p>
                    </div>
                </div>
             </div>
           )}

           {isSpeaking && (
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: `scale(${canvasTransform.scale})` }}>
                  <div className="absolute -inset-4 bg-green-500/20 rounded-[2rem] animate-pulse blur-xl" />
              </div>
           )}
        </div>

        <CanvasControls />

        {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
               <RainbowLoader size={48} />
               <div className="mt-6 w-48 h-0.5 bg-white/20 rounded-full relative overflow-visible">
                  {/* Progress Line */}
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-white shadow-[0_0_10px_rgba(255,165,0,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Fuse Spark at the tip */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse"
                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)', opacity: progress > 0 ? 1 : 0 }}
                  />
               </div>
               <span className="text-xs text-white/80 tracking-widest uppercase font-medium mt-3">{t.studio.controls.generating} {Math.floor(progress)}%</span>
            </div>
        )}
      </div>
    );
  }

  const SearchBar = ({ placeholder, className = "mb-4" }: { placeholder: string, className?: string }) => (
    <div className={`relative ${className}`}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
            <Search size={14} />
        </div>
        <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-[#111] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
    </div>
  );

  const buttonStyle = `
    .fancy-button {
      /* Theme Variables - Default (Yellow/Lime) */
      --bg-1: #ddff00;
      --bg-2: #b7ff00;
      --shadow-color: rgba(187, 255, 0, 0.4);
    
      position: relative;
      padding: 0; /* Handled by flex container */
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1a1a1a;
      background: linear-gradient(135deg, var(--bg-1), var(--bg-2));
      border: none;
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      
      /* Simplified Transition - No complex physics/perspective */
      transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
      
      box-shadow: 0 4px 12px var(--shadow-color);
      outline: none;
      z-index: 1;
    }

    /* Green Variant (Voice Call) */
    .fancy-button.green {
      --bg-1: #4ade80; /* green-400 */
      --bg-2: #22c55e; /* green-500 */
      --shadow-color: rgba(34, 197, 94, 0.4);
    }

    /* Red Variant (End Call / Stop) */
    .fancy-button.red {
      --bg-1: #f87171; /* red-400 */
      --bg-2: #ef4444; /* red-500 */
      --shadow-color: rgba(239, 68, 68, 0.4);
    }

    /* Hover State - Simple Lift & Brightness */
    .fancy-button:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
      box-shadow: 0 8px 20px var(--shadow-color);
    }

    /* Active State - Press down */
    .fancy-button:active {
      transform: translateY(0) scale(0.98);
      filter: brightness(0.95);
      box-shadow: 0 2px 8px var(--shadow-color);
    }
    
    .fancy-button:disabled {
      background: linear-gradient(135deg, #555, #333);
      color: #777;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
      filter: grayscale(1);
    }

    .fancy-button span {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      height: 100%;
    }

    @keyframes talking-glow {
      0% { box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1); }
      50% { box-shadow: 0 0 25px rgba(255,255,255,0.5), 0 0 50px rgba(255,255,255,0.3); }
      100% { box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1); }
    }
  `;

  return (
    <div className="w-full h-full flex flex-col relative z-10 bg-transparent">
      
      <style>{buttonStyle}</style>

      <div 
        className={`absolute inset-0 z-[100] bg-[#191919]/40 backdrop-blur-xl pointer-events-none transition-opacity duration-700 ease-in-out ${isMounted ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Hidden File Input for Import */}
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleUpload} />

      {/* Top Bar */}
      <div className={`h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 z-50 shrink-0 transition-all duration-700 delay-100 ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
              <ArrowLeft size={18} />
            </button>
            
            <div className="relative">
               <button 
                 onClick={() => !checkCallActive() && setIsModuleMenuOpen(!isModuleMenuOpen)}
                 className="flex items-center gap-2 text-base font-bold text-white hover:text-white/80 transition-colors group tracking-wide"
               >
                 {featureTitle}
                 <ChevronDown size={16} className={`text-white/60 transition-transform duration-200 ${isModuleMenuOpen ? 'rotate-180' : ''}`} />
               </button>

               {isModuleMenuOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsModuleMenuOpen(false)} />
                   
                   <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left flex flex-col p-1">
                      {['2d-audio', '2d-chat', '2d-avatar', '3d-avatar'].map((key, index) => (
                        <button
                          key={key}
                          onClick={() => {
                            onChangeModule(key as AppModule);
                            setIsModuleMenuOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left group ${module === key ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                          <div className="flex items-center gap-3">
                             {index === 0 && <Mic size={14} />}
                             {index === 1 && <MessageSquare size={14} />}
                             {index === 2 && <Ghost size={14} />}
                             {index === 3 && <Box size={14} />}
                             {t.features[index]}
                          </div>
                          {module === key && <Check size={12} className="text-green-400" />}
                        </button>
                      ))}
                   </div>
                 </>
               )}
            </div>
         </div>
         
         <div className="flex items-center gap-4 relative z-50">
            <div className="relative">
              <button 
                onClick={() => !checkCallActive() && setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-full border border-white/5"
              >
                  <Globe size={12} />
                  <span>{lang === 'zh' ? '简体中文' : 'English'}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-28 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 p-1">
                    <button
                      onClick={() => { setLang('zh'); setIsLangMenuOpen(false); }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-xs text-left rounded-md transition-colors ${lang === 'zh' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      简体中文
                      {lang === 'zh' && <Check size={12} className="text-green-400" />}
                    </button>
                    <button
                      onClick={() => { setLang('en'); setIsLangMenuOpen(false); }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-xs text-left rounded-md transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      English
                      {lang === 'en' && <Check size={12} className="text-green-400" />}
                    </button>
                  </div>
                </>
              )}
            </div>

            <button 
              onClick={() => { if(!checkCallActive()) handleSaveState(); }}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs font-medium text-white transition-colors border border-white/5 flex items-center gap-2"
            >
              <Save size={14} />
              {t.studio.nav.saveSettings}
            </button>
         </div>
      </div>

      {/* Main Content Area - Horizontal Split */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Canvas + Bottom Editor */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-700 delay-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Center Canvas */}
            {/* Updated Logic: If Theme is active, use bg-black/80 for much darker opacity */}
            <div className={`flex-1 relative ${isThemeActive ? 'bg-black/80 backdrop-blur-xl' : 'bg-black/10 backdrop-blur-sm'} overflow-hidden flex items-center justify-center transition-colors duration-500`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                
                {module === '3d-avatar' ? render3dCanvas() : render2dCanvas()}

                {/* Dialogs within Canvas area for focus */}
                {showConfirmDialog && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
                        <div className="bg-[#1a1a1a] border border-red-500/30 p-6 rounded-2xl max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400 mb-4">
                            <AlertTriangle size={24} />
                            <h3 className="text-lg font-bold">{t.studio.dialog.title}</h3>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">{t.studio.dialog.desc}</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowConfirmDialog(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">{t.studio.dialog.cancel}</button>
                            <button onClick={confirmModelChange} className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium text-white transition-colors">{t.studio.dialog.confirm}</button>
                        </div>
                        </div>
                    </div>
                )}

                {showCallWarning && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in duration-200">
                        <div className="bg-[#1a1a1a] border border-white/20 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowCallWarning(false)}
                            className="absolute top-2 right-2 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                        <div className="flex items-center gap-3 text-white mb-4">
                            <AlertTriangle size={24} />
                            <h3 className="text-lg font-bold">{t.studio.dialog.tip || "提示"}</h3>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">{t.studio.dialog.callWarning}</p>
                        <div className="flex">
                            <button onClick={() => setShowCallWarning(false)} className="flex-1 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors">OK</button>
                        </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Panel - Editor Only - REDUCED HEIGHT */}
            <div className={`h-[220px] bg-[#111] border-t border-white/10 flex flex-col shrink-0 relative z-20 shadow-2xl`}>
                
                {/* Toolbar */}
                <div className="border-b border-white/5 flex items-center bg-[#181818] h-14 relative z-30 px-2 gap-2">
                    
                    {/* Start Conversation Button - Only for relevant modules */}
                    {(module === '2d-chat' || module === '3d-avatar' || module === '2d-avatar') && (
                      <div className="shrink-0 h-full flex items-center pr-2 border-r border-white/5">
                         <button 
                            onClick={() => setIsCallActive(!isCallActive)} 
                            className={`fancy-button ${isCallActive ? 'red' : 'green'} w-[200px] h-10 flex items-center justify-center shadow-lg transition-all duration-300`}
                        >
                            <span className="text-sm font-bold flex items-center gap-2">
                            {isCallActive ? <PhoneOff size={16} /> : <Phone size={16} />}
                            {isCallActive ? t.studio.controls.endCall : t.studio.controls.voiceCall}
                            </span>
                        </button>
                      </div>
                    )}

                    <div ref={toolbarRef} className="flex-1 flex items-center gap-1 overflow-hidden h-full">
                        {visibleItems.map((item) => {
                            let displayLabel = item.label;
                            if (item.id === 'import') {
                                if (module === '2d-audio') displayLabel = '参考视频';
                                else if (module === '3d-avatar') displayLabel = '导入模型';
                            }
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleToolbarClick(item.id)}
                                    className="flex flex-col items-center justify-center min-w-[50px] h-full gap-0.5 px-2 py-1 hover:bg-white/5 transition-colors text-white/60 hover:text-white group rounded-md"
                                    title={displayLabel}
                                >
                                    <item.icon size={18} className="text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                                    <span className="text-[10px] origin-center font-medium whitespace-nowrap">{displayLabel}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Expand/Collapse Button (Overflow Trigger) */}
                    {overflowItems.length > 0 && (
                        <div className="h-full flex items-center pl-2 border-l border-white/5 relative">
                            <button 
                                onClick={() => !checkCallActive() && setIsOverflowOpen(!isOverflowOpen)}
                                className={`p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors ${isOverflowOpen ? 'bg-white/10 text-white' : ''}`}
                            >
                                <ChevronUp size={20} className={`transition-transform duration-300 ${isOverflowOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Overflow Menu */}
                            {isOverflowOpen && (
                                <div className="absolute bottom-full right-0 mb-2 min-w-[180px] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl p-2 grid grid-cols-3 gap-1 animate-in slide-in-from-bottom-2 fade-in z-50">
                                    {overflowItems.map((item) => {
                                        let displayLabel = item.label;
                                        if (item.id === 'import') {
                                            if (module === '2d-audio') displayLabel = '参考视频';
                                            else if (module === '3d-avatar') displayLabel = '导入模型';
                                        }
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => { handleToolbarClick(item.id); setIsOverflowOpen(false); }}
                                                className="flex flex-col items-center justify-center p-2 hover:bg-white/5 rounded-lg gap-1 transition-colors text-white/60 hover:text-white group"
                                                title={displayLabel}
                                            >
                                                <item.icon size={16} className="text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                                                <span className="text-[9px] text-center font-medium truncate w-full">{displayLabel}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Import Popover Menu */}
                {isImportMenuOpen && (
                    <div className="absolute top-12 left-4 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl p-3 shadow-2xl z-30 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-white/60 uppercase tracking-wider pb-1 border-b border-white/5">
                            <span>
                                {module === '3d-avatar' ? '导入模型' : 
                                 module === '2d-audio' ? '参考视频' : 
                                 '导入文件'}
                            </span>
                            <button onClick={() => setIsImportMenuOpen(false)} className="hover:text-white"><X size={14}/></button>
                        </div>
                        <button 
                            onClick={() => !checkCallActive() && fileInputRef.current?.click()}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 border-dashed rounded-lg text-xs text-white/70 transition-colors"
                        >
                            <Upload size={14} />
                            Upload New
                        </button>
                        <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1.5">
                            {uploadedHistory.length === 0 && <p className="text-[10px] text-center text-white/20 py-2">No history</p>}
                            {uploadedHistory.map(asset => (
                            <button 
                                key={asset.id} 
                                onClick={() => { setBaseModel(asset.id); setIsImportMenuOpen(false); }} 
                                className="flex items-center gap-2 w-full p-1.5 hover:bg-white/5 rounded-md transition-colors text-left group"
                            >
                                <div className="w-8 h-8 rounded bg-[#111] overflow-hidden shrink-0 border border-white/5">
                                    {asset.mediaType === 'video' ? (
                                        <video src={asset.src} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={asset.src} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <span className="text-[10px] text-white/70 truncate flex-1 group-hover:text-white">{asset.name}</span>
                            </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Text Area Container */}
                <div className="flex-1 relative p-4 overflow-hidden">
                    {/* Audio Visualizer Overlay in Center of Text Area */}
                    <CallVisualizer 
                        active={isCallActive} 
                        width={400} 
                        height={120} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" 
                    />

                    {isVoiceRecording && (
                        <div className="absolute top-2 right-4 z-50">
                            <VoiceCard onCancel={cancelVoiceRecording} />
                        </div>
                    )}
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onClick={() => checkCallActive()}
                        readOnly={isCallActive}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (module !== '2d-audio' && e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder={module === '2d-audio' ? t.studio.controls.drivePlaceholder : t.studio.controls.chatPlaceholder}
                        className={`w-full h-full bg-transparent border-none text-sm text-gray-200 placeholder:text-white/10 focus:outline-none resize-none custom-scrollbar leading-relaxed font-light transition-all duration-500 ${isCallActive ? 'opacity-10 blur-sm' : ''}`}
                        spellCheck={false}
                    />
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-white/5 flex justify-end items-center px-4 gap-2 text-[10px] text-white/30 bg-[#111] select-none relative z-20">
                    <button 
                        onClick={() => !checkCallActive() && setInputValue('')}
                        className="hover:text-white flex items-center gap-1 transition-colors px-2 py-1 hover:bg-white/5 rounded mr-auto"
                        title="Clear"
                    >
                        <Trash2 size={14} />
                    </button>

                    {/* Voice Input Button */}
                    <button 
                        onClick={toggleVoiceRecording}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${isVoiceRecording ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/5 hover:text-white text-white/60'}`}
                        title="Voice Input to Text"
                    >
                        <Mic size={14} />
                        <span className="hidden sm:inline">语音输入</span>
                    </button>

                    {/* Send Button - Hidden for 2d-audio */}
                    {module !== '2d-audio' && (
                        <button 
                            onClick={() => {
                                if(checkCallActive()) return;
                                handleSendMessage();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors shadow-lg shadow-blue-900/20`}
                            title="Send Message"
                        >
                            <Send size={12} /><span>发送</span>
                        </button>
                    )}

                    {/* Start Reading Button / Generate Button for 2d-audio */}
                    <button 
                        onClick={() => {
                             if(checkCallActive()) return;
                             handleGenerate();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 ${(module === '2d-audio' && (isGenerating || isPlaying)) ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-500'} text-white rounded font-medium transition-colors shadow-lg shadow-green-900/20`}
                        title={module === '2d-audio' ? t.studio.controls.generate : "Start Generation"}
                    >
                        {(module === '2d-audio' && (isGenerating || isPlaying)) ? (
                            <><SquareIcon size={12} fill="currentColor" /><span>{t.studio.controls.cancelVoice}</span></>
                        ) : (
                            <><Play size={12} fill="currentColor" /><span>开始朗读</span></>
                        )}
                    </button>
                </div>
            </div>

        </div>

        {/* Right Column: Library + Nav (Full Height) */}
        <div className={`flex shrink-0 h-full border-l border-white/10 relative z-30 transition-all duration-700 delay-300 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Right Panel */}
            <div className="w-80 bg-black/50 backdrop-blur-xl flex flex-col relative shadow-xl">
                {/* Content based on Active Tab - similar logic as before but streamlined */}
                {/* ... (Reuse existing logic for rendering content based on activeRightTab) ... */}
                {activeRightTab === 'voice' && (
                  <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-2">
                          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                             <Mic size={14} />
                             {t.studio.controls.voice}
                          </div>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-2 space-y-6">
                          {/* 1. Language */}
                          <VoiceDropdown 
                              label={t.studio.controls.voiceLangLabel} 
                              value={voiceConfig.lang} 
                              options={VOICE_LANGUAGES} 
                              onChange={(v) => handleVoiceConfigChange(prev => ({...prev, lang: v}))} 
                          />

                          {/* 2. Emotion */}
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-white/60 pl-1">{t.studio.controls.voiceEmotionLabel}</label>
                              <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar snap-x">
                                  {VOICE_EMOTIONS.map((emotion) => (
                                      <button
                                          key={emotion.id}
                                          onClick={() => handleVoiceConfigChange(prev => ({...prev, emotion: emotion.id}))}
                                          className="flex flex-col items-center gap-2 shrink-0 group snap-start"
                                      >
                                          <div className={`w-14 h-14 rounded-full p-0.5 transition-all duration-300 ${
                                              voiceConfig.emotion === emotion.id 
                                              ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105' 
                                              : 'bg-transparent group-hover:bg-white/20'
                                          }`}>
                                              <div className="w-full h-full rounded-full overflow-hidden relative">
                                                  <img 
                                                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
                                                      alt={emotion.name}
                                                      className={`w-full h-full object-cover transition-transform duration-500 ${
                                                          voiceConfig.emotion === emotion.id ? 'scale-110' : 'grayscale-[0.5] group-hover:grayscale-0'
                                                      }`}
                                                  />
                                              </div>
                                          </div>
                                          <span className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                                              voiceConfig.emotion === emotion.id ? 'text-blue-400' : 'text-white/50 group-hover:text-white'
                                          }`}>
                                              {emotion.name}
                                          </span>
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* 3. Search Bar */}
                          <div>
                              <label className="text-xs font-bold text-white/60 pl-1 block mb-2">{t.studio.controls.voiceSelectLabel}</label>
                              <SearchBar placeholder={t.studio.controls.searchVoice} className="mb-0" />
                          </div>

                          {/* 4. Gender Filter */}
                          <div className="space-y-1.5">
                              <label className="text-xs font-bold text-white/60 pl-1">{t.studio.controls.voiceGenderLabel}</label>
                              <div className="flex bg-[#111] p-1 rounded-lg border border-white/10">
                                  {['all', 'male', 'female'].map((g) => (
                                      <button 
                                          key={g} 
                                          onClick={() => handleVoiceConfigChange(prev => ({...prev, genderFilter: g as any}))}
                                          className={`flex-1 py-1.5 rounded-md text-[10px] font-medium transition-all ${voiceConfig.genderFilter === g ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white'}`}
                                      >
                                          {t.studio.controls.voiceFilters[g as keyof typeof t.studio.controls.voiceFilters]}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* 5. Voice List */}
                          <div className="space-y-1.5">
                              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                                  {filteredVoices.map(voice => (
                                      <div 
                                          key={voice.id}
                                          onClick={() => handleVoiceConfigChange(prev => ({...prev, selectedVoice: voice.id}))}
                                          className={`group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all overflow-hidden ${voiceConfig.selectedVoice === voice.id ? 'bg-white/10 border-white/40' : 'bg-[#111] border-white/5 hover:border-white/20'}`}
                                      >
                                          <div className="relative w-8 h-8 shrink-0">
                                              <div 
                                                  className="w-full h-full rounded-full flex items-center justify-center shadow-inner transition-all duration-300 group-hover:blur-[2px]"
                                                  style={{ backgroundColor: voice.color }}
                                              >
                                                  <User size={14} className="text-black/50" />
                                              </div>
                                              {/* Play Overlay on Hover */}
                                              <div 
                                                onClick={(e) => handleVoicePreview(e, voice.id)}
                                                title="Audition / 试听"
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:scale-110"
                                              >
                                                  <Play size={12} fill="white" className="text-white drop-shadow-md" />
                                              </div>
                                          </div>
                                          
                                          <div className="overflow-hidden flex-1">
                                              <div className={`text-xs font-medium truncate ${voiceConfig.selectedVoice === voice.id ? 'text-white' : 'text-white/70'}`}>{voice.name}</div>
                                          </div>
                                          {voiceConfig.selectedVoice === voice.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]" />}
                                      </div>
                                  ))}
                                  {filteredVoices.length === 0 && (
                                      <div className="col-span-2 py-4 text-center text-xs text-white/30 italic">No voices found</div>
                                  )}
                              </div>
                          </div>
                          
                      </div>
                  </div>
                )}

                {activeRightTab === 'avatar' && (
                  <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-0">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                           <User size={14} />
                           {t.studio.assets.models}
                         </div>
                         <SearchBar placeholder={t.studio.controls.searchAvatar} className="mb-0" />
                      </div>

                      {/* Sub-tabs for ALL modules (2D & 3D) */}
                      <div className="shrink-0 px-5 pt-3 pb-2 border-b border-white/10 overflow-x-auto no-scrollbar flex gap-4">
                           {get3DTabs().map(tab => (
                             <button key={tab} onClick={() => !checkCallActive() && setActiveAvatarTab(tab)} className={`pb-2 text-xs font-bold uppercase transition-all border-b-2 whitespace-nowrap ${activeAvatarTab === tab ? 'text-white border-white' : 'text-white/40 border-transparent hover:text-white'}`}>
                               {tab === 'all' ? (lang === 'zh' ? '全部' : 'All') : t.studio.assets.tabs[tab]}
                             </button>
                           ))}
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4 space-y-4">
                           {/* Avatar Grid */}
                           <div className="grid grid-cols-2 gap-4">
                               {(module === '3d-avatar' 
                                  ? ASSETS.filter(a => a.type === 'base' && (activeAvatarTab === 'all' || a.category === activeAvatarTab))
                                  : ASSETS.filter(a => a.type === 'template' && (activeAvatarTab === 'all' || a.category === activeAvatarTab))
                               ).filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(asset => (
                                  <div 
                                    key={asset.id} 
                                    onClick={() => handleAssetClick(asset)}
                                    className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border flex flex-col bg-[#111] group hover:border-white/30 transition-all ${baseModel === asset.id ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/5'}`}
                                  >
                                    <div className={`flex-1 flex items-center justify-center ${cardImageBg} relative overflow-hidden transition-colors w-full`}>
                                       {asset.src ? (
                                         <img src={asset.src} className="w-full h-full object-cover" />
                                       ) : (
                                         <>
                                            {asset.category === 'female' ? <Sparkles size={32} className="text-pink-400" /> : 
                                             asset.category === 'male' ? <Sword size={32} className="text-blue-400" /> : 
                                             asset.category === 'pet' ? <Cat size={32} className="text-orange-400" /> :
                                             <User size={32} className="text-white/50" />}
                                         </>
                                       )}
                                       <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                                           <p className="text-[10px] font-medium text-white text-center drop-shadow-md">{asset.name}</p>
                                       </div>
                                    </div>
                                  </div>
                               ))}
                               {(module === '3d-avatar' 
                                  ? ASSETS.filter(a => a.type === 'base' && (activeAvatarTab === 'all' || a.category === activeAvatarTab))
                                  : ASSETS.filter(a => a.type === 'template' && (activeAvatarTab === 'all' || a.category === activeAvatarTab))
                               ).filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                  <div className="col-span-2 text-center py-8 text-xs text-white/30 italic">
                                    No models found in this category
                                  </div>
                               )}
                           </div>
                      </div>
                  </div>
                )}

                {activeRightTab === 'accessory' && module === '3d-avatar' && (
                  <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-0">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                           <Glasses size={14} />
                           {t.studio.assets.accessories}
                         </div>
                         <SearchBar placeholder={t.studio.controls.searchAccessory} className="mb-0" />
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4 space-y-4">
                           <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                              {[
                                { id: 'all', label: '全部', icon: null },
                                { id: 'top', label: '上衣', icon: Shirt },
                                { id: 'bottom', label: '下衣', icon: Scissors }, 
                                { id: 'shoes', label: '鞋子', icon: Footprints },
                                { id: 'decoration', label: '配饰', icon: Glasses },
                              ].map((cat) => (
                                 <button 
                                    key={cat.id}
                                    onClick={() => !checkCallActive() && setAccessoryFilter(cat.id as any)}
                                    className={`px-2.5 py-1.5 rounded-full text-[10px] font-medium border transition-all flex items-center gap-1 whitespace-nowrap ${
                                      accessoryFilter === cat.id 
                                      ? 'bg-white text-black border-white' 
                                      : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'
                                    }`}
                                 >
                                    {cat.icon && <cat.icon size={10} />}
                                    {cat.label}
                                 </button>
                              ))}
                           </div>
                           
                           <div className="grid grid-cols-3 gap-3">
                              {ASSETS.filter(a => 
                                 a.type === 'accessory' && 
                                 a.compatibleWith?.includes(baseModel) &&
                                 (accessoryFilter === 'all' || a.subCategory === accessoryFilter) &&
                                 (!searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()))
                              ).map(asset => (
                                 <div 
                                   key={asset.id} 
                                   onClick={() => handleAssetClick(asset)}
                                   className={`aspect-square rounded-lg overflow-hidden cursor-pointer border flex flex-col bg-[#111] group hover:border-white/30 transition-all ${accessory === asset.id ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/5'}`}
                                 >
                                   <div className={`flex-1 flex items-center justify-center ${cardImageBg} relative transition-colors`}>
                                     {asset.name.includes('Mask') ? <Ghost size={20} style={{ color: asset.previewColor }} /> :
                                      asset.name.includes('Horn') ? <Moon size={20} style={{ color: asset.previewColor }} /> :
                                      asset.name.includes('Leaf') ? <Flower size={20} style={{ color: asset.previewColor }} /> :
                                      <Zap size={20} style={{ color: asset.previewColor }} />}
                                      
                                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/90 to-transparent">
                                          <p className="text-[9px] font-medium text-white text-center truncate drop-shadow-md">{asset.name}</p>
                                      </div>
                                   </div>
                                 </div>
                              ))}
                              {ASSETS.filter(a => a.type === 'accessory' && a.compatibleWith?.includes(baseModel)).length === 0 && (
                                <div className="col-span-3 text-center py-4 text-xs text-white/20 italic">
                                  No accessories for this model
                                </div>
                              )}
                           </div>
                      </div>
                  </div>
                )}

                {activeRightTab === 'action' && (
                  <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-0">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                           <Activity size={14} />
                           {t.studio.controls.actions}
                         </div>
                         <SearchBar placeholder={t.studio.controls.searchActions} className="mb-0" />
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4">
                           <div className="grid grid-cols-2 gap-3">
                              {ACTIONS.filter(act => !searchQuery || act.name.toLowerCase().includes(searchQuery.toLowerCase())).map(action => (
                                 <button 
                                    key={action.id}
                                    onClick={() => !checkCallActive() && console.log('Action triggered:', action.name)}
                                    className="p-4 bg-[#111] border border-white/5 rounded-xl hover:border-white/30 hover:bg-white/5 transition-all flex flex-col items-center gap-2 group"
                                 >
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{action.icon}</span>
                                    <span className="text-xs font-medium text-white/70 group-hover:text-white">{action.name}</span>
                                 </button>
                              ))}
                           </div>
                      </div>
                  </div>
                )}

                {activeRightTab === 'background' && (
                  <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-0">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                           <ImageIcon size={14} />
                           背景选择
                         </div>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4">
                           <div className="grid grid-cols-2 gap-3">
                              {BACKGROUNDS.map(bg => (
                                 <button 
                                    key={bg.id}
                                    onClick={() => !checkCallActive() && setSelectedBackground(bg)}
                                    className={`relative aspect-[16/9] rounded-xl overflow-hidden border transition-all group ${selectedBackground.id === bg.id ? 'border-white ring-1 ring-white' : 'border-white/10 hover:border-white/40'}`}
                                 >
                                    {bg.type === 'color' ? (
                                        <div className="w-full h-full" style={{ backgroundColor: bg.value }} />
                                    ) : (
                                        <img src={bg.value} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-left">
                                        <span className="text-[10px] font-medium text-white shadow-sm">{bg.name}</span>
                                    </div>
                                    {selectedBackground.id === bg.id && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-black p-0.5 rounded-full">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                    )}
                                 </button>
                              ))}
                           </div>
                      </div>
                  </div>
                )}

                {activeRightTab === 'mine' && (
                   <div className="flex-1 flex flex-col h-full fade-in duration-300">
                      <div className="shrink-0 px-5 pt-5 pb-0">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                           <Save size={14} />
                           {t.studio.assets.tabs.mine}
                         </div>
                         <SearchBar placeholder={t.studio.controls.searchMine} className="mb-0" />
                      </div>
                      
                      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                              {/* Saved Snapshots */}
                              {savedAssets.filter(a => a.module === module && (!searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()))).map(asset => (
                                <div key={asset.id} onClick={() => handleAssetClick(asset)} className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border flex flex-col bg-[#111] group hover:border-white/30 transition-all border-white/5">
                                   <div className={`flex-1 flex items-center justify-center ${cardImageBg} relative transition-colors`}>
                                      {asset.type === 'snapshot' ? <Crown size={24} className="text-yellow-500" /> : <User size={24} className="text-white/50" />}
                                   </div>
                                   <div className="p-2 bg-[#151515] relative">
                                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-[10px] font-medium text-white text-center truncate drop-shadow-md">{asset.name}</p>
                                      </div>
                                   </div>
                                </div>
                              ))}
                              
                              {/* Uploaded History in Mine */}
                              {uploadedHistory.filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(asset => (
                                <div key={asset.id} onClick={() => setBaseModel(asset.id)} className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border flex flex-col bg-[#111] group hover:border-white/30 transition-all ${baseModel === asset.id ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/5'}`}>
                                  <img src={asset.src} className="w-full h-full object-cover" />
                                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                                      <p className="text-[10px] text-white text-center truncate drop-shadow-md">{asset.name}</p>
                                  </div>
                                </div>
                              ))}

                              {savedAssets.filter(a => a.module === module).length === 0 && uploadedHistory.length === 0 && (
                                <div className="col-span-2 text-center text-xs text-white/20 py-10 italic border border-dashed border-white/10 rounded">
                                  No saved items
                                </div>
                              )}
                           </div>
                      </div>
                   </div>
                )}
            </div>

            {/* Vertical Navigation Strip */}
            <div className="w-[60px] border-l border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center py-6 gap-6 z-30 shadow-2xl">
                <button 
                  onClick={() => !checkCallActive() && setActiveRightTab('avatar')}
                  className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'avatar' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  title="Avatar Library"
                >
                  <User size={20} />
                  {activeRightTab === 'avatar' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                </button>
                
                {module === '3d-avatar' && (
                  <button 
                    onClick={() => !checkCallActive() && setActiveRightTab('accessory')}
                    className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'accessory' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                    title="Accessories"
                  >
                    <Glasses size={20} />
                    {activeRightTab === 'accessory' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                  </button>
                )}

                {(module === '2d-avatar' || module === '3d-avatar') && (
                  <button 
                    onClick={() => !checkCallActive() && setActiveRightTab('action')}
                    className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'action' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                    title="Actions"
                  >
                    <Activity size={20} />
                    {activeRightTab === 'action' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                  </button>
                )}

                <button 
                  onClick={() => !checkCallActive() && setActiveRightTab('background')}
                  className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'background' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  title="Background"
                >
                  <ImageIcon size={20} />
                  {activeRightTab === 'background' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                </button>

                <button 
                  onClick={() => !checkCallActive() && setActiveRightTab('voice')}
                  className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'voice' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  title="Voice Settings"
                >
                  <Mic size={20} />
                  {activeRightTab === 'voice' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                </button>

                <button 
                  onClick={() => !checkCallActive() && setActiveRightTab('mine')}
                  className={`p-3 rounded-xl transition-all duration-300 relative group ${activeRightTab === 'mine' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  title="My Assets"
                >
                  <Layers size={20} />
                  {activeRightTab === 'mine' && <div className="absolute left-0 top-1/2 -translate-x-full ml-[-8px] w-1 h-8 bg-white rounded-r-full -translate-y-1/2" />}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}