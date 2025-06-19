
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const VerificationBanner: React.FC = () => {
  const { user, isVerified, resendVerification } = useAuth();

  if (!user || isVerified) return null;

  return (
    <Card className="mb-6 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                🔐 Please verify your email to unlock BarçaVerse!
              </h3>
            </div>
            <p className="text-gray-700 mb-3">
              You're almost ready to join the full Blaugrana experience! Check your email for the verification link to unlock chat, predictions, and more exclusive features.
            </p>
            <div className="flex items-center gap-3">
              <Button 
                onClick={resendVerification}
                variant="outline"
                className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Resend Verification Email
              </Button>
              <span className="text-sm text-gray-600">
                Sent to: <strong>{user.email}</strong>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationBanner;
