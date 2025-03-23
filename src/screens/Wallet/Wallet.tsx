import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { fetchWalletBalance, fetchTransactions, addFunds } from '../../utils/api';

export const Wallet: React.FC = () => {
  const [amount, setAmount] = useState('');

  const { data: balance } = useQuery('walletBalance', fetchWalletBalance);
  const { data: transactions } = useQuery('transactions', fetchTransactions);

  const handleAddFunds = async () => {
    try {
      await addFunds(parseFloat(amount));
      // Refetch balance and transactions
      // In a real app, you'd use React Query's mutation and invalidation
    } catch (error) {
      console.error('Failed to add funds:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#1b1a1a] text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
          <p className="text-3xl font-semibold">₹{balance?.toFixed(2) || '0.00'}</p>
        </CardContent>
      </Card>

      <Card className="bg-[#1b1a1a] text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Funds</h2>
          <div className="flex space-x-4">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-[#2a2a2a] text-white border-gray-600"
            />
            <Button onClick={handleAddFunds} className="bg-blue-600 hover:bg-blue-700">
              Add Funds
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1b1a1a] text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <ul className="space-y-2">
            {transactions?.map((transaction, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{transaction.type}</span>
                <span className={transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                  ₹{transaction.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
