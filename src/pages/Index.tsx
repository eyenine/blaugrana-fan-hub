
import { useState } from "react";
import { Calendar, MessageCircle, Users, Trophy, Star, Heart, Clock, MapPin, Zap, Globe, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import PlayerSpotlight from "@/components/PlayerSpotlight";
import FanChat from "@/components/FanChat";
import MatchFixtures from "@/components/MatchFixtures";
import Navigation from "@/components/Navigation";
import UserProfile from "@/components/UserProfile";
import MatchPredictions from "@/components/MatchPredictions";
import LivePolls from "@/components/LivePolls";
import FanOfTheMonth from "@/components/FanOfTheMonth";
import DigitalTwin from "@/components/DigitalTwin";
import AIFanCompanion from "@/components/AIFanCompanion";
import GuestBanner from "@/components/GuestBanner";
import VerificationBanner from "@/components/VerificationBanner";
import ProtectedFeature from "@/components/ProtectedFeature";
import LiveMatchData from "@/components/LiveMatchData";
import NotificationCenter from "@/components/NotificationCenter";
import SocialHub from "@/components/SocialHub";
import MerchandiseStore from "@/components/MerchandiseStore";
import FanInsights from "@/components/FanInsights";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { isAuthenticated, user } = useAuth();

  const stats = [
    { label: "Global Culers", value: "400M+", icon: Users },
    { label: "Trophies Won", value: "97", icon: Trophy },
    { label: "Years of Glory", value: "124", icon: Star },
    { label: "Camp Nou Capacity", value: "99,354", icon: Heart }
  ];

  const nextMatch = {
    opponent: "Real Madrid",
    date: "2024-10-26",
    time: "21:00",
    venue: "Camp Nou",
    competition: "El Clásico"
  };

  const news = [
    {
      title: "Gavi Returns to Training After Injury Recovery",
      time: "2 hours ago",
      category: "Squad News"
    },
    {
      title: "Camp Nou Renovation Updates: New Capacity Announced",
      time: "5 hours ago",
      category: "Stadium"
    },
    {
      title: "Pedri Nominated for Golden Boy Award",
      time: "1 day ago",
      category: "Awards"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "live-match":
        return <LiveMatchData />;
      case "players":
        return <PlayerSpotlight />;
      case "chat":
        return (
          <ProtectedFeature featureName="Fan Chat" description="Join live discussions with fellow Culers during matches">
            <FanChat />
          </ProtectedFeature>
        );
      case "matches":
        return <MatchFixtures />;
      case "profile":
        return (
          <ProtectedFeature featureName="User Profile" description="Manage your fan profile and track your Barça journey">
            <UserProfile />
          </ProtectedFeature>
        );
      case "predictions":
        return (
          <ProtectedFeature featureName="Match Predictions" description="Use AI insights to predict match outcomes and compete with other fans">
            <MatchPredictions />
          </ProtectedFeature>
        );
      case "polls":
        return (
          <ProtectedFeature featureName="Live Polls" description="Participate in real-time polls during matches">
            <LivePolls />
          </ProtectedFeature>
        );
      case "social-hub":
        return (
          <ProtectedFeature featureName="Social Hub" description="Connect with the global Barça community on social media">
            <SocialHub />
          </ProtectedFeature>
        );
      case "store":
        return <MerchandiseStore />;
      case "insights":
        return (
          <ProtectedFeature featureName="Fan Insights" description="View your personalized stats and achievements">
            <FanInsights />
          </ProtectedFeature>
        );
      case "notifications":
        return (
          <ProtectedFeature featureName="Notification Center" description="Manage your live updates and alerts">
            <NotificationCenter />
          </ProtectedFeature>
        );
      case "digital-twin":
        return (
          <ProtectedFeature featureName="Digital Twin" description="Experience the virtual Camp Nou with real-time atmosphere">
            <DigitalTwin />
          </ProtectedFeature>
        );
      case "ai-companion":
        return (
          <ProtectedFeature featureName="AI Companion" description="Get personalized insights and emotional support from your AI fan companion">
            <AIFanCompanion />
          </ProtectedFeature>
        );
      case "fan-of-month":
        return (
          <ProtectedFeature featureName="Fan Awards" description="Compete for monthly recognition and exclusive rewards">
            <FanOfTheMonth />
          </ProtectedFeature>
        );
      default:
        return (
          <div className="space-y-8">
            {!isAuthenticated && <GuestBanner />}
            
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 p-8 text-white">
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    BarçaVerse
                  </h1>
                  <p className="text-xl opacity-90">
                    {isAuthenticated && user 
                      ? `Welcome back, ${user.username}! Visca el Barça!` 
                      : "Més que un club. More than digital."
                    }
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Next Match</h2>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">FC Barcelona</span>
                        <span className="text-2xl font-bold">VS</span>
                        <span className="text-lg font-semibold">{nextMatch.opponent}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{nextMatch.date} at {nextMatch.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{nextMatch.venue}</span>
                        </div>
                        <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">
                          {nextMatch.competition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <stat.icon className="w-6 h-6 mb-2 text-yellow-400" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm opacity-80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  Latest Barça News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg hover:shadow-md transition-shadow">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200" onClick={() => setActiveSection("live-match")}>
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold mb-2">Live Match</h3>
                  <p className="text-gray-600">Real-time updates & fan reactions</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-red-200" onClick={() => setActiveSection("social-hub")}>
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-red-600" />
                  <h3 className="text-xl font-bold mb-2">Social Hub</h3>
                  <p className="text-gray-600">Connect with global fan community</p>
                  {!isAuthenticated && <Badge className="mt-2">🔒 Login Required</Badge>}
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-200" onClick={() => setActiveSection("store")}>
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-xl font-bold mb-2">Official Store</h3>
                  <p className="text-gray-600">Exclusive gear with XP discounts</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200" onClick={() => setActiveSection("insights")}>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-bold mb-2">Fan Insights</h3>
                  <p className="text-gray-600">Your Barça journey in numbers</p>
                  {!isAuthenticated && <Badge className="mt-2">🔒 Login Required</Badge>}
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
