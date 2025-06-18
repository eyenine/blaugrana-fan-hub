
import { useState } from "react";
import { Brain, TrendingUp, Target, Users, Clock, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MatchPredictions = () => {
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  
  const upcomingMatch = {
    opponent: "Real Madrid",
    date: "2024-10-26",
    time: "21:00",
    venue: "Camp Nou",
    competition: "El Clásico"
  };

  const aiPrediction = {
    winProbability: 68,
    scorePrediction: "2-1",
    confidence: 85,
    keyFactors: [
      "Home advantage at Camp Nou",
      "Lewandowski's recent form (5 goals in last 3 games)",
      "Head-to-head record favors Barça at home",
      "Pedri's return from injury"
    ]
  };

  const fanPredictions = [
    { score: "2-1", percentage: 35, votes: 1420 },
    { score: "3-0", percentage: 22, votes: 890 },
    { score: "1-0", percentage: 18, votes: 730 },
    { score: "2-0", percentage: 15, votes: 610 },
    { score: "1-1", percentage: 10, votes: 405 }
  ];

  const predictionOptions = [
    { id: "win", label: "Barça Win", color: "bg-green-500" },
    { id: "draw", label: "Draw", color: "bg-yellow-500" },
    { id: "loss", label: "Real Win", color: "bg-red-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Match Predictions
        </h1>
        <p className="text-gray-600 text-lg">AI insights and fan predictions for upcoming matches</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Prediction */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              AI Match Analysis
            </CardTitle>
            <div className="text-sm text-gray-600">
              {upcomingMatch.opponent} vs FC Barcelona • {upcomingMatch.date}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{aiPrediction.scorePrediction}</div>
              <div className="text-lg text-blue-600 font-semibold">Predicted Score</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Barça Win Probability</span>
                  <span className="text-sm font-bold text-blue-600">{aiPrediction.winProbability}%</span>
                </div>
                <Progress value={aiPrediction.winProbability} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">AI Confidence</span>
                  <span className="text-sm font-bold text-green-600">{aiPrediction.confidence}%</span>
                </div>
                <Progress value={aiPrediction.confidence} className="h-3" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Factors
              </h4>
              <ul className="space-y-2">
                {aiPrediction.keyFactors.map((factor, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Fan Predictions */}
        <Card className="border-2 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-red-600" />
              Fan Predictions
            </CardTitle>
            <div className="text-sm text-gray-600">
              What the Culer community thinks
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Prediction */}
            <div>
              <h4 className="font-semibold mb-3">Make Your Prediction</h4>
              <div className="grid grid-cols-3 gap-2">
                {predictionOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={userPrediction === option.id ? "default" : "outline"}
                    className={`${userPrediction === option.id ? option.color : ""} text-sm`}
                    onClick={() => setUserPrediction(option.id)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Predictions */}
            <div>
              <h4 className="font-semibold mb-3">Popular Score Predictions</h4>
              <div className="space-y-3">
                {fanPredictions.map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {prediction.score}
                      </Badge>
                      <div className="flex-1">
                        <Progress value={prediction.percentage} className="h-2 w-20" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {prediction.percentage}% ({prediction.votes} votes)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <div className="text-2xl font-bold text-red-600">4,055</div>
              <div className="text-sm text-gray-600">Total Predictions</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchPredictions;
