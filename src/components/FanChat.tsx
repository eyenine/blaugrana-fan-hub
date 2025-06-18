
import { useState, useRef, useEffect } from "react";
import { Send, Heart, MessageCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const FanChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "CulerForLife",
      message: "Can't wait for El Clásico! Visca el Barça! 💙❤️",
      time: "2 min ago",
      likes: 12,
      country: "Spain"
    },
    {
      id: 2,
      user: "PedriMagic",
      message: "Lewandowski is on fire this season! 🔥",
      time: "5 min ago",
      likes: 8,
      country: "Poland"
    },
    {
      id: 3,
      user: "BlaugranaForever",
      message: "The team chemistry is incredible this year!",
      time: "8 min ago",
      likes: 15,
      country: "Argentina"
    },
    {
      id: 4,
      user: "CampNouDreamer",
      message: "Who's going to the match this weekend?",
      time: "12 min ago",
      likes: 6,
      country: "Brazil"
    },
    {
      id: 5,
      user: "BarçaFromIndia",
      message: "Watching from Mumbai! The passion is global! 🌍",
      time: "15 min ago",
      likes: 20,
      country: "India"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers] = useState(2847);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "You",
        message: newMessage,
        time: "Just now",
        likes: 0,
        country: "Spain"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleLike = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      "Spain": "🇪🇸",
      "Poland": "🇵🇱",
      "Argentina": "🇦🇷",
      "Brazil": "🇧🇷",
      "India": "🇮🇳"
    };
    return flags[country] || "🌍";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Culer Community Chat
        </h1>
        <p className="text-gray-600 text-lg">Connect with Barça fans worldwide</p>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">{onlineUsers.toLocaleString()} Culers online</span>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
            <MessageCircle className="w-3 h-3 mr-1" />
            Live Chat
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-red-50">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Live Discussion
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-600 to-red-600 text-white">
                      {msg.user[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{msg.user}</span>
                      <span className="text-xs">{getCountryFlag(msg.country)}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{msg.message}</p>
                    <button 
                      onClick={() => handleLike(msg.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-3 h-3" />
                      {msg.likes}
                    </button>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Share your Barça passion..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Online Users Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-green-500" />
                Culers Online
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {["CulerForLife", "PedriMagic", "BlaugranaForever", "CampNouDreamer", "BarçaFromIndia", "MessiLegacy", "XaviMaestro", "LaManiaBlaugrana"].map((user, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs bg-blue-100">
                        {user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 truncate">{user}</span>
                  </div>
                ))}
                <div className="text-xs text-gray-500 pt-2 border-t">
                  +{(onlineUsers - 8).toLocaleString()} more culers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FanChat;
