
import React, { useState } from 'react';
import { Lock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface ProtectedFeatureProps {
  children: React.ReactNode;
  featureName: string;
  description?: string;
  className?: string;
}

const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({ 
  children, 
  featureName, 
  description,
  className = ""
}) => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isAuthenticated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <Card className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-red-100/50 backdrop-blur-sm z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center p-6 bg-white/90 rounded-xl border border-blue-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{featureName}</h3>
            <p className="text-gray-600 mb-4">
              {description || `Sign in to unlock ${featureName.toLowerCase()}`}
            </p>
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Get Access
            </Button>
          </div>
        </div>
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
      </Card>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};

export default ProtectedFeature;
