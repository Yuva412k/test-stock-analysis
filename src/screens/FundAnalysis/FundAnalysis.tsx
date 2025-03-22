import React, { useState, useEffect } from 'react';
import { fetchMockData } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FundData {
  id: string;
  name: string;
  data: {
    date: string;
    value: number;
  }[];
}

export const FundAnalysis: React.FC = () => {
  const [funds, setFunds] = useState<FundData[]>([]);
  const [selectedFund, setSelectedFund] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMockData('fundAnalysis');
      setFunds(data);
      if (data.length > 0) {
        setSelectedFund(data[0].id);
      }
    };
    fetchData();
  }, []);

  const selectedFundData = funds.find(fund => fund.id === selectedFund);

  const chartData = {
    labels: selectedFundData?.data.map(item => item.date) || [],
    datasets: [
      {
        label: selectedFundData?.name || '',
        data: selectedFundData?.data.map(item => item.value) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Fund Performance Over Time',
      },
    },
  };

  return (
    <Card className="w-full bg-[#1b1a1a] rounded-[11px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dove-gray50">Fund Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedFund} onValueChange={setSelectedFund}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a fund" />
          </SelectTrigger>
          <SelectContent>
            {funds.map(fund => (
              <SelectItem key={fund.id} value={fund.id}>{fund.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="h-[400px]">
          <Line options={chartOptions} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};
