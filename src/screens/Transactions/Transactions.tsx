import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Card, CardContent } from '../../components/ui/card';
import { Table } from '../../components/ui/table';
import { Select } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { DateRangePicker } from '../../components/ui/date-range-picker';
import { fetchTransactions, Transaction } from '../../utils/api';
import { Loader } from '../../components/Loader/Loader';

export const Transactions: React.FC = () => {
  const { data: transactions, isLoading } = useQuery<Transaction[]>('transactions', fetchTransactions);
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [dateRange, setDateRange] = useState<{ from?: Date ; to?: Date }>({ from: undefined, to: undefined });
  const [search, setSearch] = useState<string>('');

  const filteredTransactions = transactions?.filter(transaction => 
    (filterType === 'all' || transaction.type === filterType) &&
    (dateRange.from ? new Date(transaction.date) >= dateRange.from : true) &&
    (dateRange.to ? new Date(transaction.date) <= dateRange.to : true) &&
    transaction.stock.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    <>
      <Loader />
      {/* Add an empty container to maintain layout structure */}
      <div className="relative w-full max-w-[1442px] bg-[#171616] rounded-[30px] overflow-hidden min-h-screen" />
    </>;
  }

  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <div className="flex justify-between mb-4">
          <Select
            value={filterType}
            onValueChange={(value: 'all' | 'buy' | 'sell') => setFilterType(value)}
            className="w-32"
          >
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </Select>
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onSelect={setDateRange}
          />
          <Input
            placeholder="Search stocks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 bg-[#2a2a2a] text-white border-gray-600"
          />
        </div>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Fees</th>
              <th>Taxes</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions?.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td className={transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                  {transaction.type.toUpperCase()}
                </td>
                <td>{transaction.stock}</td>
                <td>{transaction.quantity}</td>
                <td>₹{transaction.price.toFixed(2)}</td>
                <td>₹{transaction.total.toFixed(2)}</td>
                <td>₹{transaction.fees.toFixed(2)}</td>
                <td>₹{transaction.taxes.toFixed(2)}</td>
                <td>₹{transaction.netAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
};
