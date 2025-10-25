import { MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  distance: string;
  payRate: string;
  category: string;
  description: string;
  onApply?: () => void;
}

export const JobCard = ({
  title,
  company,
  location,
  distance,
  payRate,
  category,
  description,
  onApply,
}: JobCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location} • {distance}</span>
          </div>
          <div className="flex items-center gap-1 text-accent font-medium">
            <DollarSign className="h-4 w-4" />
            <span>{payRate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onApply} className="w-full">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};
