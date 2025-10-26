import { Link } from "react-router-dom";
import { Briefcase, Building } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ROUTES } from "@/utils/constants";

const Register = () => {
  return (
    <AuthLayout>
      <div className="grid md:grid-cols-2 gap-4">
        <Link to={ROUTES.WORKER_REGISTER}>
          <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">I'm Looking for Work</CardTitle>
              <CardDescription className="text-center">
                Join as a worker and find job opportunities near you
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Browse local jobs</li>
                <li>✓ Get matched with employers</li>
                <li>✓ Build your reputation</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link to={ROUTES.EMPLOYER_REGISTER}>
          <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mx-auto mb-4">
                <Building className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-center">I'm Hiring</CardTitle>
              <CardDescription className="text-center">
                Join as an employer and find local workers for your projects
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Post job listings</li>
                <li>✓ Find qualified workers</li>
                <li>✓ Manage applications</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
