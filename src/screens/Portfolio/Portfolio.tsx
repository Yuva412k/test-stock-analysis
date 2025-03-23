import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { InvestmentPerformanceSection } from "./sections/InvestmentPerformanceSection/InvestmentPerformanceSection";
import { InvestmentTabsSection } from "./sections/InvestmentTabsSection/InvestmentTabsSection";
import { PortfolioOverviewSection } from "./sections/PortfolioOverviewSection";
import { SectorAllocationSection } from "./sections/SectorAllocationSection/SectorAllocationSection";
import { SectorAnalysisSection } from "./sections/SectorAnalysisSection/SectorAnalysisSection";

export const Portfolio = (): JSX.Element => {
  // Investment summary cards data
  const investmentCards = [
    {
      id: 1,
      title: "Current Investment Value",
      value: "₹5,75,000",
      returnPercentage: "+0.6%",
      returnPeriod: "1D Return",
      isPositive: true,
    },
    {
      id: 2,
      title: "Initial Investment Value",
      value: "₹5,00,000",
      returnPercentage: "+15%",
      returnPeriod: "Inception",
      isPositive: true,
    },
    {
      id: 3,
      title: "Best Performing Scheme",
      value: "ICICI Prudential Midcap Fund",
      returnPercentage: "+19%",
      returnPeriod: "Inception",
      isPositive: true,
    },
    {
      id: 4,
      title: "Worst Performing Scheme",
      value: "Axis Flexi Cap Fund",
      returnPercentage: "-5%",
      returnPeriod: "Inception",
      isPositive: false,
    },
  ];

  return (
    <div className="w-full bg-[#171616] rounded-[30px] overflow-hidden">
      {/* Header Section */}
      {/* <HeaderSection /> */}

      {/* Sector Analysis Section */}
      <SectorAnalysisSection />

      {/* Investment Summary Cards */}
      <div className="flex flex-wrap justify-between px-8 gap-4 mt-4">
        {investmentCards.map((card) => (
          <Card
            key={card.id}
            className="w-72 h-[104px] bg-mariner-800 bg-opacity-20 rounded-[11px] border-0"
          >
            <CardContent className="p-0 h-full relative">
              <div className="absolute w-44 h-10 top-3.5 left-3">
                <div className="relative w-[178px] h-10">
                  <div className="absolute w-40 h-[38px] top-px left-4 font-title-1-regular text-dove-gray50 text-[length:var(--title-1-regular-font-size)] tracking-[var(--title-1-regular-letter-spacing)] leading-[var(--title-1-regular-line-height)]">
                    {card.title.split(" ").length > 2 ? (
                      <>
                        {card.title.split(" ").slice(0, 1).join(" ")} <br />
                        {card.title.split(" ").slice(1).join(" ")}
                      </>
                    ) : (
                      <>
                        {card.title.split(" ")[0]} <br />
                        {card.title.split(" ").slice(1).join(" ")}
                      </>
                    )}
                  </div>
                  <div className="absolute w-0.5 h-10 top-0 left-0 bg-[#b2efff] rounded-[1px]" />
                </div>
              </div>

              <div className="absolute h-[22px] top-[65px] left-7 font-title-semibold text-dove-gray100 text-[length:var(--title-semibold-font-size)] tracking-[var(--title-semibold-letter-spacing)] leading-[var(--title-semibold-line-height)]">
                {card.value}
              </div>

              <div className="absolute w-[60px] h-[29px] top-3.5 left-[216px] rounded overflow-hidden">
                <div className="flex flex-col items-center gap-0.5 relative left-1">
                  <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                    {card.isPositive ? (
                      <ArrowUpIcon className="w-[15.56px] h-2.5 text-apple-400" />
                    ) : (
                      <ArrowDownIcon className="w-2.5 h-[15.56px] text-valencia-300" />
                    )}
                    <div
                      className={`relative w-fit mt-[-1.00px] font-paragraph-semibold text-[length:var(--paragraph-semibold-font-size)] text-center tracking-[var(--paragraph-semibold-letter-spacing)] leading-[var(--paragraph-semibold-line-height)] ${card.isPositive ? "text-apple-400" : "text-valencia-300"}`}
                    >
                      {card.returnPercentage}
                    </div>
                  </div>
                  <div
                    className={`relative w-fit font-span-tags-regular text-[length:var(--span-tags-regular-font-size)] text-center tracking-[var(--span-tags-regular-letter-spacing)] leading-[var(--span-tags-regular-line-height)] whitespace-nowrap ${card.isPositive ? "text-apple-400" : "text-valencia-300"}`}
                  >
                    {card.returnPeriod}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="flex flex-col">
        {/* Investment Tabs Section */}
        <InvestmentTabsSection />

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column */}
          <div className="w-1/4">
            <InvestmentPerformanceSection />
          </div>

          {/* Right Column */}
          <div className="w-3/4 flex flex-col">
            <SectorAllocationSection />
            <PortfolioOverviewSection />
          </div>
        </div>
      </div>
    </div>
  );
};
