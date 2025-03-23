import React, { useMemo } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { SankeyController, Flow } from "chartjs-chart-sankey";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SankeyController,
  Flow
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        title: (context) => {
          return `${context[0].raw.from} → ${context[0].raw.to}`;
        },
        label: (context) => {
          return `Flow: ${context.raw.flow}`;
        },
      },
    },
  },
};

export const PortfolioOverviewSection = ({
  overviewSectionData,
}: {
  overviewSectionData: any;
}): JSX.Element => {
  const { sankeyData, stockData, fundData } = useMemo(() => {
    if (!overviewSectionData) {
      return {};
    }
    return overviewSectionData;
  }, [overviewSectionData]);
  return (
    <Card className="w-full h-[680px] bg-[#1b1a1a] rounded-[11px] relative">
      <CardContent className="p-7">
        <div className="w-full max-w-[842px]">
          <div className="flex items-center gap-2 mt-2.5">
            <h2 className="font-title-1-semibold text-dove-gray100">
              Overlap Analysis
            </h2>
            <div className="relative w-3.5 h-3.5">
              <div className="w-3.5 h-3.5 rounded-[7px] border border-solid border-white flex items-center justify-center">
                <span className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-white text-[10px]">
                  i
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[43px] font-title-1-regular text-dove-gray100 whitespace-nowrap">
            Comparing : Motilal Large Cap Fund and Nippon Large Cap Fund
          </div>

          <div className="mt-7 flex items-center">
            <div className="w-1.5 h-1.5 bg-pizazz-200 rounded-[3px]"></div>
            <div className="ml-4 font-normal text-dove-gray100 text-base">
              <span className="font-title-1-semibold">X Stocks Overlap</span>
              <span className="[font-family:'Gilroy-Regular-Regular',Helvetica]">
                {" "}
                across these funds.
              </span>
            </div>
          </div>

          <div className="mt-7 flex items-center">
            <div className="w-1.5 h-1.5 bg-pizazz-200 rounded-[3px]"></div>
            <div className="ml-4 font-normal text-dove-gray100 text-base">
              <span className="font-title-1-semibold">Y% Average Overlap</span>
              <span className="[font-family:'Gilroy-Regular-Regular',Helvetica]">
                {" "}
                in holdings.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 relative flex justify-center">
      {/* Fund Cards - Left Side */}
      <div className=" left-[-143px] top-[33px] space-y-[28px]">
            {fundData?.map((fund, index) => (
              <Card
                key={index}
                className={`w-[102px] h-[72px] rounded-[7px] ${fund.bgColor} opacity-40`}
              >
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="w-[84px] font-paragraph-semibold text-dove-gray50 text-center">
                    {fund.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        {/* Sankey Chart */}
          <div className="">
            {sankeyData && (
              <Chart type="sankey" data={sankeyData} options={chartOptions} />
            )}
          </div>

          {/* Stock Labels - Right Side */}
          <div className="right-[-130px] top-[33px] space-y-[42px]">
            {stockData?.map((stock, index) => (
              <div
                key={index}
                className="w-[102px] h-7 rounded-[21px] bg-transparent flex items-center justify-center"
              >
                <span className="font-paragraph-regular text-dove-gray300">
                  {stock.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
