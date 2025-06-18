
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Clock, Trophy, Heart, Zap, Calendar, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FanInsights = () => {
  const { user } = useAuth();

  const predictionStats = [
    { month: 'Jan', correct: 8, total: 12 },
    { month: 'Feb', correct: 10, total: 14 },
    { month: 'Mar', correct: 12, total: 15 },
    { month: 'Apr', correct: 9, total: 13 },
    { month: 'May', correct: 11, total: 12 },
    { month: 'Jun', correct: 7, total: 8 }
  ];

  const activityData = [
    { name: 'Match Watching', value: 35, color: '#3B82F6' },
    { name: 'Forum Posts', value: 25, color: '#EF4444' },
    { name: 'Predictions', value: 20, color: '#F59E0B' },
    { name: 'Live Chat', value: 15, color: '#10B981' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const xpProgress = [
    { week: 'W1', xp: 120 },
    { week: 'W2', xp: 180 },
    { week: 'W3', xp: 250 },
    { week: 'W4', xp: 320 }
  ];

  const achievements = [
    {
      id: 'predictor',
      name: 'Master Predictor',
      description: 'Correctly predicted 10 matches in a row',
      icon: '🔮',
      earned: true,
      rarity: 'legendary'
    },
    {
      id: 'loyal',
      name: 'Loyal Culer',
      description: 'Active for 100 consecutive days',
      icon: '❤️',
      earned: true,
      rarity: 'epic'
    },
    {
      id: 'social',
      name: 'Social Butterfly',
      description: 'Made 50 forum posts',
      icon: '🦋',
      earned: false,
      rarity: 'rare'
    },
    {
      id: 'clasico',
      name: 'Clásico Expert',
      description: 'Correctly predicted 5 El Clásico matches',
      icon: '⚔️',
      earned: true,
      rarity: 'epic'
    }
  ];

  const fanLevel = user?.fan_level || 1;
  const currentXP = user?.xp || 0;
  const nextLevelXP = fanLevel * 500;
  const progressToNext = ((currentXP % 500) / 500) * 100;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-600';
      case 'epic': return 'bg-blue-600';
      case 'rare': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const totalPredictions = predictionStats.reduce((sum, stat) => sum + stat.total, 0);
  const correctPredictions = predictionStats.reduce((sum, stat) => sum + stat.correct, 0);
  const accuracy = Math.round((correctPredictions / totalPredictions) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Fan Insights
        </h1>
        <p className="text-gray-600 text-lg">Your Barça journey in numbers</p>
      </div>

      {user && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-red-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold">Level {fanLevel}</div>
                <div className="text-sm text-gray-600">Fan Level</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold">{currentXP}</div>
                <div className="text-sm text-gray-600">Total XP</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold">{accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Progress to Level {fanLevel + 1}</span>
                <span className="text-sm text-gray-600">{currentXP % 500}/{nextLevelXP % 500} XP</span>
              </div>
              <Progress value={progressToNext} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={predictionStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="correct" fill="#3B82F6" name="Correct" />
                    <Bar dataKey="total" fill="#E5E7EB" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">{correctPredictions}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">{totalPredictions - correctPredictions}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>El Clásico</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Champions League</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>La Liga</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly XP Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={xpProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="xp" stroke="#F59E0B" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`border-2 ${achievement.earned ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <Badge className={`${getRarityColor(achievement.rarity)} text-white capitalize`}>
                    {achievement.rarity}
                  </Badge>
                  {achievement.earned && (
                    <div className="mt-2">
                      <Badge className="bg-green-600 text-white">✓ Earned</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Your Barça Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Joined BarçaVerse</div>
                    <div className="text-sm text-gray-600">October 15, 2024</div>
                    <div className="text-sm text-gray-700 mt-1">Welcome to the Culer family! 🎉</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">First Prediction</div>
                    <div className="text-sm text-gray-600">October 16, 2024</div>
                    <div className="text-sm text-gray-700 mt-1">Correctly predicted Barça 3-1 Sevilla ⚽</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Reached Level 5</div>
                    <div className="text-sm text-gray-600">October 20, 2024</div>
                    <div className="text-sm text-gray-700 mt-1">Earned 2,450 XP through active participation 🏆</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FanInsights;
