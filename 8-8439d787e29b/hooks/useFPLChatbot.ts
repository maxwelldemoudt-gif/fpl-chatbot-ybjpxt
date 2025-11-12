
import { useState, useCallback } from 'react';
import { ChatMessage, ImagePickerResult } from '@/types/chat';

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
  imageAnalysis: [
    "Great team screenshot! Based on what I can see, here are some suggestions:\n\n• Consider your captain choice - look for players with favorable fixtures\n• Check if you have good bench coverage for rotation\n• Monitor price changes for potential transfer targets\n• Ensure you have a good balance across all positions\n\nWhat specific aspect of your team would you like me to focus on?",
    "Nice team setup! From your image, I can offer these insights:\n\n• Your premium players should be consistent performers\n• Look for budget gems that offer great value\n• Consider upcoming fixture difficulty when planning transfers\n• Make sure you have playing substitutes\n\nWould you like specific advice on any particular players or positions?",
    "Excellent team image! Here's my analysis:\n\n• Balance is key - avoid too many players from one team\n• Check for upcoming blank/double gameweeks\n• Consider differential picks to gain rank\n• Monitor injury news for your key players\n\nWhat's your main concern with this team selection?"
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
      text: "Hello! I'm your FPL assistant. How can I help you with your Fantasy Premier League team today?\n\n💡 Tip: You can upload a screenshot of your team for personalized analysis!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeTeamImage = async (imageUri: string): Promise<string> => {
    // Simulate image analysis processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // For now, we'll provide generic but helpful FPL advice
    // In a real implementation, this would use computer vision or AI to analyze the team
    const analysisResponses = [
      `📊 **Team Analysis Complete!**

Based on your team screenshot, here are my recommendations:

🎯 **Captain Suggestions:**
• Look for players with green fixtures (difficulty 1-3)
• Consider home advantage and recent form
• Premium players like Salah, Haaland are usually safe choices

💰 **Transfer Recommendations:**
• Monitor price rises/falls before deadline
• Target players with 3-4 good fixtures ahead
• Consider budget enablers to free up funds

⚖️ **Team Balance:**
• Ensure you have playing bench players
• Don't triple up on any single team
• Mix premium picks with budget gems

🔄 **Upcoming Considerations:**
• Check for blank/double gameweeks
• Monitor injury news daily
• Consider differential picks for rank gains

What specific area would you like me to elaborate on?`,

      `🔍 **Detailed Team Review**

Your team setup looks interesting! Here's my analysis:

🏆 **Strengths I Notice:**
• Good mix of premium and budget players
• Decent fixture coverage across positions
• Smart captain options available

⚠️ **Areas for Improvement:**
• Consider rotation risk for some players
• Monitor upcoming fixture swings
• Check bench strength for emergencies

📈 **Strategic Advice:**
• Plan transfers 2-3 weeks ahead
• Use price prediction tools
• Follow press conferences for team news

🎲 **Differential Opportunities:**
• Look for low-owned players with good fixtures
• Consider promoted team assets early in season
• Monitor penalty takers and set-piece specialists

Which players are you most concerned about right now?`,

      `⚡ **Quick Team Assessment**

Great team image! Here's what stands out:

✅ **What's Working:**
• Solid foundation with reliable scorers
• Good value picks in key positions
• Flexible formation options

🔧 **Potential Tweaks:**
• Monitor fixture difficulty changes
• Consider upcoming international breaks
• Watch for rotation in cup competitions

💡 **Pro Tips:**
• Use your free transfers wisely
• Don't chase last week's points
• Trust your research over popular picks

🎯 **Next Steps:**
• Check player ownership percentages
• Review upcoming fixture difficulty
• Plan for potential wildcard timing

What's your biggest FPL dilemma right now?`
    ];

    return analysisResponses[Math.floor(Math.random() * analysisResponses.length)];
  };

  const generateResponse = (userMessage: string, hasImage: boolean = false): string => {
    const message = userMessage.toLowerCase();
    
    // If there's an image, prioritize image analysis responses
    if (hasImage) {
      return getRandomResponse(FPL_RESPONSES.imageAnalysis);
    }
    
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
    
    if (message.includes('analyze') || message.includes('analysis') || message.includes('team')) {
      return "I'd love to analyze your team! Upload a screenshot of your FPL team using the photo button, and I'll provide detailed insights and suggestions.";
    }
    
    return getRandomResponse(FPL_RESPONSES.default);
  };

  const sendMessage = useCallback(async (text: string, image?: ImagePickerResult) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
      image: image ? {
        uri: image.uri,
        width: image.width,
        height: image.height,
      } : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // If there's an image, show analysis in progress
    if (image) {
      // Add a message showing analysis is in progress
      const analysisMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Analyzing your team image...",
        isUser: false,
        timestamp: new Date(),
        imageAnalysis: {
          isAnalyzing: true,
          analysisComplete: false,
        },
      };

      setMessages(prev => [...prev, analysisMessage]);

      try {
        // Perform image analysis
        const analysisResult = await analyzeTeamImage(image.uri);
        
        // Update the analysis message with results
        setMessages(prev => prev.map(msg => 
          msg.id === analysisMessage.id 
            ? {
                ...msg,
                text: analysisResult,
                imageAnalysis: {
                  isAnalyzing: false,
                  analysisComplete: true,
                },
              }
            : msg
        ));
      } catch (error) {
        console.error('Image analysis error:', error);
        
        // Update with error message
        setMessages(prev => prev.map(msg => 
          msg.id === analysisMessage.id 
            ? {
                ...msg,
                text: "Sorry, I had trouble analyzing your team image. Please try uploading again or ask me specific questions about your team!",
                imageAnalysis: {
                  isAnalyzing: false,
                  analysisComplete: false,
                },
              }
            : msg
        ));
      }
      
      setIsTyping(false);
    } else {
      // Regular text response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: generateResponse(text, false),
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1500);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your FPL assistant. How can I help you with your Fantasy Premier League team today?\n\n💡 Tip: You can upload a screenshot of your team for personalized analysis!",
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
