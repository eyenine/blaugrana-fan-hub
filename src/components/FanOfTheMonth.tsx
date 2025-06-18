
import { Crown, Star, MessageCircle, Heart, Trophy, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const FanOfTheMonth = () => {
  const currentWinner = {
    username: "BarçaLegend2010",
    avatar: "/placeholder.svg",
    location: "Buenos Aires, Argentina",
    points: 15670,
    achievements: [
      "Posted 45 quality discussions this month",
      "Received 892 likes from community",
      "Attended 3 matches (including El Clásico)",
      "Helped 23 new fans with questions",
      "Shared exclusive match photos"
    ],
    badge: "Golden Culer",
    joinDate: "2010-11-29"
  };

  const topContenders = [
    {
      rank: 2,
      username: "CampNouDreamer",
      avatar: "/placeholder.svg",
      points: 14230,
      location: "Barcelona, Spain",
      specialty: "Match Analysis"
    },
    {
      rank: 3,
      username: "MessiForever",
      avatar: "/placeholder.svg",
      points: 13890,
      location: "São Paulo, Brazil",
      specialty: "Historical Facts"
    },
    {
      rank: 4,
      username: "BlaugranaHeart",
      avatar: "/placeholder.svg",
      points: 12450,
      location: "Mumbai, India",
      specialty: "Community Helper"
    },
    {
      rank: 5,
      username: "CulerSince1899",
      avatar: "/placeholder.svg",
      points: 11670,
      location: "New York, USA",
      specialty: "Match Predictions"
    }
  ];

  const pointSystem = [
    { action: "Quality post/comment", points: 50, icon: MessageCircle },
    { action: "Receive likes", points: 5, icon: Heart },
    { action: "Attend match", points: 500, icon: Calendar },
    { action: "Help new fan", points: 100, icon: Star },
    { action: "Share exclusive content", points: 200, icon: Trophy }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Fan of the Month
        </h1>
        <p className="text-gray-600 text-lg">Celebrating our most passionate Culers</p>
      </div>

      {/* Current Winner */}
      <Card className="border-4 border-gradient-to-r from-yellow-400 to-yellow-600 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="text-center">
          <div className="relative">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
              October 2024 Winner
            </Badge>
          </div>
          <Avatar className="w-32 h-32 mx-auto border-8 border-yellow-400">
            <AvatarImage src={currentWinner.avatar} />
            <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-red-600 text-white">
              BL
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl mt-4">{currentWinner.username}</CardTitle>
          <div className="flex justify-center items-center gap-4 mt-2">
            <Badge className="bg-yellow-500 text-black">
              <Crown className="w-3 h-3 mr-1" />
              {currentWinner.badge}
            </Badge>
            <span className="text-gray-600">{currentWinner.location}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {currentWinner.points.toLocaleString()}
            </div>
            <div className="text-lg text-gray-600">Total Points This Month</div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-center">Monthly Achievements</h3>
            <div className="space-y-2">
              {currentWinner.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-white/70 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black">
              <Crown className="w-4 h-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Contenders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              Top Contenders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContenders.map((contender) => (
              <div key={contender.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-400 w-8 text-center">
                  {contender.rank}
                </div>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contender.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-red-600 text-white">
                    {contender.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{contender.username}</div>
                  <div className="text-sm text-gray-600">{contender.location}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {contender.specialty}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{contender.points.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Point System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600" />
              How to Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pointSystem.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{item.action}</span>
                </div>
                <Badge className="bg-blue-600 text-white">
                  +{item.points}
                </Badge>
              </div>
            ))}
            
            <div className="text-center pt-4 border-t">
              <Button variant="outline" className="w-full">
                View Full Rules & Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FanOfTheMonth;
