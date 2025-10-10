
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  image?: {
    uri: string;
    width?: number;
    height?: number;
  };
  imageAnalysis?: {
    isAnalyzing: boolean;
    analysisComplete: boolean;
  };
}

export interface FPLPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  points: number;
  form: number;
}

export interface FPLTeam {
  id: number;
  name: string;
  players: FPLPlayer[];
  totalPoints: number;
  teamValue: number;
  bank: number;
}

export interface ImagePickerResult {
  uri: string;
  width?: number;
  height?: number;
  fileSize?: number;
  fileName?: string;
}
