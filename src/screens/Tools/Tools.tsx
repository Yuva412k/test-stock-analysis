import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SIPCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ year: number; value: number }[]>([]);

  const calculateSIP = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const t = parseFloat(time) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers');
      return;
    }

    const amount = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    setResult(amount);

    const newChartData = [];
    for (let i = 1; i <= parseFloat(time); i++) {
      const yearlyAmount = P * ((Math.pow(1 + r, i * 12) - 1) / r) * (1 + r);
      newChartData.push({ year: i, value: yearlyAmount });
    }
    setChartData(newChartData);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Input
          placeholder="Monthly Investment (₹)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="bg-[#2a2a2a] text-white border-gray-600"
        />
        <Input
          placeholder="Expected Return Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="bg-[#2a2a2a] text-white border-gray-600"
        />
        <Input
          placeholder="Time Period (Years)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-[#2a2a2a] text-white border-gray-600"
        />
      </div>
      <Button onClick={calculateSIP} className="w-full mb-4">Calculate</Button>
      {result !== null && (
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Total Value: ₹{result.toFixed(2)}</p>
        </div>
      )}
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="SIP Value" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const LumpSumCalculator: React.FC = () => {
  // Similar implementation to SIP Calculator, but for lump sum investments
  // ...
  return <></>
};

const PortfolioSimulator: React.FC = () => {
  // Implementation for portfolio simulation
  // ...
  return <></>
};

export const Tools: React.FC = () => {
  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Investment Tools</h2>
        <Tabs defaultValue="sip">
          <TabsList>
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum">Lump Sum Calculator</TabsTrigger>
            <TabsTrigger value="simulator">Portfolio Simulator</TabsTrigger>
          </TabsList>
          <TabsContent value="sip">
            <SIPCalculator />
          </TabsContent>
          <TabsContent value="lumpsum">
            <LumpSumCalculator />
          </TabsContent>
          <TabsContent value="simulator">
            <PortfolioSimulator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
