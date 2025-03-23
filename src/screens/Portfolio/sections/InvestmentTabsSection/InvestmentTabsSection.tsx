import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const InvestmentTabsSection = (): JSX.Element => {
  // Tab data for easy maintenance and mapping
  const tabItems = [
    { id: "performance", label: "Performance Metrics", isActive: false },
    { id: "composition", label: "Portfolio Composition", isActive: true },
  ];

  return (
    <TabsList className="w-full h-[52px] bg-transparent justify-start border-0">
      {tabItems.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className={`w-[200px] h-[52px] rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[#0858a0] data-[state=active]:shadow-none data-[state=active]:bg-transparent
              data-[state=active]:font-title-1-semibold data-[state=active]:text-dove-gray50
              data-[state=inactive]:font-title-1-regular data-[state=inactive]:text-dove-gray100`}
        >
          <span className="text-center">{tab.label}</span>
        </TabsTrigger>
      ))}
      <div className="flex-grow h-[52px]" />
    </TabsList>
  );
};
