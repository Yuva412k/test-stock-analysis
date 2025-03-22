import React, { useState, useEffect } from 'react';
import { fetchMockData } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface MutualFund {
  id: string;
  name: string;
  category: string;
  nav: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
}

export const MutualFunds: React.FC = () => {
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMockData('mutualFunds');
      setMutualFunds(data);
    };
    fetchData();
  }, []);

  return (
    <Card className="w-full bg-[#1b1a1a] rounded-[11px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dove-gray50">Mutual Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>NAV</TableHead>
              <TableHead>1Y Return</TableHead>
              <TableHead>3Y Return</TableHead>
              <TableHead>5Y Return</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mutualFunds.map((fund) => (
              <TableRow key={fund.id}>
                <TableCell className="font-medium">{fund.name}</TableCell>
                <TableCell>{fund.category}</TableCell>
                <TableCell>₹{fund.nav.toFixed(2)}</TableCell>
                <TableCell>{fund.oneYearReturn.toFixed(2)}%</TableCell>
                <TableCell>{fund.threeYearReturn.toFixed(2)}%</TableCell>
                <TableCell>{fund.fiveYearReturn.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
