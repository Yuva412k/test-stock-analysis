import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOutIcon, UserIcon, SearchIcon } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../../../../components/ui/navigation-menu';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { NotificationSystem } from '../../../../components/NotificationSystem/NotificationSystem';


export const HeaderSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const menuItems = [
    { path: '/portfolio', name: 'Portfolio' },
    { path: '/mutual-funds', name: 'Mutual Funds' },
    { path: '/fund-analysis', name: 'Fund Analysis' },
    { path: '/holdings', name: 'Holdings' },
    { path: '/transactions', name: 'Transactions' },
    { path: '/tools', name: 'Tools' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search results
    const results = [
      { name: 'Apple Inc.', symbol: 'AAPL', price: 150.25 },
      { name: 'Microsoft Corporation', symbol: 'MSFT', price: 300.50 },
      { name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3300.75 },
    ];
    setSearchResults(results);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full h-20 bg-[#1b1a1a]">
      <div className="flex items-center h-full px-12">
        {/* Logo */}
        <Link to="/" className="mr-32">
          <img
            className="w-[26px] h-[38px]"
            alt="Logo"
            src="https://c.animaapp.com/m8kgn877BAe2ZS/img/group-47952.png"
          />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="flex gap-10">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={`${
                        isActive ? 'font-semibold' : 'font-normal'
                      } ${
                        isActive ? 'text-gray-50' : 'text-gray-200'
                      } text-sm relative group`}
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute w-16 h-0.5 bg-[#0070df] rounded-[10px] bottom-[-24px] left-1/2 -translate-x-1/2" />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-8">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-[#2d2d2d] border-none text-white"
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
            >
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </Button>
          </form>
          <NotificationSystem />
          <Button variant="ghost" onClick={() => navigate('/profile')}>
            <UserIcon className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOutIcon className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};