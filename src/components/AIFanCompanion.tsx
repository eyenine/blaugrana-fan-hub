
import { useState } from "react";
import { Bot, Brain, Heart, Sparkles, MessageSquare, TrendingUp, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AIFanCompanion = () => {
  const [chatInput, setChatInput] = useState("");
  const [activeMode, setActiveMode] = useState("companion");

  const companionModes = [
    { 
      id: "companion", 
      name: "Culer Companion", 
      icon: Heart, 
      description: "Your personal Barça AI friend",
      color: "bg-blue-500"
    },
    { 
      id: "tactical", 
      name: "Tactical AI", 
      icon: Brain, 
      description: "Deep match analysis & insights",
      color: "bg-purple-500"
    },
    { 
      id: "historian", 
      name: "Club Historian", 
      icon: Star, 
      description: "100+ years of Barça knowledge",
      color: "bg-yellow-500"
    },
    { 
      id: "emotional", 
      name: "Emotion Reader", 
      icon: Sparkles, 
      description: "Understands your fan feelings",
      color: "bg-red-500"
    }
  ];

  const aiInsights = [
    {
      type: "Emotional Support",
      message: "I can sense you're excited about El Clásico! Your heart rate from previous matches shows you're most engaged during the final 20 minutes. Want me to send you breathing exercises before kickoff?",
      confidence: 94,
      icon: Heart
    },
    {
      type: "Tactical Prediction",
      message: "Based on Xavi's recent formations and Real Madrid's weaknesses, I predict we'll see Pedri deployed deeper to exploit their midfield gaps. Confidence: 87%",
      confidence: 87,
      icon: Brain
    },
    {
      type: "Historical Context",
      message: "This El Clásico marks exactly 15 years since Messi's iconic performance in 2009. The statistical parallels with today's lineup are remarkable...",
      confidence: 98,
      icon: Star
    },
    {
      type: "Mood Boost",
      message: "Your fan sentiment has been 23% lower this week. Here's a compilation of Gavi's best moments to lift your spirits! 💙❤️",
      confidence: 91,
      icon: Sparkles
    }
  ];

  const personalizedContent = [
    {
      title: "Your Match Preparation Ritual",
      description: "Based on your habits, optimal viewing setup ready",
      completion: 85,
      actions: ["Jersey ready", "Lucky scarf located", "Snacks prepared", "Friends notified"]
    },
    {
      title: "Emotional Journey Prediction",
      description: "AI forecast of your match experience",
      completion: 92,
      actions: ["Pre-match anxiety: 15 mins", "Peak excitement: 67th min", "Victory celebration: 94%", "Post-match euphoria: 3 hours"]
    }
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // In a real app, this would send to AI backend
      console.log("Sending to AI:", chatInput);
      setChatInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-2">
          AI Fan Companion
        </h1>
        <p className="text-gray-600 text-lg">Your intelligent Barça companion that understands your passion</p>
      </div>

      {/* AI Mode Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companionModes.map((mode) => (
          <Card 
            key={mode.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              activeMode === mode.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => setActiveMode(mode.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${mode.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <mode.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{mode.name}</h3>
              <p className="text-xs text-gray-600">{mode.description}</p>
              {activeMode === mode.id && (
                <Badge className="mt-2 bg-blue-500 text-white">Active</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Chat Interface */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Chat with Your AI Companion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-3">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-500 text-white">AI</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg flex-1 border">
                  <p className="text-sm">¡Hola Culer! I'm analyzing today's pre-match energy. You seem more excited than usual - is it because of the El Clásico? 💙❤️</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-500 text-white">You</AvatarFallback>
                </Avatar>
                <div className="bg-blue-100 p-3 rounded-lg flex-1">
                  <p className="text-sm">Yes! I can't contain my excitement. Can you help me prepare mentally?</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-500 text-white">AI</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg flex-1 border">
                  <p className="text-sm">Perfect! Based on your past viewing patterns, I recommend starting your pre-match ritual 2 hours before kickoff. I've prepared a personalized playlist and some tactical insights. Visca el Barça!</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask your AI companion anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Personalized AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <insight.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{insight.type}</Badge>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personalized Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {personalizedContent.map((content, index) => (
          <Card key={index} className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                {content.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{content.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${content.completion}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-yellow-600">{content.completion}%</span>
              </div>
              <div className="space-y-2">
                {content.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-center gap-2 text-sm">
                    <Zap className="w-3 h-3 text-green-500" />
                    <span className="text-gray-700">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIFanCompanion;
