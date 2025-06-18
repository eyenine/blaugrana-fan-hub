
import { useState } from "react";
import { Home, Users, MessageCircle, Calendar, Settings, Trophy, Brain, Vote, User, Crown, Zap, Bot, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "players", label: "Players", icon: Users },
    { id: "chat", label: "Fan Chat", icon: MessageCircle, protected: true },
    { id: "matches", label: "Matches", icon: Calendar },
    { id: "predictions", label: "Predictions", icon: Brain, protected: true },
    { id: "polls", label: "Live Polls", icon: Vote, protected: true },
    { id: "digital-twin", label: "Digital Twin", icon: Zap, protected: true },
    { id: "ai-companion", label: "AI Companion", icon: Bot, protected: true },
    { id: "profile", label: "Profile", icon: User, protected: true },
    { id: "fan-of-month", label: "Fan Awards", icon: Crown, protected: true },
  ];

  const handleNavClick = (itemId: string, isProtected?: boolean) => {
    if (isProtected && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveSection(itemId);
  };

  return (
    <>
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
                    } ${item.protected && !isAuthenticated ? "opacity-60" : ""}`}
                    onClick={() => handleNavClick(item.id, item.protected)}
                  >
                    <item.icon className="w-3 h-3" />
                    <span className="hidden lg:inline">{item.label}</span>
                    {item.protected && !isAuthenticated && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">🔒</Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{user.username}</p>
                      <Badge className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
                        Lvl {user.fan_level}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{user.xp} XP • Culer since {new Date(user.created_at).getFullYear()}</p>
                  </div>
                  <Avatar className="cursor-pointer" onClick={() => setActiveSection('profile')}>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-red-600 text-white">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-right">
                    <p className="text-sm font-semibold">Guest Visitor</p>
                    <p className="text-xs text-gray-600">Browsing Camp Nou</p>
                  </div>
                  <Button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white"
                  >
                    Join BarçaVerse
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
