import React, { useState } from 'react';
import ColorBends from './components/ColorBends';
import Landing from './components/Landing';
import Studio from './components/Studio';
import CursorSystem from './components/CursorSystem';
import { AppModule, Asset } from './types';

const TEXT_CONTENT = {
  zh: {
    navLang: '简体中文',
    heroTitle: "新一代 AIGC 创作平台",
    heroSubtitle: "我们赋予你重塑数字命运的力量",
    features: ["2D 对口型", "2D 实时对话", "2D 虚拟化身", "3D 虚拟化身"],
    studio: {
      nav: {
        saveSettings: "保存设置",
        systemSettings: "系统设置"
      },
      controls: {
        title: "控制台",
        subtitle2d: "配置你的数字代理",
        subtitle3d: "塑造你的虚拟化身",
        voice: "音色选择",
        voiceSelectLabel: "选择音色",
        voiceLangLabel: "语言",
        voiceGenderLabel: "性别",
        voiceFilters: {
            all: "全部",
            male: "男声",
            female: "女声"
        },
        voiceEmotionLabel: "情绪",
        voiceSpeedLabel: "语速",
        voicePitchLabel: "语调",
        refImage: "参考形象 / 视频",
        bgMusic: "上传背景音乐",
        upload: "上传",
        uploadModel: "上传模型",
        input: "输入模式",
        placeholder: "输入对话内容...",
        drivePlaceholder: "输入想要数字人播报的内容...",
        chatPlaceholder: "输入消息或按住说话...",
        initiate: "建立连接",
        terminate: "断开连接",
        generate: "开始生成",
        generating: "生成中...",
        ready: "READY",
        history: "历史记录",
        voiceCall: "开始对话",
        endCall: "结束对话",
        send: "发送",
        voiceInput: "语音输入文字",
        listening: "正在听...",
        cancelVoice: "取消",
        finishVoice: "说完了",
        releaseToSend: "松开发送",
        callActive: "通话中",
        searchVoice: "搜索音色名...",
        searchAvatar: "搜索形象名...",
        searchAccessory: "搜索配饰名...",
        searchMine: "搜索预设名...",
        actions: "动作",
        searchActions: "搜索动作..."
      },
      dialog: {
        title: "覆盖模型?",
        desc: "切换基础模型将重置当前的配饰组合。确定要继续吗？",
        confirm: "确定覆盖",
        cancel: "取消",
        callWarning: "请先结束当前对话",
        tip: "提示"
      },
      assets: {
        title: "资产库",
        save: "保存状态 (云端)",
        tabs: {
          public: "形象库",
          mine: "我的",
          male: "男",
          female: "女",
          pet: "宠物"
        },
        models: "角色模型",
        accessories: "形象配饰"
      }
    }
  },
  en: {
    navLang: 'English',
    heroTitle: "Next-Gen AIGC Platform",
    heroSubtitle: "Empowering you to reshape your digital destiny",
    features: ["2D Lip Sync", "2D Real-time Chat", "2D Virtual Avatar", "3D Virtual Avatar"],
    studio: {
      nav: {
        saveSettings: "Save Settings",
        systemSettings: "System Settings"
      },
      controls: {
        title: "Control Panel",
        subtitle2d: "Configure your Digital Agent",
        subtitle3d: "Sculpt your Virtual Avatar",
        voice: "Voice Selection",
        voiceSelectLabel: "Select Voice",
        voiceLangLabel: "Language",
        voiceGenderLabel: "Gender",
        voiceFilters: {
            all: "All",
            male: "Male",
            female: "Female"
        },
        voiceEmotionLabel: "Emotion",
        voiceSpeedLabel: "Speed",
        voicePitchLabel: "Pitch",
        refImage: "Reference Image / Video",
        bgMusic: "Upload BGM",
        upload: "Upload",
        uploadModel: "Upload Model",
        input: "Input Mode",
        placeholder: "Type your message...",
        drivePlaceholder: "Enter text for the avatar to speak...",
        chatPlaceholder: "Type message or hold to speak...",
        initiate: "Initiate Link",
        terminate: "Terminate Link",
        generate: "Start Generating",
        generating: "Generating...",
        ready: "READY",
        history: "History",
        voiceCall: "Start Conversation",
        endCall: "End Conversation",
        send: "Send",
        voiceInput: "Voice Input to Text",
        listening: "Listening...",
        cancelVoice: "Cancel",
        finishVoice: "Done",
        releaseToSend: "Release to Send",
        callActive: "In Call",
        searchVoice: "Search voice name...",
        searchAvatar: "Search avatar name...",
        searchAccessory: "Search accessory name...",
        searchMine: "Search preset name...",
        actions: "Actions",
        searchActions: "Search actions..."
      },
      dialog: {
        title: "Overwrite Model?",
        desc: "Switching the base model will reset your current accessory combination. Are you sure?",
        confirm: "Overwrite",
        cancel: "Cancel",
        callWarning: "Please end the current conversation first",
        tip: "Notice"
      },
      assets: {
        title: "Asset Library",
        save: "Save State (Cloud)",
        tabs: {
          public: "Avatar Lib",
          mine: "Mine",
          male: "Male",
          female: "Female",
          pet: "Pet"
        },
        models: "Character Model",
        accessories: "Accessories"
      }
    }
  }
};

