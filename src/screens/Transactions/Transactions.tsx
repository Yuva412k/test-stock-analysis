import React, { useState, useEffect } from 'react';
import { fetchMockData } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  stockName: string;
  quantity: number;
  price: number;
  total: number;
}

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMockData('transactions');
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <Card className="w-full bg-[#1b1a1a] rounded-[11px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dove-gray50">Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className={transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                  {transaction.type.toUpperCase()}
                </TableCell>
                <TableCell className="font-medium">{transaction.stockName}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>₹{transaction.price.toFixed(2)}</TableCell>
                <TableCell>₹{transaction.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
