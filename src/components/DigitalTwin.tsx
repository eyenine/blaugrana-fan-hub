
import { useState, useEffect } from "react";
import { Zap, Users, Heart, MapPin, Camera, Mic, Eye, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DigitalTwin = () => {
  const [activeSection, setActiveSection] = useState("stadium");
  const [liveViewers, setLiveViewers] = useState(47823);
  const [emotionLevel, setEmotionLevel] = useState(85);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 100) - 50);
      setEmotionLevel(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 20) - 10)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stadiumSections = [
    { name: "Goal Nord", fans: 12340, emotion: 92, color: "bg-red-500" },
    { name: "Lateral Tribuna", fans: 8765, emotion: 78, color: "bg-blue-500" },
    { name: "Goal Sud", fans: 9876, emotion: 88, color: "bg-yellow-500" },
    { name: "Lateral Preferent", fans: 6543, emotion: 82, color: "bg-green-500" }
  ];

  const liveExperiences = [
    {
      title: "Virtual Camp Nou Tour",
      description: "360° immersive experience of the holy ground",
      participants: 2340,
      intensity: 95,
      icon: Eye
    },
    {
      title: "Live Chant Sync",
      description: "Sing with 50K fans in real-time harmony",
      participants: 52000,
      intensity: 89,
      icon: Mic
    },
    {
      title: "Emotion Wave",
      description: "Feel the collective heartbeat of Culers worldwide",
      participants: 78000,
      intensity: 92,
      icon: Heart
    },
    {
      title: "AI Coach Vision",
      description: "See the match through Xavi's tactical lens",
      participants: 15600,
      intensity: 87,
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-2">
          Digital Camp Nou Twin
        </h1>
        <p className="text-gray-600 text-lg">Experience the stadium atmosphere from anywhere in the world</p>
        
        <div className="flex justify-center items-center gap-6 mt-4">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <Zap className="w-3 h-3 mr-1 animate-pulse" />
            Live Stadium Twin
          </Badge>
          <div className="text-sm text-gray-600">
            <Users className="w-4 h-4 inline mr-1" />
            {liveViewers.toLocaleString()} fans connected
          </div>
        </div>
      </div>

      {/* Stadium Heatmap */}
      <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Live Stadium Emotion Map
          </CardTitle>
          <div className="text-sm text-gray-600">
            Real-time fan sentiment across Camp Nou sections
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stadiumSections.map((section, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{section.name}</span>
                  <Badge className={section.color}>
                    {section.fans.toLocaleString()} fans
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Emotion Level</span>
                    <span className="font-bold">{section.emotion}%</span>
                  </div>
                  <Progress value={section.emotion} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Stadium Pulse */}
          <div className="text-center p-6 bg-white/80 rounded-xl border">
            <div className="text-3xl font-bold text-blue-600 mb-2">{emotionLevel}%</div>
            <div className="text-sm text-gray-600">Collective Stadium Energy</div>
            <div className="w-24 h-24 mx-auto mt-4 relative">
              <div className={`w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 animate-pulse opacity-${Math.floor(emotionLevel/10)*10}`}></div>
              <Heart className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Immersive Experiences */}
      <div className="grid md:grid-cols-2 gap-6">
        {liveExperiences.map((experience, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <experience.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{experience.title}</CardTitle>
                  <p className="text-sm text-gray-600">{experience.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {experience.participants.toLocaleString()} participants
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  {experience.intensity}% intensity
                </Badge>
              </div>
              <Progress value={experience.intensity} className="h-3" />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Join Experience
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Virtual Reality Controls */}
      <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-yellow-600" />
            Immersive Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Eye className="w-6 h-6 mb-1" />
              <span className="text-xs">Player Cam</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Users className="w-6 h-6 mb-1" />
              <span className="text-xs">Crowd View</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Mic className="w-6 h-6 mb-1" />
              <span className="text-xs">Chant Mode</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-xs">Feel Pulse</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalTwin;
