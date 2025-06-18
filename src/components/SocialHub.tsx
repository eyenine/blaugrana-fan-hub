
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share, ExternalLink, Twitter, Instagram, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'threads';
  author: string;
  handle: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  verified: boolean;
}

const SocialHub = () => {
  const { user, addXP } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  
  const socialPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'twitter',
      author: 'FC Barcelona',
      handle: '@FCBarcelona',
      content: '⚽ GOOOOOL! Lewandowski with a magnificent header! What a cross from Pedri! 🔥\n\n#ElClásico #ForçaBarça',
      likes: 15247,
      comments: 892,
      shares: 4521,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      verified: true
    },
    {
      id: '2',
      platform: 'instagram',
      author: 'Lamine Yamal',
      handle: '@lamineyamal',
      content: 'Ready for El Clásico! 💪 Visca el Barça! 🔴🔵',
      image: '/placeholder.svg',
      likes: 234567,
      comments: 12453,
      shares: 8934,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      verified: true
    },
    {
      id: '3',
      platform: 'threads',
      author: 'Culer Mundial',
      handle: '@culermundial',
      content: 'The atmosphere at Camp Nou tonight is ELECTRIC! ⚡️ You can feel the energy through the screen. This is what football is about! 🏟️',
      likes: 1547,
      comments: 234,
      shares: 89,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      verified: false
    },
    {
      id: '4',
      platform: 'twitter',
      author: 'Pedri González',
      handle: '@Pedri',
      content: 'What a night! The fans were incredible 🙌 Already thinking about the next match! 💙❤️',
      likes: 89234,
      comments: 5672,
      shares: 12890,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      verified: true
    }
  ];

  const trendingHashtags = [
    '#ElClásico', '#ForçaBarça', '#Lewandowski', '#Pedri', '#CampNou', 
    '#ViscaElBarça', '#Culers', '#FCBarcelona', '#LaLiga', '#ChampionsLeague'
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'threads': return <MessageCircle className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500';
      case 'instagram': return 'bg-pink-500';
      case 'threads': return 'bg-gray-800';
      default: return 'bg-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const interactWithPost = (action: string) => {
    if (user) {
      addXP(3);
    }
  };

  const filteredPosts = selectedPlatform === 'all' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === selectedPlatform);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Social Hub
        </h1>
        <p className="text-gray-600 text-lg">Connect with the global Barça community</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Social Feed
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="connect" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Connect Accounts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Platform Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPlatform('all')}
                >
                  All Platforms
                </Button>
                <Button 
                  variant={selectedPlatform === 'twitter' ? 'default' : 'outline'}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setSelectedPlatform('twitter')}
                >
                  <Twitter className="w-4 h-4" />
                  Twitter/X
                </Button>
                <Button 
                  variant={selectedPlatform === 'instagram' ? 'default' : 'outline'}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setSelectedPlatform('instagram')}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Button>
                <Button 
                  variant={selectedPlatform === 'threads' ? 'default' : 'outline'}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setSelectedPlatform('threads')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Threads
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full ${getPlatformColor(post.platform)} flex items-center justify-center text-white`}>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author}</span>
                            {post.verified && <span className="text-blue-500">✓</span>}
                            <span className="text-gray-500 text-sm">{post.handle}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {post.timestamp.toLocaleTimeString()} · {post.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-800 mb-3 whitespace-pre-line">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="rounded-lg max-w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 text-gray-500">
                        <button 
                          className="flex items-center gap-2 hover:text-red-500 transition-colors"
                          onClick={() => interactWithPost('like')}
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.likes)}</span>
                        </button>
                        <button 
                          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                          onClick={() => interactWithPost('comment')}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.comments)}</span>
                        </button>
                        <button 
                          className="flex items-center gap-2 hover:text-green-500 transition-colors"
                          onClick={() => interactWithPost('share')}
                        >
                          <Share className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.shares)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((hashtag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fan Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Posts mentioning Barça</span>
                  <Badge className="bg-blue-600">45.2K today</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Global engagement</span>
                  <Badge className="bg-red-600">2.1M interactions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Trending sentiment</span>
                  <Badge className="bg-green-600">98% Positive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="connect">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Twitter className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Connect Twitter/X</h3>
                <p className="text-gray-600 mb-4">Follow Barça updates and join conversations</p>
                <Button className="w-full">Connect Account</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Instagram className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <h3 className="text-lg font-semibold mb-2">Connect Instagram</h3>
                <p className="text-gray-600 mb-4">Share your Barça moments and stories</p>
                <Button className="w-full">Connect Account</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-800" />
                <h3 className="text-lg font-semibold mb-2">Connect Threads</h3>
                <p className="text-gray-600 mb-4">Engage in deeper Barça discussions</p>
                <Button className="w-full">Connect Account</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialHub;
