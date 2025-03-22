import React, { useState, useEffect } from 'react';
import { fetchMockData } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Holding {
  id: string;
  stockName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
}

export const Holdings: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMockData('holdings');
      setHoldings(data);
    };
    fetchData();
  }, []);

  return (
    <Card className="w-full bg-[#1b1a1a] rounded-[11px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dove-gray50">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Avg. Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Profit/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding) => (
              <TableRow key={holding.id}>
                <TableCell className="font-medium">{holding.stockName}</TableCell>
                <TableCell>{holding.quantity}</TableCell>
                <TableCell>₹{holding.averagePrice.toFixed(2)}</TableCell>
                <TableCell>₹{holding.currentPrice.toFixed(2)}</TableCell>
                <TableCell>₹{holding.totalValue.toFixed(2)}</TableCell>
                <TableCell className={holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}>
                  ₹{holding.profitLoss.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
