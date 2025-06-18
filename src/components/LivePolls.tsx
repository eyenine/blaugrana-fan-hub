
import { useState } from "react";
import { BarChart3, Users, Clock, Vote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const LivePolls = () => {
  const [votes, setVotes] = useState<{[key: string]: string}>({});
  
  const activePolls = [
    {
      id: "motm",
      question: "Who should be Man of the Match so far?",
      timeLeft: "15:32",
      isLive: true,
      options: [
        { id: "lewandowski", text: "Lewandowski", votes: 1245, percentage: 42 },
        { id: "pedri", text: "Pedri", votes: 967, percentage: 33 },
        { id: "gavi", text: "Gavi", votes: 523, percentage: 18 },
        { id: "araujo", text: "Araújo", votes: 205, percentage: 7 }
      ]
    },
    {
      id: "substitution",
      question: "Which substitution should Xavi make next?",
      timeLeft: "08:15",
      isLive: true,
      options: [
        { id: "raphinha", text: "Bring on Raphinha", votes: 892, percentage: 48 },
        { id: "fermin", text: "Bring on Fermín", votes: 567, percentage: 31 },
        { id: "defensive", text: "Defensive change", votes: 234, percentage: 13 },
        { id: "no-change", text: "No changes needed", votes: 145, percentage: 8 }
      ]
    },
    {
      id: "prediction",
      question: "Final score prediction?",
      timeLeft: "Closed",
      isLive: false,
      options: [
        { id: "2-0", text: "2-0 Barça", votes: 1567, percentage: 35 },
        { id: "3-1", text: "3-1 Barça", votes: 1234, percentage: 28 },
        { id: "1-0", text: "1-0 Barça", votes: 987, percentage: 22 },
        { id: "2-1", text: "2-1 Barça", votes: 665, percentage: 15 }
      ]
    }
  ];

  const handleVote = (pollId: string, optionId: string) => {
    if (!votes[pollId]) {
      setVotes({ ...votes, [pollId]: optionId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Live Match Polls
        </h1>
        <p className="text-gray-600 text-lg">Vote on live match events with fellow Culers</p>
        
        <div className="flex justify-center items-center gap-4 mt-4">
          <Badge className="bg-green-500 text-white">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            Live Match
          </Badge>
          <div className="text-sm text-gray-600">2,847 Culers voting</div>
        </div>
      </div>

      <div className="space-y-6">
        {activePolls.map((poll) => (
          <Card key={poll.id} className={`${poll.isLive ? 'border-green-300 bg-green-50/30' : 'border-gray-200'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Vote className="w-5 h-5 text-blue-600" />
                  {poll.question}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {poll.isLive ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {poll.timeLeft}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600">
                      Closed
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {poll.options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={votes[poll.id] === option.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVote(poll.id, option.id)}
                        disabled={!poll.isLive || Boolean(votes[poll.id])}
                        className={votes[poll.id] === option.id ? "bg-blue-600" : ""}
                      >
                        {votes[poll.id] === option.id ? "✓" : "Vote"}
                      </Button>
                      <span className="font-medium">{option.text}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.votes} votes ({option.percentage}%)
                    </div>
                  </div>
                  <Progress value={option.percentage} className="h-2" />
                </div>
              ))}
              
              <div className="pt-2 border-t flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total votes: {poll.options.reduce((sum, option) => sum + option.votes, 0)}
                </div>
                {votes[poll.id] && (
                  <Badge variant="outline" className="text-green-600">
                    Your vote recorded
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Poll History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Recent Poll Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">"Best goal celebration today?"</span>
              <Badge variant="outline">Lewandowski's salute (67%)</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">"MVP of first half?"</span>
              <Badge variant="outline">Pedri (54%)</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">"Formation preference?"</span>
              <Badge variant="outline">4-3-3 (78%)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePolls;
