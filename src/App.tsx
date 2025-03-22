import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Portfolio } from './screens/Portfolio/Portfolio';
import { MutualFunds } from './screens/MutualFunds/MutualFunds';
import { FundAnalysis } from './screens/FundAnalysis/FundAnalysis';
import { Holdings } from './screens/Holdings/Holdings';
import { Transactions } from './screens/Transactions/Transactions';
import { Tools } from './screens/Tools/Tools';
import { Login } from './screens/Login/Login';
import { UserProfile } from './screens/UserProfile/UserProfile';
import { Layout } from './components/Layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/portfolio" replace />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="mutual-funds" element={<MutualFunds />} />
            <Route path="fund-analysis" element={<FundAnalysis />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="tools" element={<Tools />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
