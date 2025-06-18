
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Heart, Lock, Star } from 'lucide-react';
import AuthModal from './AuthModal';

const GuestBanner: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const lockedFeatures = [
    { icon: Users, name: 'Live Chat', description: 'Chat with fans during matches' },
    { icon: Heart, name: 'Fan Forum', description: 'Join discussions and debates' },
    { icon: Star, name: 'Match Predictions', description: 'Predict scores and win XP' },
    { icon: Trophy, name: 'XP & Badges', description: 'Earn rewards for activity' }
  ];

  return (
    <>
      <Card className="mb-8 border-2 border-gradient-to-r from-blue-600 to-red-600 bg-gradient-to-r from-blue-50 via-white to-red-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Welcome to BarçaVerse
                  </h2>
                  <p className="text-gray-600">You're browsing as a guest</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Join our passionate community of Culers to unlock exclusive features, 
                connect with fellow fans, and earn your digital Blaugrana badge!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {lockedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <feature.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-3"
              >
                🎫 Get Your Digital Badge
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Join 400M+ Culers worldwide
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />
    </>
  );
};

export default GuestBanner;
