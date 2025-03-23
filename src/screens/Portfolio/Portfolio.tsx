import React from "react";
import { useQuery } from "react-query";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { InvestmentPerformanceSection } from "./sections/InvestmentPerformanceSection/InvestmentPerformanceSection";
import { InvestmentTabsSection } from "./sections/InvestmentTabsSection/InvestmentTabsSection";
import { PortfolioOverviewSection } from "./sections/PortfolioOverviewSection/PortfolioOverviewSection";
import { SectorAllocationSection } from "./sections/SectorAllocationSection/SectorAllocationSection";
import { SectorAnalysisSection } from "./sections/SectorAnalysisSection/SectorAnalysisSection";
import {
  fetchPortfolioData,
  fetchPerformanceData,
  fetchCompositionData,
} from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const Portfolio = (): JSX.Element => {
  const { data: portfolioData, isLoading: isPortfolioLoading } = useQuery(
    "portfolioData",
    fetchPortfolioData
  );
  const { data: performanceData, isLoading: isPerformanceLoading } = useQuery(
    "performanceData",
    fetchPerformanceData
  );
  const { data: compositionData, isLoading: isCompositionLoading } = useQuery(
    "compositionData",
    fetchCompositionData
  );

  if (isPortfolioLoading || isPerformanceLoading || isCompositionLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full max-w-[1442px] bg-[#171616] rounded-[30px] overflow-hidden">
      <InvestmentPerformanceSection />
      <SectorAnalysisSection />

      {/* Investment Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-6 mt-4">
        {portfolioData?.investmentCards.map((card) => (
          <Card
            key={card.id}
            className="w-72 h-[104px] bg-mariner-800 bg-opacity-20 rounded-[11px] border-0"
          >
            <CardContent className="p-0 h-full relative">
              <div className="absolute w-44 h-10 top-3.5 left-3">
                <div className="relative w-[178px] h-10">
                  <div className="absolute w-40 h-[38px] top-px left-4 font-title-1-regular text-dove-gray50 text-[length:var(--title-1-regular-font-size)]">
                    {card.title.split(" ").map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        {i < card.title.split(" ").length - 1 &&
                          i % 2 === 1 && <br />}
                        {i < card.title.split(" ").length - 1 &&
                          i % 2 !== 1 &&
                          " "}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="absolute w-0.5 h-10 top-0 left-0 bg-[#b2efff] rounded-[1px]" />
                </div>
              </div>

              <div className="absolute h-[22px] top-[65px] left-7 font-title-semibold text-dove-gray100 text-[length:var(--title-semibold-font-size)]">
                {portfolioData?.currencyCode}
                {card.value}
              </div>

              <div className="absolute w-[60px] h-[29px] top-3.5 left-[216px] rounded overflow-hidden">
                <div className="flex flex-col items-center gap-0.5 relative left-1">
                  <div className="flex items-center gap-1 relative self-stretch w-full">
                    {card.isPositive ? (
                      <>
                        <TrendingUpIcon className="w-[15.56px] h-2.5 text-apple-400" />
                        <div className="mt-[-1.00px] font-paragraph-semibold text-apple-400 text-[length:var(--paragraph-semibold-font-size)] text-center">
                          {card.change}
                        </div>
                      </>
                    ) : (
                      <>
                        <TrendingDownIcon className="w-2.5 h-[15.56px] text-valencia-300" />
                        <div className="mt-[-0.72px] font-paragraph-semibold text-valencia-300 text-[length:var(--paragraph-semibold-font-size)] text-center">
                          {card.change}
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`font-span-tags-regular text-[length:var(--span-tags-regular-font-size)] text-center whitespace-nowrap ${
                      card.isPositive ? "text-apple-400" : "text-valencia-300"
                    }`}
                  >
                    {card.period}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full border-b border-dove-gray800">
        <Tabs defaultValue="performance" className="mt-6">
            <InvestmentTabsSection />

          <TabsContent value="performance">
            <Card className="bg-[#1b1a1a] text-white">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      name="Portfolio Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="composition">
            <Card className="bg-[#1b1a1a] text-white">
              <CardHeader>
                <CardTitle>Portfolio Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <ResponsiveContainer width="50%" height={300}>
                    <PieChart>
                      <Pie
                        data={compositionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {compositionData?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-1/2">
                    <h4 className="text-lg font-semibold mb-2">
                      Asset Allocation
                    </h4>
                    <ul>
                      {compositionData?.map((item, index) => (
                        <li key={index} className="flex justify-between mb-2">
                          <span>{item.name}</span>
                          <span>{item.value}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <SectorAllocationSection />
      <PortfolioOverviewSection />
    </div>
  );
};