const THEME_URLS = {
  themeA: "https://res.cloudinary.com/djmxoehe9/video/upload/v1765817364/12%E6%9C%8816%E6%97%A5_1_u5zzwh.mp4",
  themeB: "https://res.cloudinary.com/djmxoehe9/video/upload/v1765811102/kling_20251215_%E5%9B%BE%E7%94%9F%E8%A7%86%E9%A2%91_%E8%83%8C%E6%99%AF%E6%B0%B4%E7%8F%A0%E6%BC%82%E6%B5%AE%E6%97%8B%E8%BD%AC_%E4%BA%BA_4750_0_dxn5rk.mp4"
};

export default function App() {
  // Global State
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [currentModule, setCurrentModule] = useState<AppModule | null>(null);
  const [bgMode, setBgMode] = useState<'default' | 'themeA' | 'themeB'>('themeA');
  
  // Persist saved assets across modules
  const [savedAssets, setSavedAssets] = useState<Asset[]>([]);

  const t = TEXT_CONTENT[lang];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white selection:bg-indigo-500/30">
      
      {/* 0. Custom Cursor System */}
      <CursorSystem />

      {/* 1. Global Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgMode === 'default' ? (
          /* Render ColorBends with default internal values for maximum performance */
          <ColorBends />
        ) : (
          <video 
            key={bgMode} // Re-render when switching video themes
            src={THEME_URLS[bgMode]}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        )}
        {/* Dark overlay for text readability - Pure black base with transparency */}
        {/* Updated Logic: If module is open, 60%. If Landing, 10% for video themes, 30% for default. */}
        <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
          currentModule 
            ? 'bg-black/60' 
            : bgMode !== 'default' ? 'bg-black/10' : 'bg-black/30'
        }`} />
      </div>

      {/* 2. Content Router */}
      <div className="relative z-10 w-full h-full">
        {currentModule ? (
          <Studio 
            module={currentModule} 
            onChangeModule={setCurrentModule}
            lang={lang} 
            setLang={setLang}
            bgMode={bgMode}
            onBack={() => setCurrentModule(null)}
            onOpenSettings={() => {}} 
            savedAssets={savedAssets}
            onSaveAsset={(asset) => setSavedAssets(prev => [asset, ...prev])}
            t={t}
          />
        ) : (
          <Landing 
            onSelectModule={setCurrentModule} 
            lang={lang}
            setLang={setLang}
            bgMode={bgMode}
            onSetBgMode={setBgMode}
            t={t}
          />
        )}
      </div>
    </div>
  );
}