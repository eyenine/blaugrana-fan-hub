
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, Target, Users, Heart, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MatchEvent {
  time: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'corner' | 'shot';
  player: string;
  description: string;
}

interface LiveStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
}

const LiveMatchData = () => {
  const { user, addXP } = useAuth();
  const [isLive, setIsLive] = useState(true);
  const [matchTime, setMatchTime] = useState(67);
  const [score, setScore] = useState({ home: 2, away: 1 });
  const [events, setEvents] = useState<MatchEvent[]>([
    { time: "65'", type: 'goal', player: 'Lewandowski', description: 'Goal! Beautiful header from a Pedri cross' },
    { time: "52'", type: 'yellow_card', player: 'Gavi', description: 'Yellow card for tactical foul' },
    { time: "34'", type: 'goal', player: 'Yamal', description: 'GOLAZO! Spectacular long-range strike!' },
    { time: "12'", type: 'goal', player: 'Benzema', description: 'Real Madrid equalizes from the penalty spot' }
  ]);
  
  const [liveStats, setLiveStats] = useState<LiveStats>({
    possession: { home: 63, away: 37 },
    shots: { home: 8, away: 4 },
    corners: { home: 5, away: 2 },
    fouls: { home: 7, away: 11 }
  });

  const [fanReactions, setFanReactions] = useState({
    fire: 1247,
    heart: 892,
    celebration: 2156,
    shock: 445
  });

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setMatchTime(prev => prev + 1);
      
      // Simulate random events
      if (Math.random() > 0.95) {
        const newEvent: MatchEvent = {
          time: `${matchTime + 1}'`,
          type: 'shot',
          player: 'Pedri',
          description: 'Shot blocked by defender'
        };
        setEvents(prev => [newEvent, ...prev]);
        
        if (user) {
          addXP(5); // Reward for watching live
        }
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isLive, matchTime, user, addXP]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow_card': return '🟨';
      case 'red_card': return '🟥';
      case 'substitution': return '🔄';
      case 'corner': return '🚩';
      default: return '⚽';
    }
  };

  const addReaction = (type: string) => {
    setFanReactions(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1
    }));
    
    if (user) {
      addXP(2); // Small XP for engagement
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Live Match Center
        </h1>
        {isLive && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-semibold">LIVE</span>
          </div>
        )}
      </div>

      {/* Live Score */}
      <Card className="border-2 border-red-500 bg-gradient-to-r from-blue-50 to-red-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 items-center text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">FC Barcelona</div>
              <div className="text-4xl font-bold">{score.home}</div>
            </div>
            <div>
              <div className="text-lg text-gray-600 mb-2">{matchTime}'</div>
              <div className="text-6xl font-bold text-gray-400">-</div>
              <Badge className="mt-2 bg-red-600">El Clásico</Badge>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">Real Madrid</div>
              <div className="text-4xl font-bold">{score.away}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Live Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{event.time}</Badge>
                    <span className="font-semibold">{event.player}</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Match Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Possession</span>
                <span className="text-sm font-bold">{liveStats.possession.home}% - {liveStats.possession.away}%</span>
              </div>
              <Progress value={liveStats.possession.home} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{liveStats.shots.home}</div>
                <div className="text-sm text-gray-600">Shots</div>
              </div>
              <div>
                <Target className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                <div className="text-xs text-gray-500">vs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{liveStats.shots.away}</div>
                <div className="text-sm text-gray-600">Shots</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{liveStats.corners.home}</div>
                <div className="text-sm text-gray-600">Corners</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{liveStats.corners.away}</div>
                <div className="text-sm text-gray-600">Corners</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fan Reactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Global Fan Reactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => addReaction('fire')}
            >
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-bold">{fanReactions.fire}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => addReaction('heart')}
            >
              <span className="text-2xl">❤️</span>
              <span className="text-sm font-bold">{fanReactions.heart}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => addReaction('celebration')}
            >
              <span className="text-2xl">🎉</span>
              <span className="text-sm font-bold">{fanReactions.celebration}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => addReaction('shock')}
            >
              <span className="text-2xl">😱</span>
              <span className="text-sm font-bold">{fanReactions.shock}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveMatchData;
