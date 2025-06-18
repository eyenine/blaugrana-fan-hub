
import { Star, MapPin, Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PlayerSpotlight = () => {
  const players = [
    {
      name: "Robert Lewandowski",
      position: "Forward",
      number: 9,
      nationality: "Poland",
      age: 35,
      goals: 42,
      assists: 8,
      image: "/placeholder.svg",
      stats: { appearances: 45, goals: 42, assists: 8, rating: 8.7 }
    },
    {
      name: "Pedri",
      position: "Midfielder",
      number: 8,
      nationality: "Spain",
      age: 21,
      goals: 6,
      assists: 12,
      image: "/placeholder.svg",
      stats: { appearances: 38, goals: 6, assists: 12, rating: 8.4 }
    },
    {
      name: "Gavi",
      position: "Midfielder",
      number: 6,
      nationality: "Spain",
      age: 20,
      goals: 3,
      assists: 9,
      image: "/placeholder.svg",
      stats: { appearances: 35, goals: 3, assists: 9, rating: 8.1 }
    },
    {
      name: "Ronald Araújo",
      position: "Defender",
      number: 4,
      nationality: "Uruguay",
      age: 25,
      goals: 2,
      assists: 1,
      image: "/placeholder.svg",
      stats: { appearances: 32, goals: 2, assists: 1, rating: 8.3 }
    },
    {
      name: "Marc-André ter Stegen",
      position: "Goalkeeper",
      number: 1,
      nationality: "Germany",
      age: 32,
      goals: 0,
      assists: 0,
      image: "/placeholder.svg",
      stats: { appearances: 40, saves: 125, cleanSheets: 18, rating: 8.5 }
    },
    {
      name: "Raphinha",
      position: "Winger",
      number: 11,
      nationality: "Brazil",
      age: 27,
      goals: 15,
      assists: 11,
      image: "/placeholder.svg",
      stats: { appearances: 43, goals: 15, assists: 11, rating: 8.2 }
    }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Forward": return "bg-red-100 text-red-800";
      case "Midfielder": return "bg-blue-100 text-blue-800";
      case "Defender": return "bg-green-100 text-green-800";
      case "Goalkeeper": return "bg-yellow-100 text-yellow-800";
      case "Winger": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Our Amazing Squad
        </h1>
        <p className="text-gray-600 text-lg">Meet the players who make the magic happen at Camp Nou</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-blue-600 to-red-600">
                  <AvatarImage src={player.image} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-red-600 text-white">
                    {player.number}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {player.number}
                </div>
              </div>
              <CardTitle className="text-xl">{player.name}</CardTitle>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge className={getPositionColor(player.position)}>
                  {player.position}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {player.nationality}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{player.stats.goals || player.stats.saves || 0}</div>
                  <div className="text-xs text-gray-600">{player.position === "Goalkeeper" ? "Saves" : "Goals"}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">{player.stats.assists || player.stats.cleanSheets || 0}</div>
                  <div className="text-xs text-gray-600">{player.position === "Goalkeeper" ? "Clean Sheets" : "Assists"}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold">{player.stats.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Appearances</span>
                <span className="font-semibold">{player.stats.appearances}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayerSpotlight;
