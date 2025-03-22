import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOutIcon, UserIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { NotificationSystem } from '../NotificationSystem/NotificationSystem';

export const Layout: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would fetch search results from the API
    // For now, we'll use mock data
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
    <div className="min-h-screen bg-[#171616]">
      <header className="bg-[#1b1a1a] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/portfolio" className={`text-white ${location.pathname === '/portfolio' ? 'font-bold' : ''}`}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/mutual-funds" className={`text-white ${location.pathname === '/mutual-funds' ? 'font-bold' : ''}`}>
                    Mutual Funds
                  </Link>
                </li>
                <li>
                  <Link to="/fund-analysis" className={`text-white ${location.pathname === '/fund-analysis' ? 'font-bold' : ''}`}>
                    Fund Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/holdings" className={`text-white ${location.pathname === '/holdings' ? 'font-bold' : ''}`}>
                    Holdings
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className={`text-white ${location.pathname === '/transactions' ? 'font-bold' : ''}`}>
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className={`text-white ${location.pathname === '/tools' ? 'font-bold' : ''}`}>
                    Tools
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                <SearchIcon className="h-4 w-4" />
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
      <main className="container mx-auto py-8">
        {searchResults.length > 0 && (
          <Card className="mb-8">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{result.name}</span> ({result.symbol}) - ${result.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        <Outlet />
      </main>
    </div>
  );
};
