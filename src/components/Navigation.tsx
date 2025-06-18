
import React, { useState } from 'react';
import { Menu, X, Home, Users, MessageCircle, Calendar, Trophy, User, Bell, ShoppingCart, TrendingUp, Globe, Zap, Brain, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, protected: false },
    { id: 'live-match', label: 'Live Match', icon: Zap, protected: false },
    { id: 'players', label: 'Players', icon: Users, protected: false },
    { id: 'matches', label: 'Fixtures', icon: Calendar, protected: false },
    { id: 'chat', label: 'Fan Chat', icon: MessageCircle, protected: true },
    { id: 'predictions', label: 'AI Predictions', icon: Brain, protected: true },
    { id: 'polls', label: 'Live Polls', icon: Trophy, protected: true },
    { id: 'social-hub', label: 'Social Hub', icon: Globe, protected: true },
    { id: 'store', label: 'Store', icon: ShoppingCart, protected: false },
    { id: 'insights', label: 'Fan Insights', icon: TrendingUp, protected: true },
    { id: 'notifications', label: 'Notifications', icon: Bell, protected: true },
    { id: 'digital-twin', label: 'Virtual Camp Nou', icon: MapPin, protected: true },
    { id: 'ai-companion', label: 'AI Companion', icon: Brain, protected: true },
    { id: 'fan-of-month', label: 'Fan Awards', icon: Trophy, protected: true },
  ];

  const handleNavigation = (sectionId: string, isProtected: boolean) => {
    if (isProtected && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActiveSection('home');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-red-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  BarçaVerse
                </h1>
                <p className="text-xs opacity-80">Digital Camp Nou</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.slice(0, 8).map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  size="sm"
                  className={`text-white hover:bg-white/20 ${
                    activeSection === item.id ? 'bg-white/20' : ''
                  }`}
                  onClick={() => handleNavigation(item.id, item.protected)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.protected && !isAuthenticated && (
                    <Badge className="ml-2 bg-yellow-500 text-black text-xs">🔒</Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{user.username}</div>
                    <div className="text-xs opacity-80 flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      Level {user.fan_level} • {user.xp} XP
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setActiveSection('profile')}
                  >
                    <User className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:flex"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-blue-800 border-t border-blue-700">
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start text-white hover:bg-white/20 ${
                      activeSection === item.id ? 'bg-white/20' : ''
                    }`}
                    onClick={() => handleNavigation(item.id, item.protected)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                    {item.protected && !isAuthenticated && (
                      <Badge className="ml-auto bg-yellow-500 text-black text-xs">🔒</Badge>
                    )}
                  </Button>
                ))}
                
                {!isAuthenticated && (
                  <Button
                    variant="secondary"
                    className="w-full mt-4"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In to Unlock All Features
                  </Button>
                )}
                
                {isAuthenticated && (
                  <div className="pt-4 border-t border-blue-700">
                    <div className="text-sm text-center mb-3">
                      <div className="font-semibold">{user?.username}</div>
                      <div className="opacity-80">Level {user?.fan_level} • {user?.xp} XP</div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};

export default Navigation;
