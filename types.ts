import { CSSProperties } from 'react';

export interface ColorBendsProps {
  colors?: string[];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  autoRotate?: number;
  transparent?: boolean;
  className?: string;
  style?: CSSProperties;
}

export type AppModule = '2d-audio' | '2d-chat' | '3d-avatar' | '2d-avatar';

export interface Asset {
  id: string;
  name: string;
  type: 'base' | 'accessory' | 'template' | 'upload' | 'snapshot';
  module?: AppModule; // Added to track which module saved this asset
  category?: 'male' | 'female' | 'pet';
  subCategory?: 'top' | 'bottom' | 'shoes' | 'decoration';
  previewColor?: string;
  previewImage?: string;
  src?: string;
  mediaType?: 'image' | 'video' | 'audio'; // Added 'audio' for BGM
  compatibleWith?: string[];
  state?: {
    baseModel: string;
    accessory: string | null;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}