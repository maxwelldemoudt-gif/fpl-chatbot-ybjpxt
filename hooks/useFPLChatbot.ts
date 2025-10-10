
import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types/chat';

const FPL_RESPONSES = {
  greeting: [
    "Hello! I'm your FPL assistant. How can I help you with your Fantasy Premier League team today?",
    "Hi there! Ready to dominate your FPL league? What would you like to know?",
    "Welcome to your FPL companion! Ask me anything about transfers, captains, or strategy!"
  ],
  transfers: [
    "For transfers, consider players with good fixtures, form, and value. Who are you thinking of bringing in?",
    "Transfer tips: Look at upcoming fixtures, player form over the last 4-6 games, and injury news. What's your current dilemma?",
    "Smart transfers win leagues! Check fixture difficulty, player ownership, and price changes. What position needs strengthening?"
  ],
  captain: [
    "Captain choice is crucial! Look for players with good fixtures, home advantage, and recent form. Who are your options?",
    "For captaincy, consider: fixture difficulty, player form, penalty takers, and differential potential. What's your shortlist?",
    "The captain gets double points, so choose wisely! Premium players with good fixtures are usually safe bets."
  ],
  fixtures: [
    "Fixture analysis is key! Green fixtures (2-3 difficulty) are ideal for captains and transfers. Which gameweek are you planning for?",
    "Good fixtures can make or break your gameweek. Look 3-4 weeks ahead for transfer planning. Need help with any specific teams?",
    "Fixture difficulty ratings help identify the best players to target. Which teams have caught your eye?"
  ],
  default: [
    "That's an interesting question! For specific FPL advice, try asking about transfers, captains, fixtures, or player recommendations.",
    "I'd love to help with that! Could you be more specific about your FPL question? I can help with team selection, transfers, and strategy.",
    "Great question! I'm here to help with all things FPL. What specific aspect of your team would you like to discuss?"
  ]
};

export const useFPLChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your FPL assistant. How can I help you with your Fantasy Premier League team today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse(FPL_RESPONSES.greeting);
    }
    
    if (message.includes('transfer') || message.includes('buy') || message.includes('sell')) {
      return getRandomResponse(FPL_RESPONSES.transfers);
    }
    
    if (message.includes('captain') || message.includes('armband')) {
      return getRandomResponse(FPL_RESPONSES.captain);
    }
    
    if (message.includes('fixture') || message.includes('match') || message.includes('game')) {
      return getRandomResponse(FPL_RESPONSES.fixtures);
    }
    
    if (message.includes('salah')) {
      return "Salah is always a premium option! He's consistent, takes penalties, and Liverpool usually have good attacking returns. Consider his fixtures and recent form.";
    }
    
    if (message.includes('haaland')) {
      return "Haaland is the ultimate premium striker! His goal-scoring record is incredible, but he can be rotated. Check Pep's press conferences for hints!";
    }
    
    if (message.includes('wildcard')) {
      return "Wildcard timing is crucial! Use it when you need major team changes, during international breaks, or before double gameweeks. Have you identified your targets?";
    }
    
    return getRandomResponse(FPL_RESPONSES.default);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds

  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your FPL assistant. How can I help you with your Fantasy Premier League team today?",
        isUser: false,
        timestamp: new Date(),
      }
    ]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
};
