import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
import { fetchFundAnalysis } from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";

interface FundData {
  date: string;
  value: number;
  benchmark: number;
}

interface Fund {
  id: number;
  name: string;
  data: FundData[];
  sharpeRatio: number;
  standardDeviation: number;
  alpha: number;
  beta: number;
}

export const FundAnalysis: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<number | null>(null);
  const { data: funds, isLoading } = useQuery<Fund[]>(
    "fundAnalysis",
    fetchFundAnalysis
  );

  const selectedFundData = funds?.find((fund) => fund.id === selectedFund);

  if (isLoading)
    return (
      <>
        <Loader />
        {/* Add an empty container to maintain layout structure */}
        <div className="relative w-full max-w-[1442px] bg-[#171616] rounded-[30px] overflow-hidden min-h-screen" />
      </>
    );

  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Fund Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <Select
            value={selectedFund?.toString() || ""}
            onValueChange={(value) => setSelectedFund(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fund" />
            </SelectTrigger>
            <SelectContent>
              {funds?.map((fund) => (
                <SelectItem key={fund.id} value={fund.id.toString()}>
                  {fund.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedFundData && (
          <Tabs defaultValue="performance">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="riskMetrics">Risk Metrics</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="performance">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedFundData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name={selectedFundData.name}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="riskMetrics">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">Sharpe Ratio</h3>
                    <p>{selectedFundData.sharpeRatio.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">Standard Deviation</h3>
                    <p>{selectedFundData.standardDeviation.toFixed(2)}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">Alpha</h3>
                    <p>{selectedFundData.alpha.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">Beta</h3>
                    <p>{selectedFundData.beta.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="comparison">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedFundData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name={selectedFundData.name}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#82ca9d"
                    name="Benchmark"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
