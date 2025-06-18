
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff, Zap, Clock, Trophy, Heart, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettings {
  matchAlerts: boolean;
  goalAlerts: boolean;
  newsUpdates: boolean;
  socialMentions: boolean;
  xpRewards: boolean;
  transferNews: boolean;
}

interface Notification {
  id: string;
  type: 'match' | 'goal' | 'news' | 'social' | 'xp' | 'transfer';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const NotificationCenter = () => {
  const { user, addXP } = useAuth();
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(true);
  const [settings, setSettings] = useState<NotificationSettings>({
    matchAlerts: true,
    goalAlerts: true,
    newsUpdates: true,
    socialMentions: false,
    xpRewards: true,
    transferNews: true
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'goal',
      title: '⚽ GOOOOOL!',
      message: 'Lewandowski scores! Barça 2-1 Real Madrid (67\')',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'xp',
      title: '🏆 XP Earned!',
      message: 'You earned 50 XP for watching the live match!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'news',
      title: '📰 Breaking News',
      message: 'Gavi signs contract extension until 2030!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'match',
      title: '⏰ Match Reminder',
      message: 'El Clásico starts in 30 minutes! Get ready!',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true,
      priority: 'high'
    }
  ]);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Simulate live notifications
    const interval = setInterval(() => {
      if (isEnabled && Math.random() > 0.8) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'match',
          title: '🔥 Match Update',
          message: 'Pedri with a brilliant pass! Almost a goal!',
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        // Show browser notification
        if (Notification.permission === 'granted') {
          new Notification(newNotification.title, {
            body: newNotification.message,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          });
        }

        // Show toast
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });

        if (user) {
          addXP(3);
        }
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [isEnabled, user, addXP, toast]);

  const toggleNotifications = async () => {
    if (!isEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setIsEnabled(true);
          toast({
            title: "🔔 Notifications Enabled",
            description: "You'll now receive live updates!",
          });
        }
      }
    } else {
      setIsEnabled(false);
      toast({
        title: "🔕 Notifications Disabled",
        description: "You won't receive updates until re-enabled.",
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'match': return '🏟️';
      case 'news': return '📰';
      case 'social': return '💬';
      case 'xp': return '🏆';
      case 'transfer': return '🔄';
      default: return '🔔';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Notification Center
        </h1>
        <p className="text-gray-600 text-lg">Stay connected with every Barça moment</p>
      </div>

      {/* Notification Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isEnabled ? <Bell className="w-6 h-6 text-blue-600" /> : <BellOff className="w-6 h-6 text-gray-400" />}
              <div>
                <h3 className="text-lg font-semibold">Push Notifications</h3>
                <p className="text-sm text-gray-600">
                  {isEnabled ? 'Receiving live updates' : 'Notifications disabled'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unreadCount > 0 && (
                <Badge className="bg-red-500">{unreadCount} new</Badge>
              )}
              <Switch checked={isEnabled} onCheckedChange={toggleNotifications} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <Switch 
                    checked={value}
                    onCheckedChange={(checked) => updateSetting(key as keyof NotificationSettings, checked)}
                  />
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All as Read
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : getPriorityColor(notification.priority)
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
