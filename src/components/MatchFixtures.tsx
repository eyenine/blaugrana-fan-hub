
import { Calendar, Clock, MapPin, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchFixtures = () => {
  const upcomingMatches = [
    {
      opponent: "Real Madrid",
      date: "2024-10-26",
      time: "21:00",
      venue: "Camp Nou",
      competition: "La Liga",
      isHome: true,
      importance: "high"
    },
    {
      opponent: "Bayern Munich",
      date: "2024-11-02",
      time: "21:00",
      venue: "Allianz Arena",
      competition: "Champions League",
      isHome: false,
      importance: "high"
    },
    {
      opponent: "Atletico Madrid",
      date: "2024-11-09",
      time: "16:15",
      venue: "Camp Nou",
      competition: "La Liga",
      isHome: true,
      importance: "medium"
    },
    {
      opponent: "Real Sociedad",
      date: "2024-11-16",
      time: "20:00",
      venue: "Reale Arena",
      competition: "La Liga",
      isHome: false,
      importance: "medium"
    }
  ];

  const recentResults = [
    {
      opponent: "Valencia",
      result: "2-1",
      date: "2024-10-19",
      venue: "Camp Nou",
      competition: "La Liga",
      isHome: true,
      won: true
    },
    {
      opponent: "Sevilla",
      result: "1-0",
      date: "2024-10-15",
      venue: "Camp Nou",
      competition: "La Liga",
      isHome: true,
      won: true
    },
    {
      opponent: "Inter Milan",
      result: "3-1",
      date: "2024-10-10",
      venue: "San Siro",
      competition: "Champions League",
      isHome: false,
      won: true
    },
    {
      opponent: "Getafe",
      result: "4-0",
      date: "2024-10-05",
      venue: "Camp Nou",
      competition: "La Liga",
      isHome: true,
      won: true
    }
  ];

  const leagueTable = [
    { position: 1, team: "FC Barcelona", played: 10, won: 9, drawn: 1, lost: 0, points: 28 },
    { position: 2, team: "Real Madrid", played: 10, won: 7, drawn: 2, lost: 1, points: 23 },
    { position: 3, team: "Atletico Madrid", played: 10, won: 6, drawn: 3, lost: 1, points: 21 },
    { position: 4, team: "Athletic Bilbao", played: 10, won: 5, drawn: 4, lost: 1, points: 19 },
    { position: 5, team: "Real Sociedad", played: 10, won: 5, drawn: 2, lost: 3, points: 17 }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "border-red-500 bg-red-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      default: return "border-blue-500 bg-blue-50";
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "Champions League": return "bg-blue-600 text-white";
      case "La Liga": return "bg-orange-500 text-white";
      case "Copa del Rey": return "bg-green-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Match Center
        </h1>
        <p className="text-gray-600 text-lg">Stay updated with all Barça fixtures and results</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            La Liga Table
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMatches.map((match, index) => (
            <Card key={index} className={`border-2 ${getImportanceColor(match.importance)} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Badge className={getCompetitionColor(match.competition)}>
                    {match.competition}
                  </Badge>
                  {match.importance === "high" && (
                    <Badge variant="destructive">High Priority</Badge>
                  )}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">FC Barcelona</div>
                    <div className="text-sm text-gray-600">{match.isHome ? "Home" : "Away"}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-400 mb-2">VS</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {match.date}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {match.time}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{match.opponent}</div>
                    <div className="text-sm text-gray-600">{match.isHome ? "Away" : "Home"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {recentResults.map((match, index) => (
            <Card key={index} className={`border-2 ${match.won ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Badge className={getCompetitionColor(match.competition)}>
                    {match.competition}
                  </Badge>
                  <Badge variant={match.won ? "default" : "destructive"}>
                    {match.won ? "Won" : "Lost"}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">FC Barcelona</div>
                    <div className="text-sm text-gray-600">{match.isHome ? "Home" : "Away"}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">{match.result}</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {match.date}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{match.opponent}</div>
                    <div className="text-sm text-gray-600">{match.isHome ? "Away" : "Home"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                La Liga Standings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Pos</th>
                      <th className="text-left p-2">Team</th>
                      <th className="text-center p-2">P</th>
                      <th className="text-center p-2">W</th>
                      <th className="text-center p-2">D</th>
                      <th className="text-center p-2">L</th>
                      <th className="text-center p-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueTable.map((team, index) => (
                      <tr key={index} className={`border-b hover:bg-gray-50 ${team.team === "FC Barcelona" ? "bg-blue-50 font-semibold" : ""}`}>
                        <td className="p-2">{team.position}</td>
                        <td className="p-2 flex items-center gap-2">
                          {team.team === "FC Barcelona" && <Trophy className="w-4 h-4 text-blue-600" />}
                          {team.team}
                        </td>
                        <td className="text-center p-2">{team.played}</td>
                        <td className="text-center p-2">{team.won}</td>
                        <td className="text-center p-2">{team.drawn}</td>
                        <td className="text-center p-2">{team.lost}</td>
                        <td className="text-center p-2 font-bold">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchFixtures;
