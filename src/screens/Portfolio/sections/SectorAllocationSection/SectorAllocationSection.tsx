import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../components/ui/tooltip";

// Data for sector allocation cards
const sectorData = [
  {
    id: 1,
    name: "Financial",
    amount: "₹1,95,000",
    percentage: "34%",
    bgColor: "bg-[#9bb0c7]",
    size: "col-span-2 row-span-1",
    stocks: [
      { name: "HDFC Bank", percentage: "15%", price: 1500 },
      { name: "ICICI Bank", percentage: "10%", price: 800 },
      { name: "SBI", percentage: "9%", price: 400 },
    ],
  },
  {
    id: 2,
    name: "Healthcare",
    amount: "₹83,250",
    percentage: "14.5%",
    bgColor: "bg-[#adb8cf]",
    size: "col-span-1 row-span-1",
    stocks: [
      { name: "Sun Pharma", percentage: "7%", price: 750 },
      { name: "Dr Reddy's", percentage: "4.5%", price: 3500 },
      { name: "Cipla", percentage: "3%", price: 900 },
    ],
  },
  {
    id: 3,
    name: "Technology",
    amount: "₹1,11,000",
    percentage: "19%",
    bgColor: "bg-[#c6c4d8]",
    size: "col-span-1 row-span-1",
    stocks: [
      { name: "TCS", percentage: "10%", price: 3200 },
      { name: "Infosys", percentage: "6%", price: 1400 },
      { name: "Wipro", percentage: "3%", price: 400 },
    ],
  },
  {
    id: 4,
    name: "Consumer Goods",
    amount: "₹55,500",
    percentage: "9.5%",
    bgColor: "bg-[#dad3e1]",
    size: "col-span-1 row-span-1",
    stocks: [
      { name: "HUL", percentage: "5%", price: 2200 },
      { name: "ITC", percentage: "3%", price: 215 },
      { name: "Nestle", percentage: "1.5%", price: 18000 },
    ],
  },
  {
    id: 5,
    name: "Energy",
    amount: "₹55,500",
    percentage: "9.5%",
    bgColor: "bg-[#ebe2ea]",
    size: "col-span-1 row-span-1",
    stocks: [
      { name: "Reliance", percentage: "6%", price: 2400 },
      { name: "ONGC", percentage: "2%", price: 150 },
      { name: "NTPC", percentage: "1.5%", price: 120 },
    ],
  },
  {
    id: 6,
    name: "Other Sectors",
    amount: "₹55,500",
    percentage: "9.5%",
    bgColor: "bg-[#f8f3f5]",
    size: "col-span-1 row-span-1",
    stocks: [
      { name: "Bharti Airtel", percentage: "3%", price: 700 },
      { name: "L&T", percentage: "3.5%", price: 1600 },
      { name: "Asian Paints", percentage: "3%", price: 3000 },
    ],
  },
];

export const SectorAllocationSection: React.FC = () => {
  return (
    <section className="w-full p-5 bg-[#1b1a1a] rounded-[11px]">
      <header className="mb-8">
        <h2 className="font-title-semibold text-dove-gray50">
          Sector Allocation
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-5">
        {sectorData.map((sector) => (
          <TooltipProvider key={sector.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className={`${sector.bgColor} rounded-xl border-none ${sector.size}`}>
                  <CardContent className="p-4 h-[200px] relative">
                    <h3 className="font-title-1-semibold text-bermuda-gray950">
                      {sector.name}
                    </h3>
                    <p className="font-body-regular text-bermuda-gray950 mt-2">
                      {sector.amount}
                    </p>
                    <span className="absolute bottom-4 left-4 font-headings-h5-semibold text-bermuda-gray950">
                      {sector.percentage}
                    </span>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <h4 className="font-semibold mb-2">{sector.name} Stocks</h4>
                  <ul>
                    {sector.stocks.map((stock, index) => (
                      <li key={index} className="mb-1">
                        <span className="font-medium">{stock.name}</span>: {stock.percentage} (₹{stock.price})
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </section>
  );
};
