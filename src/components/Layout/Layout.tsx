import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { HeaderSection } from '../../screens/Portfolio/sections/HeaderSection/HeaderSection';



export const Layout: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-[#171616]">
      <HeaderSection />
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