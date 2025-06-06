import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, Music, User, Settings } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

// Define navigation items
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library/playlists', label: 'Your Library', icon: Library },
  // Add more navigation items as needed
];

// Placeholder for Doraemon theme logo or app name
const AppLogo: React.FC = () => (
  <div className="p-4 mb-4 text-center">
    <Link to="/" className="text-2xl font-bold text-white"> {/* text-white for dark sidebar bg */}
      MusicApp {/* Replace with actual logo/name, styled with Doraemon theme */}
    </Link>
  </div>
);

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className="w-60 h-screen bg-neutral-900 text-white flex flex-col fixed top-0 left-0 z-40"> {/* Example dark theme */}
      <AppLogo />
      <nav className="flex-grow px-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              "hover:bg-neutral-700 hover:text-white", // Doraemon theme: use themed hover color
              location.pathname === item.href ? "bg-neutral-800 text-white" : "text-neutral-400" // Doraemon theme: use themed active color
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      {/* Example: User profile / Settings link at the bottom */}
      <div className="p-2 border-t border-neutral-700">
        <Link
            to="/profile" // Placeholder
            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-neutral-400 hover:bg-neutral-700 hover:text-white"
        >
            <User className="mr-3 h-5 w-5" />
            Profile
        </Link>
         <Link
            to="/settings" // Placeholder
            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-neutral-400 hover:bg-neutral-700 hover:text-white"
        >
            <Settings className="mr-3 h-5 w-5" />
            Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;