
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
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
