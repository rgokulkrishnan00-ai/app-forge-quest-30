import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Edit, Star, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading";
import { ROUTES } from "@/utils/constants";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="container px-4 py-6 max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url || ""} alt="User" />
              <AvatarFallback className="text-2xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile?.full_name || 'User'}</h2>
              <Badge variant="secondary" className="mt-1">
                {profile?.user_type === 'worker' ? (
                  <><Briefcase className="h-3 w-3 mr-1" /> Worker</>
                ) : (
                  <><Briefcase className="h-3 w-3 mr-1" /> Employer</>
                )}
              </Badge>
            </div>
          </div>
          <Button size="sm" asChild>
            <Link to="/profile/edit">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            {profile?.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
          </div>

          {profile?.bio && (
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">
                  {profile?.user_type === 'worker' ? 'Jobs' : 'Hires'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Reviews</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
