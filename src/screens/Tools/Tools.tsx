import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SIPCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ year: number; value: number }[]>(
    []
  );

  const calculateSIP = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const t = parseFloat(time) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      alert("Please enter valid numbers");
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
      <Button onClick={calculateSIP} className="w-full mb-4">
        Calculate
      </Button>
      {result !== null && (
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">
            Total Value: ₹{result.toFixed(2)}
          </p>
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
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              name="SIP Value"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const LumpSumCalculator: React.FC = () => {
  // Similar implementation to SIP Calculator, but for lump sum investments
  // ...
  return <></>;
};

const PortfolioSimulator: React.FC = () => {
  // Implementation for portfolio simulation
  // ...
  return <></>;
};

export const Tools: React.FC = () => {
  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Investment Tools</h2>
        <Tabs defaultValue="sip">
          <TabsList className="w-full h-[52px] bg-transparent justify-start border-0">
            <TabsTrigger
              value={"sip"}
              className={`w-[200px] h-[52px] rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[#0858a0] data-[state=active]:shadow-none data-[state=active]:bg-transparent
                        data-[state=active]:font-title-1-semibold data-[state=active]:text-dove-gray50
                        data-[state=inactive]:font-title-1-regular data-[state=inactive]:text-dove-gray100`}
            >
              <span className="text-center">SIP Calculator</span>
            </TabsTrigger>
            <TabsTrigger
              value={"lumpsum"}
              className={`w-[200px] h-[52px] rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[#0858a0] data-[state=active]:shadow-none data-[state=active]:bg-transparent
                        data-[state=active]:font-title-1-semibold data-[state=active]:text-dove-gray50
                        data-[state=inactive]:font-title-1-regular data-[state=inactive]:text-dove-gray100`}
            >
              <span className="text-center">Lump Sum Calculator</span>
            </TabsTrigger>
            <TabsTrigger
              value={"simulator"}
              className={`w-[200px] h-[52px] rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[#0858a0] data-[state=active]:shadow-none data-[state=active]:bg-transparent
                        data-[state=active]:font-title-1-semibold data-[state=active]:text-dove-gray50
                        data-[state=inactive]:font-title-1-regular data-[state=inactive]:text-dove-gray100`}
            >
              <span className="text-center">Portfolio Simulator</span>
            </TabsTrigger>
            <div className="flex-grow h-[52px]" />
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
