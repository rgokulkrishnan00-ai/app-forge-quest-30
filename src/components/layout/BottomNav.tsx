import { Home, Search, MessageSquare, FileText, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";

const navItems = [
  { icon: Home, label: "Home", path: ROUTES.HOME },
  { icon: Search, label: "Search", path: ROUTES.SEARCH },
  { icon: MessageSquare, label: "Messages", path: ROUTES.MESSAGES },
  { icon: FileText, label: "Applications", path: ROUTES.APPLICATIONS },
  { icon: User, label: "Profile", path: ROUTES.PROFILE },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
