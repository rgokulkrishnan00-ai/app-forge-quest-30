import { Link } from "react-router-dom";
import { Briefcase, Users, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/utils/constants";

const features = [
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description: "Find jobs within 100km of your location",
  },
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Smart job recommendations based on your skills",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "Chat directly with employers or workers",
  },
];

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="text-center mb-12 animate-in fade-in duration-500">
          <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Labora
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect workers with opportunities through intelligent job matching
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-500">
          <Button size="lg" className="flex-1" asChild>
            <Link to={ROUTES.REGISTER}>Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" className="flex-1" asChild>
            <Link to={ROUTES.LOGIN}>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
