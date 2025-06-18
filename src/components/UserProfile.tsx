
import { useState } from "react";
import { User, Star, Trophy, Heart, Calendar, MapPin, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "CulerForLife2010",
    email: "fan@barcaverse.com",
    joinDate: "2010-05-28",
    location: "Barcelona, Spain",
    favoritePlayer: "Pedri",
    bio: "Lifelong Barça fan. Been to Camp Nou 47 times. Visca el Barça! 💙❤️",
    matchesAttended: 47,
    postsCreated: 234,
    likesReceived: 1456
  });

  const badges = [
    { name: "Veteran Culer", icon: Trophy, description: "Fan since 2010", color: "bg-yellow-500" },
    { name: "Camp Nou Regular", icon: MapPin, description: "50+ matches attended", color: "bg-blue-500" },
    { name: "Community Star", icon: Star, description: "1000+ likes received", color: "bg-purple-500" },
    { name: "Chat Master", icon: Heart, description: "Active in fan chat", color: "bg-red-500" }
  ];

  const stats = [
    { label: "Matches Attended", value: profile.matchesAttended, icon: Calendar },
    { label: "Posts Created", value: profile.postsCreated, icon: Edit2 },
    { label: "Likes Received", value: profile.likesReceived, icon: Heart },
    { label: "Years as Culer", value: new Date().getFullYear() - 2010, icon: Trophy }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Fan Profile
        </h1>
        <p className="text-gray-600 text-lg">Your Barça journey and achievements</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-gradient-to-r from-blue-600 to-red-600">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-red-600 text-white">
                  CF
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="ml-auto"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  Culer since {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Location" defaultValue={profile.location} />
                    <Input placeholder="Favorite Player" defaultValue={profile.favoritePlayer} />
                  </div>
                  <Textarea placeholder="Bio" defaultValue={profile.bio} rows={3} />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Favorite Player: {profile.favoritePlayer}</span>
                  </div>
                  <p className="text-gray-700 mt-4">{profile.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Fan Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Fan Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
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

export default UserProfile;
