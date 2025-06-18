
import { Home, Users, MessageCircle, Calendar, Settings, Trophy, Brain, Vote, User, Crown, Zap, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "players", label: "Players", icon: Users },
    { id: "chat", label: "Fan Chat", icon: MessageCircle },
    { id: "matches", label: "Matches", icon: Calendar },
    { id: "predictions", label: "Predictions", icon: Brain },
    { id: "polls", label: "Live Polls", icon: Vote },
    { id: "digital-twin", label: "Digital Twin", icon: Zap },
    { id: "ai-companion", label: "AI Companion", icon: Bot },
    { id: "profile", label: "Profile", icon: User },
    { id: "fan-of-month", label: "Fan Awards", icon: Crown },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-600 to-red-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                BarçaVerse
              </span>
            </div>
            
            <div className="hidden md:flex space-x-1 overflow-x-auto">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 whitespace-nowrap text-xs px-2 py-1 h-8 ${
                    activeSection === item.id 
                      ? "bg-gradient-to-r from-blue-600 to-red-600 text-white" 
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="w-3 h-3" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold">Culer Since 2010</p>
              <p className="text-xs text-gray-600">Visca el Barça!</p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-red-600 text-white">
                FC
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
