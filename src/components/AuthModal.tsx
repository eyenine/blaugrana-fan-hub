
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Heart, Star, Shield, Users, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'onboarding'>(initialMode);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    favoritePlayer: '',
    favoriteMemory: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onClose();
      } else if (mode === 'signup') {
        await signup(formData.username, formData.email, formData.password);
        setMode('onboarding');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    onClose();
    // Show welcome toast or confetti
  };

  const benefits = [
    { icon: Users, title: 'Live Match Chat', description: 'Join 100k+ Culers during games' },
    { icon: Trophy, title: 'Fan Rewards', description: 'Earn XP and unlock exclusive badges' },
    { icon: Heart, title: 'Personalized Feed', description: 'Content tailored to your preferences' },
    { icon: Star, title: 'Exclusive Content', description: 'Behind-the-scenes and player insights' },
    { icon: Shield, title: 'Match Predictions', description: 'AI-powered insights and competitions' },
    { icon: Zap, title: 'Digital Twin Access', description: 'Virtual Camp Nou experiences' }
  ];

  if (mode === 'onboarding') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Welcome to the Blaugrana Family! 🔵🔴
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Digital Badge is Ready!</h3>
              <p className="text-gray-600">You're now part of the official BarçaVerse community</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-xl">
              <h4 className="font-semibold mb-4">🎉 Welcome Rewards Unlocked:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-500">+100 XP</Badge>
                  <span className="text-sm">Welcome Bonus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500">Level 1</Badge>
                  <span className="text-sm">Culer Novice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">Chat Access</Badge>
                  <span className="text-sm">Live Discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500">Predictions</Badge>
                  <span className="text-sm">Match Forecasts</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleOnboardingComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
            >
              Enter BarçaVerse ⚡
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Benefits */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
                Join the Blaugrana Family
              </h2>
              <p className="text-gray-600">
                Unlock the full Camp Nou experience with your digital membership
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {mode === 'login' ? 'Welcome Back, Culer!' : 'Get Your Digital Badge'}
                </h3>
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? 'Sign in to continue your Barça journey' 
                    : 'Join millions of passionate Barça fans worldwide'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Choose your Culer name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (mode === 'login' ? 'Signing In...' : 'Creating Your Badge...') 
                    : (mode === 'login' ? 'Sign In' : 'Join BarçaVerse')
                  }
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-blue-600 hover:underline"
                >
                  {mode === 'login' 
                    ? "Don't have an account? Join the family" 
                    : 'Already a member? Sign in'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
