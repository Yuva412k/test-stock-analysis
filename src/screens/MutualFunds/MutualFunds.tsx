import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Star, StarOff, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchMutualFunds, toggleWatchlist } from '../../utils/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from '../../components/Loader/Loader';

interface MutualFund {
  id: number;
  name: string;
  nav: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  investedAmount: number;
  isWatchlisted: boolean;
  expenseRatio: number;
  fundManager: string;
  riskLevel: string;
  historicalPerformance: { date: string; value: number }[];
}

export const MutualFunds: React.FC = () => {
  const { data: funds, isLoading, refetch } = useQuery<MutualFund[]>('mutualFunds', fetchMutualFunds);
  const [expandedFund, setExpandedFund] = useState<number | null>(null);

  const handleToggleWatchlist = async (fundId: number) => {
    await toggleWatchlist(fundId);
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mutual Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>NAV</TableHead>
              <TableHead>1Y Return</TableHead>
              <TableHead>3Y Return</TableHead>
              <TableHead>5Y Return</TableHead>
              <TableHead>Invested Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funds?.map(fund => (
              <React.Fragment key={fund.id}>
                <TableRow className="cursor-pointer" onClick={() => setExpandedFund(expandedFund === fund.id ? null : fund.id)}>
                  <TableCell>{fund.name}</TableCell>
                  <TableCell>₹{fund.nav.toFixed(2)}</TableCell>
                  <TableCell className={fund.oneYearReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {fund.oneYearReturn.toFixed(2)}%
                  </TableCell>
                  <TableCell className={fund.threeYearReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {fund.threeYearReturn.toFixed(2)}%
                  </TableCell>
                  <TableCell className={fund.fiveYearReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {fund.fiveYearReturn.toFixed(2)}%
                  </TableCell>
                  <TableCell>₹{fund.investedAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWatchlist(fund.id);
                      }}
                    >
                      {fund.isWatchlisted ? <Star className="text-yellow-500" /> : <StarOff />}
                    </Button>
                    {expandedFund === fund.id ? <ChevronUp /> : <ChevronDown />}
                  </TableCell>
                </TableRow>
                <AnimatePresence>
                  {expandedFund === fund.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell colSpan={7}>
                        <div className="p-4 bg-[#2a2a2a]">
                          <h3 className="text-xl font-semibold mb-4">{fund.name} - Detailed Information</h3>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p><strong>Fund Manager:</strong> {fund.fundManager}</p>
                              <p><strong>Expense Ratio:</strong> {fund.expenseRatio}%</p>
                              <p><strong>Risk Level:</strong> {fund.riskLevel}</p>
                            </div>
                            <div>
                              <p><strong>1Y Return:</strong> {fund.oneYearReturn.toFixed(2)}%</p>
                              <p><strong>3Y Return:</strong> {fund.threeYearReturn.toFixed(2)}%</p>
                              <p><strong>5Y Return:</strong> {fund.fiveYearReturn.toFixed(2)}%</p>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold mb-2">Historical Performance</h4>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={fund.historicalPerformance}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="value" stroke="#8884d8" name="NAV" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </TableCell>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
