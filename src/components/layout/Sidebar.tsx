import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library/playlists', label: 'Your Library', icon: Library },
];

const AppLogo: React.FC = () => (
  <div className="p-4 mb-4 text-center">
    <Link to="/" className="text-2xl font-bold text-sidebar-primary">
      MusicApp
    </Link>
  </div>
);

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className="w-60 h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed top-0 left-0 z-40">
      <AppLogo />
      <nav className="flex-grow px-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground",
              location.pathname === item.href 
                ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                : "text-sidebar-foreground opacity-70"
            )}
          >\
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t border-sidebar-border">
        <Link
            to="/profile"
            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground opacity-70 hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground"
        >
            <User className="mr-3 h-5 w-5" />
            Profile
        </Link>
         <Link
            to="/settings"
            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground opacity-70 hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground"
        >
            <Settings className="mr-3 h-5 w-5" />
            Settings
        </Link>
      </div>
    </aside>
  );
};\n\nexport default Sidebar;